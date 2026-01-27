"use client";
import Header from '@/app/agent-builder/_components/Header'
import React, { useEffect, useState } from 'react'
import { useConvex, useQuery, useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import { nodeTypes } from '../../_constants/nodeTypes';
import '@xyflow/react/dist/style.css';
import { Agent } from '@/app/types/AgentType';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Loader2Icon, Bot, Sparkles } from 'lucide-react';
import ChatUi from './_components/ChatUi';

export default function PreviewPage() {
    const { agentId } = useParams();
    const [loading, setLoading] = useState(false);
    const [config, setConfig] = useState<any>();

    const agentDetails = useQuery(api.agent.GetAgentById, {
        agentId: agentId as Id<"AgentTable">
    });

    const updateAgentToolConfig = useMutation(api.agent.UpdateAgentToolConfig);

    useEffect(() => {
        if (agentDetails) {
            GenerateWorkflow();
        }
    }, [agentDetails]);


    const GenerateWorkflow = () => {
        if (!agentDetails) return;

        const edgeMap = agentDetails?.edges?.reduce((acc: any, edge: any) => {
            if (!acc[edge.source]) acc[edge.source] = [];
            acc[edge.source].push(edge);
            return acc;
        }, {});


        const flow = agentDetails?.nodes?.map((node: any) => {
            const connectedEdges = edgeMap[node.id] || [];
            let next: any = null;

            switch (node.type) {
                case "IfElseLoop": {
                    const ifEdge = connectedEdges.find((e: any) => e.sourceHandle === "if");
                    const elseEdge = connectedEdges.find((e: any) => e.sourceHandle === "else");
                    next = {
                        if: ifEdge?.target || null,
                        else: elseEdge?.target || null,
                    };
                    break;
                }
                case "AgentNode":
                case "ApiNode":
                case "UserApproval":
                case "StartNode": {
                    if (connectedEdges.length === 1) {
                        next = connectedEdges[0].target;
                    } else if (connectedEdges.length > 1) {
                        next = connectedEdges.map((e: any) => e.target);
                    }
                    break;
                }
                case "EndNode": {
                    next = null;
                    break;
                }
                default: {
                    if (connectedEdges.length === 1) {
                        next = connectedEdges[0].target;
                    } else if (connectedEdges.length > 1) {
                        next = connectedEdges.map((e: any) => e.target);
                    }
                    break;
                }
            }
            return {
                id: node.id,
                type: node.type,
                label: node.data?.label || node.type,
                settings: node.data?.settings || {},
                next,
            };
        });

        const startNode = agentDetails?.nodes?.find((n: any) => n.type === "StartNode");

        const generatedConfig = {
            startNode: startNode?.id || null,
            flow,
        };

        console.log(" Generated Workflow Config:", generatedConfig);
        setConfig(generatedConfig);

        if (!agentDetails.agentToolConfig && !loading) {
            GenerateAgentToolsConfig(generatedConfig);
        }
    };

    const GenerateAgentToolsConfig = async (configData?: any) => {
        const dataToUse = configData?.flow ? configData : config;
        if (!dataToUse) {
            console.warn("No flow config available to generate tools");
            return;
        }

        setLoading(true);
        try {
            console.log("Generating agent tools with config:", dataToUse);
            const result = await axios.post("/api/generate-agent-tool-config/", {
                jsonConfig: dataToUse
            });

            console.log("AI Generation Result:", result.data);

            if (result.data) {
                await updateAgentToolConfig({
                    agentId: agentId as Id<"AgentTable">,
                    agentToolConfig: result.data
                });
                console.log("Database updated successfully");
            }
        } catch (error) {
            console.error("Error generating agent tool config:", error);
        } finally {
            setLoading(false);
        }
    }


    if (agentDetails === undefined) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <div className="animate-pulse text-lg font-medium text-muted-foreground">Loading preview...</div>
            </div>
        );
    }

    if (agentDetails === null) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <div className="text-lg font-medium text-destructive">Agent not found</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden">
            <Header previewHeader={true} agentDetails={agentDetails} />
            <div className="grid grid-cols-5 gap-1 h-full">
                <div className="col-span-4 p-4 border rounded-2xl m-1 overflow-hidden">
                    <h2 className='text-lg font-semibold mb-2'>Preview</h2>
                    <div className="h-[calc(100%-2rem)] w-full">
                        <ReactFlow
                            nodes={agentDetails?.nodes || []}
                            edges={agentDetails?.edges || []}
                            fitView
                            nodeTypes={nodeTypes}
                            nodesDraggable={false}
                            nodesConnectable={false}
                            elementsSelectable={false}
                        >
                            <Controls showInteractive={false} />
                        </ReactFlow>
                    </div>
                </div>
                <div className="col-span-1 border rounded-2xl m-1 flex flex-col bg-white overflow-hidden shadow-sm">
                    {agentDetails?.agentToolConfig ? (
                        <div className="flex-1 flex flex-col overflow-hidden p-2">
                            <ChatUi
                                GenerateAgentToolConfig={() => GenerateAgentToolsConfig()}
                                loading={loading}
                                agentDetails={agentDetails}
                            />
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
                            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                                <Bot className="w-8 h-8 text-blue-500" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-slate-900">Agent Not Generated</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Before you can chat, we need to transform your visual workflow into a functional agent configuration.
                                </p>
                            </div>

                            <Button
                                onClick={() => GenerateAgentToolsConfig()}
                                disabled={loading}
                                className="w-full shadow-lg shadow-blue-100"
                            >
                                {loading ? (
                                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Sparkles className="mr-2 h-4 w-4" />
                                )}
                                Generate Agent
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
