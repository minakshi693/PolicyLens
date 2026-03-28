import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import pdfParse from "pdf-parse";
import OpenAI from "openai";

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));
app.use(express.json());

const upload = multer({ dest: "uploads/" });

const openai = new OpenAI({
  apiKey: "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",
});

app.post("/analyze", upload.single("file"), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);

    const text = pdfData.text;

    const prompt = `
    You are an insurance expert.
    Simplify the policy into:

    1. What is Covered (bullet points)
    2. What is NOT Covered
    3. Hidden Conditions
    4. Red Flags

    Keep it simple, like explaining to a 20-year-old in India.
    Mix English + simple Hinglish if needed.

    Policy:
    ${text}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      result: response.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing file");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
