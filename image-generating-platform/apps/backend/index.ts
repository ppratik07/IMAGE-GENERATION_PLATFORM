import express from "express";
import {
  TrainModel,
  GenerateImage,
  GenerateImagesFromPack,
} from "common/types";
import { prismaClient } from "db";
const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.json());

const USER_ID = "1234";
app.post("/ai/training", async (req, res) => {
  try {
    const parsedBody = TrainModel.safeParse(req.body);

    if (!parsedBody) {
      res.status(411).json({
        message: "Input Incorrect",
      });
      return;
    }
    const data = await prismaClient.model.create({
      data: {
        name: parsedBody.data?.name || "",
        type: parsedBody.data?.type || "Others",
        age: typeof parsedBody.data?.age === "number" ? parsedBody.data.age : 0,
        ethinicity: parsedBody.data?.ethinicity || "Asian_American",
        eyeColor: parsedBody.data?.eyeColor || "Black",
        bald:
          typeof parsedBody.data?.bald === "boolean"
            ? parsedBody.data.bald
            : false,
        userId: USER_ID,
      },
    });
    res.status(200).json({
      modelId: data.id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.post("/ai/generate", async (req, res) => {
  try {
    const parsedBody = GenerateImage.safeParse(req.body);
    if (!parsedBody) {
      res.status(411).json({
        message: "Input Incorrect",
      });
      return;
    }
    const data = await prismaClient.outputImages.create({
      data: {
        prompt: parsedBody.data?.prompt || "",
        modelId: parsedBody.data?.modelId || "",
        userId: USER_ID,
        imageUrl: "",
      },
    });
    res.json({
      imageId: data.id,
    });
  } catch (error) {}
});

app.post("/pack/generate", async (req, res) => {
  try {
    const parsedBody = GenerateImagesFromPack.safeParse(req.body);
    if (!parsedBody) {
      res.status(411).json({
        message: "Input Incorrect",
      });
      return;
    }
    const prompts = await prismaClient.packPrompts.findMany({
      where: {
        packId: parsedBody.data?.packId || "",
      },
    });
    const images = await prismaClient.outputImages.createManyAndReturn({
      data: prompts.map((prompt) => ({
        prompt: prompt.prompt,
        modelId: parsedBody.data?.modelId || "",
        userId: USER_ID,
        imageUrl: "",
      })),
    });
    res.json({
      images: images.map((image) => image.id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.get("/pack/bulk", async (req, res) => {
  const pack = await prismaClient.packPrompts.findMany({});
  res.json({
    packs: pack,
  });
});

app.get("/image/bulk", (req, res) => {
  const ids = req.query.ids as string[];
  const limit = req.query.limit as string ?? "10";
  const offset = req.query.offset as string ?? "0";
  const imagesData = prismaClient.outputImages.findMany({
    where: {
      id: {
        in: ids,
      },
      userId: USER_ID,
    },
    skip: parseInt(offset),
    take: parseInt(limit),
  });
  res.json({
    images: imagesData,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
