import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export const cleaned_text = (text: string):string => {
  const cleaned_text = text.replace(/\*+/g,"");
  return cleaned_text;
}

export const textTotext =async (inp: string) =>{
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const result = await model.generateContent(inp);
  const response =result.response;
  const texts: string = response.text();
  const text = cleaned_text(texts);

  return text
}