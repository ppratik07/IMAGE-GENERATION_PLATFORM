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

app.post("/ai/training", async (req, res) => {
  try {
    const parsedBody = TrainModel.safeParse(req.body);
    const USER_ID = "1234";
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

app.post("/ai/generate", (req, res) => {});

app.post("/pack/generate", (req, res) => {});

app.get("/pack/bulk", (req, res) => {});

app.get("/image", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
