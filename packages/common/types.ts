import { z } from "zod"

export const TrainModelSchema = z.object({
    name: z.string(),
    age: z.number(),
    type: z.enum(["Man" , "Women" , "Other"]),
    bald : z.boolean(),
    ethinicity : z.enum(["White" , "Black" , "Asian_American" , "Hispanic" , "Indian" , "Middle_Easter" , "South_Asian"]),
    eyeColor : z.enum(["Brown" , "Blue" , "Hazel" ,  "Grey" ]),
    zipUrl : z.string()
    
})

export const ImageGenerate = z.object({
    prompt : z.string(),
    modelId : z.string(),
    num : z.number()
})


export const ImageGenerateId = z.object({
    modelId : z.string(),
    packId : z.string(),
})