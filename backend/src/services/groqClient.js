import {ChatGroq} from "@langchain/groq";
import "dotenv/config";

//check api key
if(!process.env.GROQ_API_KEY){
    throw new Error("GROQ_API_KEY is missing check .env file!");
}

//initialize the llm
export const groqModel = new ChatGroq({
    apiKey:process.env.GROQ_API_KEY,
    model:"openai/gpt-oss-120b",
    temperature:0
});

