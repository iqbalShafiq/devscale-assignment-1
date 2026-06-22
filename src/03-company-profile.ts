import { createCompletion, type Document } from "@anvia/core";
import { openAIModel } from "./utils";

const documents: Document[] = [
  {
    id: "1",
    text: "Microsoft is a technology company operating in the Technology industry. The company develops software, cloud computing platforms, productivity tools, and artificial intelligence solutions. Website: https://www.microsoft.com",
  },
  {
    id: "2",
    text: "Toyota Motor Corporation operates in the Automotive industry and is one of the world's largest vehicle manufacturers. The company produces cars, trucks, hybrid vehicles, and mobility solutions. Website: https://www.toyota.com",
  },
  {
    id: "3",
    text: "Unilever is a multinational company in the Consumer Goods industry. Its portfolio includes food products, personal care brands, home care products, and wellness solutions sold globally. Website: https://www.unilever.com",
  },
  {
    id: "4",
    text: "JPMorgan Chase operates in the Financial Services industry and provides banking, investment management, payment processing, and financial advisory services worldwide. Website: https://www.jpmorganchase.com",
  },
];

const userInput = "Microsoft"

const res = await createCompletion(openAIModel, {
    instructions: "You are a helpful company information assistant. Answer the user's question using only the provided supporting company profile documents, and if the answer is not available in the documents, say that the information is not available.",
    input: `Company name: ${userInput}`,
    documents: documents
})

console.log(res.text)