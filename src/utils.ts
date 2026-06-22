import { OpenAIClient } from "@anvia/openai";
import "dotenv/config"

const openAIClient = new OpenAIClient({
    apiKey: process.env.OPENAI_API_KEY
})

export const openAIModel = openAIClient.completionModel("gpt-4.1-mini")