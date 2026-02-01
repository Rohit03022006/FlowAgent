import { NextRequest, NextResponse } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { openai } from "../../../../config/OpenAiModel";
import { z } from "zod";
import { Agent, run } from "@openai/agents";

export async function POST(req: NextRequest) {
  try {
    const { userId, agentId, UserInput } = await req.json();

    const agentDetails = await fetchQuery(api.agent.GetAgentById, {
      agentId: agentId._id,
    });

    if (!agentDetails) {
      return NextResponse.json(
        { error: "Agent not found" },
        { status: 404 }
      );
    }

    const conversationDetails = await fetchQuery(
      api.conversation.GetConversationById,
      {
        agentId: agentId._id,
        userId: userId._id,
      }
    );

    let conversationId_ = conversationDetails?.conversationId;

    if (!conversationId_) {
      const { id } = await openai.conversations.create({});
      conversationId_ = id;
    }

    const generatedTools =
      agentDetails?.agentToolConfig?.tools?.map((tool: any) => {
        const paramSchema = z.object(
          Object.fromEntries(
            Object.entries(tool.parameters || {}).map(([key, type]) => {
              if (type === "string") return [key, z.string()];
              if (type === "number") return [key, z.number()];
              if (type === "boolean") return [key, z.boolean()];
              return [key, z.any()];
            })
          )
        );

        return {
          name: tool.name,
          description: tool.description,
          parameters: paramSchema,

          async execute(params: Record<string, any>) {
            let url = tool.url;

            // Replace template params
            for (const key in params) {
              url = url.replace(
                `{{${key}}}`,
                encodeURIComponent(params[key])
              );
            }

            // API key attach
            if (tool.includeApiKey && tool.apiKey) {
              url = url.includes("?")
                ? `${url}&apiKey=${tool.apiKey}`
                : `${url}?apiKey=${tool.apiKey}`;
            }

            const response = await fetch(url);

            if (!response.ok) {
              throw new Error(`Tool API failed: ${response.status}`);
            }

            return await response.json();
          },
        };
      }) ?? [];

    const CreatedAgents =
      agentDetails?.agentToolConfig?.agents?.map(
        (config: any) =>
          new Agent({
            name: config.name,
            instructions: config.instructions,
            tools: generatedTools,
          })
      ) ?? [];

    const finalAgent = Agent.create({
      name: agentDetails?.name,
      instructions:
        "Route the user to the best agent based on their request. If unsure, ask a clarifying question.",
      handoffs: CreatedAgents,
    });

    const result = await run(finalAgent, UserInput, {
      conversationId: conversationId_,
      stream: true,
    });

    const stream = result.toTextStream({
      compatibleWithNodeStreams: true,
    });

    return new NextResponse(stream as any, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
