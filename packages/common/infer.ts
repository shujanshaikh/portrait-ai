import {z} from "zod"
import { TrainModelSchema , ImageGenerate , ImageGenerateId  } from "./types"

export type TrainModelInfer = z.infer<typeof TrainModelSchema>;
export type ImageGenerateInfer = z.infer<typeof ImageGenerate>;
export type ImageGenerateIdInfer = z.infer<typeof ImageGenerateId>;