import { OpenAI } from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: "I want you to generate a funny joke.\n\nOutput a JSON in this format:\n{\njoke: <str>\n}"
        }
      ],
      response_format: { type: "json_object" },
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }
    const jokeResponse = JSON.parse(content);
    return res.status(200).json(jokeResponse);
  } catch (error) {
    console.error('Error generating joke:', error);
    return res.status(500).json({ error: 'Failed to generate joke' });
  }
} 