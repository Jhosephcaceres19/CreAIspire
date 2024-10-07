// app/api/generate/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();
  
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContentStream(prompt);
    let fullText = '';
   
    for await (const chunk of result.stream) {
      fullText += chunk.text(); 
    }

    return NextResponse.json({ answer: fullText });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
