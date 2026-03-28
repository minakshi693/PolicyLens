import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import pdfParse from "pdf-parse";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

const openai = new OpenAI({
  apiKey: "YOUR_OPENAI_API_KEY",
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
