import express from "express"
import { TrainModelSchema, ImageGenerate, ImageGenerateId } from "common/types"
import { prisma } from "db"
import { FalModel } from "./models/FalAi"
import { S3Client } from "bun"
import cors from "cors";
import { jwtMiddleWare } from "./middleware"

const falAiModel = new FalModel()

const app = express()
app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const client = new S3Client({
  region: "auto",
  endpoint: `https://${Bun.env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: Bun.env.S3_ACCESS_KEY,
  secretAccessKey: Bun.env.S3_SECRET_KEY,
  bucket: Bun.env.BUCKET_NAME
});

app.options("/pre-signedUrl", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  res.sendStatus(200);
});

app.get("/pre-signedUrl", async (req, res) => {
  const key = `models/${Date.now()}_${Math.random()}.zip`;

  try {
    const url = client.presign(key, {
      method: "PUT",
      bucket: Bun.env.BUCKET_NAME,
      expiresIn: 60 * 5,
      type: "application/zip"
    });

    console.log('Generated URL:', url);
    res.json({ url, key });
  } catch (error: any) {
    console.error('Full error:', error);
    res.status(500).json({ error: error?.message || "Internal Server Error" });
  }
});

app.post("/ai/training", jwtMiddleWare, async (req, res) => {
  console.log(req.userId)
  try {
    const parsedData = TrainModelSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.error("Zod Schema Validation Failed:", parsedData.error.format());
    res.status(411).json({
      message: "Invalid"
    })
    return
  }
  console.log("Before Fal AI training request");
  const { request_id, response_url } = await falAiModel.trainingModel(parsedData.data.zipUrl, parsedData.data.name);
  console.log("Fal AI Training Response:", request_id, response_url);


  console.log("Before Prisma write");
  const data = await prisma.trainModel.create({
    data: {
      name: parsedData.data.name,
      age: parsedData.data.age,
      ethinicity: parsedData.data.ethinicity,
      bald: parsedData.data.bald,
      type: parsedData.data.type,
      userId: req.userId!,
      FalAiId: request_id,
      zipUrl: parsedData.data.zipUrl,
      eyeColor: parsedData.data.eyeColor
    }
  })
  console.log("Successfully inserted into DB", data);
  res.json({
    modelId: data.id
  })
  } catch (error) {
    console.error("Error during training:", error);
    res.status(500).json({
      message: "Failed to train model"
    })
  }
})

app.post("/ai/generate", jwtMiddleWare, async (req, res) => {
  const parsedData = ImageGenerate.safeParse(req.body)
  if (!parsedData.success) {
    res.status(411).json({
      message: "Invalid"
    })
    return
  }
  const model = await prisma.trainModel.findUnique({
    where: {
      id: parsedData.data.modelId
    }
  })
  console.log(model)

  if (!model || !model.tensorPath) {
    res.status(411).json({
      message: "Model not found"
    })
    return
  }

  const { request_id, response_url } = await falAiModel.generateImages(parsedData.data.prompt, model.tensorPath)

  const data = await prisma.outputImage.create({
    data: {
      imageUrl: "",
      userId: req.userId!,
      modelId: parsedData.data.modelId,
      prompt: parsedData.data.prompt,
      FalAiId: request_id

    }
  })

  res.json({
    imageId: data.id
  })
})


app.post("/pack/generate", jwtMiddleWare, async (req, res) => {
  const parsedData = ImageGenerateId.safeParse(req.body);

  if (!parsedData.success) {
    res.status(411).json({
      message: "invalid"
    })
    return
  }
  const prompts = await prisma.packPrompt.findMany({
    where: {
      packId: parsedData.data.packId
    }
  })

  let requestId: { request_id: string }[] = await Promise.all(prompts.map(async (prompt: any) => falAiModel.generateImages(prompt.prompt, parsedData.data.modelId)))

  const imageData = await prisma.outputImage.createManyAndReturn({
    data: prompts.map((prompt: any, index: any) => ({
      prompt: prompt.prompt,
      userId: req.userId!,
      imageUrl: "",
      modelId: parsedData.data.modelId,
      falAiModel: requestId[index].request_id
    }))
  })
  res.json({
    imageId: imageData.map((image: any) => image.id)
  })
})


app.get("/bulk/pack", async (req, res) => {
  const packs = await prisma.pack.findMany({})

  res.json({
    packs
  })
})

app.get("/models", async (req, res) => {
  const models = await prisma.trainModel.findMany({
    where: {
      OR: [{ userId: req.userId! }, {
        open: false
      }]
    }
  })
  res.json({
    models
  })
})

app.get("/image/bulk", async (req, res) => {
  const imageId = req.query.imageId as string[];
  const limit = req.query.limit as string ?? "10";
  const offset = req.query.offset as string ?? "0"

  const images = await prisma.outputImage.findMany({
    where: {
      id: { in: imageId },
      userId: req.userId!
    },
    skip: parseInt(offset),
    take: parseInt(limit)
  })
  res.json({
    image: images
  })
})

app.post("/fal-ai/webhook/train", async (req, res) => {
  const request_id = req.body.request_id as string;
  const { imageUrl } = await falAiModel.generateImageSync(req.body.tensorPath)

  await prisma.trainModel.updateMany({
    where: {
      // id : request_id,
      FalAiId: request_id,

    },
    data: {
      status: "Generated",
      tensorPath: req.body.tensorPath,
      thumbnail: imageUrl
    }
  })
  res.json({
    message: "Success"
  })

})

app.post("/fal-ai/webhook/image", async (req, res) => {

  const request_id = req.body.request_id;

  await prisma.outputImage.updateMany({
    where: {
      //id : request_id ,
      FalAiId: request_id,

    },
    data: {
      status: "Generated",
      imageUrl: request_id.body.payload.images[0].url
    }
  })

  res.json({
    message: "Success"
  })
})


app.listen(8080)
