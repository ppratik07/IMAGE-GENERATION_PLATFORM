import {z} from 'zod';

export const TrainModel = z.object({
    name : z.string(),
    type: z.enum(["Man","Women","Others"]),
    age : z.number(),
    ethinicity: z.enum(["White","Black","Asian_American","East_Asian","South_East_Asian","South_Asian","Middle_Eastern","Pacific","Hispanic"]),
    eyeColor : z.enum(["Brown","Black","Blue","Hazel","Gray"]),
    bald : z.boolean(),
    image : z.array(z.string())
});

export const GenerateImage = z.object({
    prompt : z.string(),
    modelId : z.string(),
    num : z.number()
})

export const GenerateImagesFromPack = z.object({
    modelId : z.string(),
    packId : z.string()
})