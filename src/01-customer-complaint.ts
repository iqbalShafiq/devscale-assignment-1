import { createCompletion, createParsedCompletion } from "@anvia/core";
import { openAIModel } from "./utils";
import z from "zod";

const userPrompt = "Why was I charged twice? Please fix it now!";

const PROMPT_INTENT = {
  fraud_and_dispute:
    "You handle suspicious transactions, unknown charges, double charges, refunds, and disputes. Help customers with empathy and never ask for PIN, OTP, CVV, or passwords.",
  card_operation:
    "You handle card issues such as lost cards, blocked cards, ATM-captured cards, activation, PIN reset, and card limits. If there is a suspicious transaction, route it to Fraud & Dispute.",
  digital_banking:
    "You handle mobile banking, internet banking, OTP, login, QRIS, virtual account, and app error issues. Ask only for necessary technical details and never ask for passwords, PINs, or OTPs.",
  account_services:
    "You handle bank accounts, balances, statements, admin fees, dormant accounts, account opening or closing, and account data changes. Give clear and simple answers.",
  loan_and_credit:
    "You handle loans, installments, interest rates, tenors, early repayment, and credit applications. Explain the options and next steps in a simple way.",
  transaction_operations:
    "You handle failed transfers, debited balances, pending transactions, BI-FAST, RTGS, SKN, and clearing issues. Ask for transaction details such as date, amount, and reference number if available.",
  general_support:
    "You handle general questions such as operating hours, branch locations, product information, and promotions. Answer briefly and politely, and route to another department if the case is specific.",
};

const PromptIntentSchema = z.object({
  intent: z.enum([
    "fraud_and_dispute",
    "card_operation",
    "digital_banking",
    "account_services",
    "loan_and_credit",
    "transaction_operations",
    "general_support",
  ]),
  reason: z.string(),
});

const intentRes = await createParsedCompletion(openAIModel, {
  instructions:
    "You are a bank customer service agent who decides which department should handle the customer’s question. Reply only with the department name and a short reason.",
  input: userPrompt,
  schema: PromptIntentSchema,
});

const extractedIntent = intentRes.data.intent
const finalInstruction = PROMPT_INTENT[extractedIntent]

console.log(`Selected intent: ${extractedIntent} because ${intentRes.data.reason}`)

const finalRes = await createCompletion(openAIModel, {
    instructions: finalInstruction,
    input: userPrompt
})

console.log(finalRes.text)