import OpenAI from "openai";
import { Prompt } from "../model/prompt.model.js";

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const sendPrompt = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ success: false, message: "Prompt content is required" });
    }

    // Save user prompt
    const userPrompt = await Prompt.create({
      role: "user",
      content,
    });

    // Send to Gemini (OpenAI compatible)
    const completion = await client.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content }],
    });

    const aiContent = completion.choices[0].message.content;

    // Save assistant prompt
    const aiMessage = await Prompt.create({
      role: "assistant",
      content: aiContent,
    });

    return res.status(200).json({
      success: true,
      reply: aiContent,
      message: "AI response success",
    });
  } catch (error) {
    console.error("Error in sendPrompt:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { sendPrompt };