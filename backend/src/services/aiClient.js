const axios = require('axios');


const HF_API = process.env.HF_INFERENCE_API;


async function generateArticle() {
const prompt = `Write a short tech blog article (approx 200-400 words) with a title and body. Output in JSON: {"title":"...", "body":"..."}`;


if (HF_API) {
try {
const resp = await axios.post(
'https://api-inference.huggingface.co/models/google/flan-t5-small',
{ inputs: prompt, options: { wait_for_model: true } },
{ headers: { Authorization: `Bearer ${HF_API}` }, timeout: 30000 }
);
const text = Array.isArray(resp.data) ? resp.data[0].generated_text : (resp.data.generated_text || JSON.stringify(resp.data));
const match = text.match(/\{[\s\S]*\}/);
const json = match ? JSON.parse(match[0]) : { title: `Auto: ${Date.now()}`, body: text };
return { title: json.title || `Auto ${Date.now()}`, body: json.body || text };
} catch (e) {
console.error('HF generation failed', e.message);
}
}


return {
title: `Auto article ${new Date().toISOString().slice(0,10)}`,
body: 'This is a placeholder auto-generated article. Replace with a real AI call in production.'
};
}


module.exports = { generateArticle };