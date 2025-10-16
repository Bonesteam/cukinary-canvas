import OpenAI from "openai";

export async function generateAIPlan(prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return `AI Plan (mock)\n\n${prompt}\n\n- Breakfast: Oatmeal with berries\n- Lunch: Grilled chicken salad\n- Dinner: Salmon with quinoa and veggies`;
  }
  const client = new OpenAI({ apiKey });
  const res = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an expert meal-planning chef. Return concise, structured weekly plans." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });
  return res.choices[0]?.message?.content || "No response";
}
