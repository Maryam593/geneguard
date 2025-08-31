import { GoogleGenerativeAI } from "@google/generative-ai";
import { promises as fs } from "fs";
import path from "path";

// Store 5 Q/A and 1 final condition
let history: { question: string; answer: string }[] = [];
let diagnosisHistory: { result: string; timestamp: string }[] = [];
let currentPhase: "questions" | "confirmation" | "done" = "questions";
// Initialize userInitialStatement to null or an empty object
let userInitialStatement: { theory: string } | null = null; 

async function saveChatHistory(sessionId: string) {
  const chatData = {
    timestamp: new Date().toISOString(),
    history,
    userInitialStatement, // This will now correctly contain the first user prompt
    diagnosisHistory,
  };
  const filePath = path.join(process.cwd(), "src/app/api/chat/user.json");
  let existing = [];
  try {
    const file = await fs.readFile(filePath, "utf-8");
    existing = JSON.parse(file);
    if (!Array.isArray(existing)) existing = [];
  } catch (e) {
    // file does not exist or is invalid, start fresh
    existing = [];
  }
  existing.push(chatData);
  await fs.writeFile(filePath, JSON.stringify(existing, null, 2), "utf-8");
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const apiKey = process.env.GOOGLE_API_KEY || "YOUR_API_KEY";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Save user's answer to the previous question
    if (currentPhase === "questions" && history.length > 0) {
      history[history.length - 1].answer = prompt;
    }

    // Capture the user's very first response/symptom
    if (currentPhase === "questions" && history.length === 0) {
      userInitialStatement = { theory: prompt };
    }

    // Phase 1: Ask 5 questions
    if (currentPhase === "questions") {
      if (history.length >= 5) {
        currentPhase = "confirmation";

        // Make a small assumption based on history
        const summaryPrompt = `
You are a medical interviewer bot. 
After the following Q&A, you must ONLY say a thank you message (like "Thank you for sharing this information. Wishing you better health!").
Do NOT give any diagnosis, advice, solution, or assumption. 
Do NOT say "Am I right?" or mention any possible condition.
Just thank the user, nothing else.

Q&A:
${history.map((h) => `Q: ${h.question}\nA: ${h.answer}`).join("\n")}

ONLY output a thank you message.
`;
        const result = await model.generateContent(summaryPrompt);
        const diagnosisLine = (await result.response).text().trim();
        const timestamp = new Date().toISOString();
        diagnosisHistory.push({ result: diagnosisLine, timestamp });
        
        // Removed the incorrect line: userInitialStatement = {theory};

        // Always save the chat after thank you
        await saveChatHistory(prompt); // Assuming prompt is the sessionId for now

        return new Response(JSON.stringify({ text: diagnosisLine, history: diagnosisHistory, sessionId: prompt }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      const fullPrompt = `
You're a virtual doctor. Ask short, clear, crisp medical questions (1-2 lines only).
Only 5 total. Ask things like age, symptom, duration, existing condition.
No diagnosis, no advice, also ask question 1 by 1, not in one go

Conversation so far:
${history.map((h, i) => `Q: ${h.question}\nA: ${h.answer}`).join("\n")}

Now, ask the next question only. Do NOT use any numbering, do NOT write "Q:" or "Q[number]:", just write the question itself.
`;

      const result = await model.generateContent(fullPrompt);
      const nextQuestion = (await result.response).text().trim();

      history.push({ question: nextQuestion, answer: "" });

      return new Response(JSON.stringify({ text: nextQuestion }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Phase 2: Confirmation
    if (currentPhase === "confirmation") {
      if (/^(yes|right|correct|exactly|true)$/i.test(prompt.trim())) {
        currentPhase = "done";
        // Save chat history to user.json
        await saveChatHistory(prompt); // Assuming prompt is the sessionId for now
        return new Response(
          JSON.stringify({
            text: "Thank you! You're in good hands. Wishing you better health. 🩺",
            saved: true,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        return new Response(
          JSON.stringify({
            text: "Okay. Please provide more clarity or corrections if needed.",
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Phase 3: Done
    return new Response(
      JSON.stringify({
        text: "This session is already concluded. Thank you!",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("GenAI Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch response" }), {
      status: 500,
    });
  }
}
