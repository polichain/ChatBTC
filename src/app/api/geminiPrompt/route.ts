import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, GenerateContentResult } from "@google/generative-ai";

// Initialize Google Generative AI with API Key from environment variables
const apiKey = process.env.GOOGLE_API_KEY;
console.log("API KEY:",apiKey);

if (!apiKey) {
  throw new Error('API Key not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt not provided.' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result: GenerateContentResult = await model.generateContent([prompt]);

    console.log("Full API response:", result);

    if (!result?.response?.usageMetadata) {
      return NextResponse.json({ error: 'Usage metadata not returned by API.' }, { status: 500 });
    }

    const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) {
      return NextResponse.json({ error: 'Generated text not found in API response.' }, { status: 500 });
    }

    const { promptTokenCount, candidatesTokenCount, totalTokenCount } = result.response.usageMetadata;

    console.log(`Prompt tokens: ${promptTokenCount}`);
    console.log(`Response tokens (candidates): ${candidatesTokenCount}`);
    console.log(`Total tokens: ${totalTokenCount}`);
    console.log(responseText);

    return NextResponse.json({
      response: responseText,
      tokens: {
        promptTokenCount,
        candidatesTokenCount,
        totalTokenCount
      }
    });

  } catch (error) {
    console.error('Error calling Google Generative AI API:', error);
    return NextResponse.json({ error: 'Failed to generate content.' }, { status: 500 });
  }
}
