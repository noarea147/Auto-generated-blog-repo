const axios = require("axios");
require("dotenv").config();

async function generateArticle() {
  const prompt = `
  Write a blog article in JSON format:

  {
    "title": "short, catchy tech blog title (max 8 words)",
    "body": "200-400 words, human style, markdown allowed"
  }

  Requirements:
  - No AI disclaimers
  - No generic intro
  - Friendly tone
  - Natural SEO keywords
  - Add FAQ at bottom
  - body must be in html format
  - Use headings and subheadings
  - Include bullet points where relevant
  - Include code snippets where relevant 
  `;
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  if (!OPENROUTER_API_KEY) {
    return {
      title: `Auto article ${new Date().toISOString().slice(0, 10)}`,
      body: "Missing OPENROUTER_API_KEY",
    };
  }

  try {
    const resp = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are a blog writer that ONLY outputs JSON.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.9,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://3.233.221.62",
          "X-Title": "Article Generator",
        },
        timeout: 30000,
      }
    );

    const raw = resp.data?.choices?.[0]?.message?.content ?? "";
    const match = raw.match(/\{[\s\S]*\}/);
    const json = match ? JSON.parse(match[0]) : null;

    return {
      title: json?.title || "No title",
      body: json?.body || raw,
    };
  } catch (err) {
    console.error("OpenRouter API failed:", err.response?.data || err.message);

    return {
      title: "Error",
      body: "AI generation error",
    };
  }
}

module.exports = { generateArticle };
