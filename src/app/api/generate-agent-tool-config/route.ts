import { NextRequest, NextResponse } from "next/server";
import { openai } from "../../../../config/OpenAiModel";

const PROMPT = `
From this flow, generate a complete agent instruction prompt in strict JSON format.
Do not add any extra text outside JSON.

JSON schema:
{
  "systemPrompt": "",
  "primaryAgentName": "",
  "agents": [
    {
      "id": "",
      "name": "",
      "instruction": ""
    }
  ],
  "tools": [
    {
      "toolId": "",
      "name": "",
      "description": "",
      "method": "GET | POST | PUT | DELETE",
      "url": "",
      "includeApiKey": true,
      "apiKey": "",
      "parameters": {
        "key": "type"
      }
    }
  ],
  "flow": {
    "startNode": "",
    "nodes": [
      {
        "id": "",
        "type": "",
        "label": "",
        "settings": {},
        "next": ""
      }
    ]
  }
}

Rules:
- Infer agent instructions from node type, label, and settings.
- Preserve node relationships using "next".
- If conditional (IfElseNode), use:
  { "if": "<nodeId>", "else": "<nodeId>" }
- Do not hallucinate tools or agents not present in the flow.
- Output ONLY valid JSON.
`;


export async function POST(req: NextRequest) {
  try {
    const { jsonConfig } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a Senior AI Agent Architect. Generate a complete agent instruction prompt in strict JSON format."
        },
        {
          role: "user",
          content: `Workflow Config: ${JSON.stringify(jsonConfig)}\n\n${PROMPT}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const outputText = response.choices[0].message.content;
    if (!outputText) throw new Error("No response from OpenAI");

    return NextResponse.json(JSON.parse(outputText));

  } catch (error: any) {
    console.error("Error generating agent tool config:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error", details: error },
      { status: error.status || 500 }
    );
  }
}
