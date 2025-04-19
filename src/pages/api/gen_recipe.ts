import { OpenAI } from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { maxTime, maxBudget } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: `I want you to generate some recipes based on Trader Joes ingredients we can use.

Max time it should take: ${maxTime} min

Max price for all ingredients: $${maxBudget}

Use emojis when listing ingredients.
You can have any number of steps, but max 10 steps.

Output in this JSON format:
{
recipes: [
{
name: <str>
ingredients: [<str>, <str>, <str>, ...],
steps: [<str>, <str>, <str>, ...],
estimated_price: <str>,
estimated_time: <str>
},
...
]
}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }
    const recipeResponse = JSON.parse(content);
    return res.status(200).json(recipeResponse);
  } catch (error) {
    console.error('Error generating recipes:', error);
    return res.status(500).json({ error: 'Failed to generate recipes' });
  }
}
