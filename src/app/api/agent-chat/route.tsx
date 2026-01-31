import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Agent, run, tool } from "@openai/agents";

import { openai } from "../../../../config/OpenAiModel";

export async function POST(req: NextRequest) {
    const { input, tools, agents, conversationId, agentName } = await req.json();

    // map all Tools
    const generatedTools = tools.map((tool: any) => {
        // Dynamic build zod object for parameters
        const paramSchema = z.object(
            Object.fromEntries(
                Object.entries(tool.parameters).map(([key, type]) => {
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
                for (const key in params) {
                    url = url.replace(`{{${key}}}`, encodeURIComponent(params[key]));
                }
                if (tool.includeApiKey && tool.apiKey) {
                    url = url.includes("?") ? `${url}&apiKey=${tool.apiKey}` : `${url}?apiKey=${tool.apiKey}`;
                }

                // make api request
                const response = await fetch(url);
                const data = await response.json();
                return data;
            }
        };
    });

    const CreatedAgents = agents.map((config: any) => {
        return new Agent({
            name: config.name,
            instructions: config.instructions,
            tools: generatedTools,
        });
    });

    const finalAgent = Agent.create({
        name: agentName,
        instructions: "You determine which agent to use based on the user's input.",
        handoffs: CreatedAgents,
    });

    const result = await run(finalAgent,
        input, {
        conversationId: conversationId,
        stream: true,
    });

    const stream = result.toTextStream({
        compatibleWithNodeStreams: true

    });

    // @ts-ignore
    return new Response(stream);
}



export async function GET(req: NextRequest) {
    const { id: conversationId } = await openai.conversations.create({});
    return NextResponse.json({ conversationId });
}