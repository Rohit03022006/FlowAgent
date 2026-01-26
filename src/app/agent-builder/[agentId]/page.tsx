"use client";
import React, { useCallback, useEffect, useState } from 'react'
import Header from '../_components/Header'
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, MiniMap, Controls, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import StartNode from '../_customNode/StartNode';
import AgentNode from '../_customNode/AgentNode';
import EndNode from '../_customNode/EndNode';
import IfElseLoop from '../_customNode/IfElseLoop';
import AgentToolPanel from '../_components/AgentToolPanel';
import { WorkFlowContext } from '@/context/WorkFlowContext';
import { useContext } from 'react';
import { useConvex, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useParams } from 'next/navigation';
import { Agent } from '@/app/types/AgentType';
import { Id } from '../../../../convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import WhileLoop from '../_customNode/WhileLoop';
import UserApproval from '../_customNode/UserApprovalNode';
import ApiNode from '../_customNode/ApiNode';

const AgentBuilder = () => {

  const nodeTypes = {
    StartNode: StartNode,
    AgentNode: AgentNode,
    EndNode: EndNode,
    IfElseLoop: IfElseLoop,
    WhileLoop: WhileLoop,
    UserApproval: UserApproval,
    ApiNode: ApiNode,
  };
  const { addedNodes, setAddedNodes, nodeEdges, setNodeEdges } = useContext(WorkFlowContext);

  const convex = useConvex();
  const UpdateAgentDetails = useMutation(api.agent.UpdateAgentDetails);
  const { agentId } = useParams();

  const [agentDetails, setAgentDetails] = useState<Agent | null>(null);

  useEffect(() => {
    GetAgentDetails();
  }, []);

  const GetAgentDetails = async () => {
    const result = await convex.query(api.agent.GetAgentById, {
      agentId: agentId as Id<"AgentTable">
    });
    setAgentDetails(result);
    if (result?.nodes && result?.nodes?.length > 0) {
      setAddedNodes(result.nodes);
    }
    if (result?.edges && result?.edges?.length > 0) {
      setNodeEdges(result.edges);
    }
  }

  useEffect(() => {
    if (agentDetails) {
      if (agentDetails.nodes && agentDetails.nodes.length > 0) {
        setAddedNodes(agentDetails.nodes);
      }
      if (agentDetails.edges && agentDetails.edges.length > 0) {
        setNodeEdges(agentDetails.edges);
      }
    }
  }, [agentDetails, setAddedNodes, setNodeEdges]);

  const SaveNodesAndEdges = async () => {
    if (!agentDetails?._id) return;
    const toastId = toast.loading("Saving agent works...");
    try {
      const result = await UpdateAgentDetails({
        name: agentDetails?.name,
        agentId: agentDetails._id,
        nodes: JSON.parse(JSON.stringify(addedNodes)),
        edges: JSON.parse(JSON.stringify(nodeEdges)),
      });
      console.log(result);
      toast.success("Agent saved successfully!", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Failed to save agent.", { id: toastId });
    }
  }

  const onNodesChange = useCallback(
    (changes: any) => setAddedNodes((nds: any) => applyNodeChanges(changes, nds)),
    [setAddedNodes],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setNodeEdges((eds: any) => applyEdgeChanges(changes, eds)),
    [setNodeEdges],
  );
  const onConnect = useCallback(
    // @ts-ignore
    (params: any) => setNodeEdges((eds: any) => addEdge(params, eds)),
    [setNodeEdges],
  );



  return (
    <div>
      <Header agentDetails={agentDetails} />
      <div style={{ width: '100vw', height: '90vh' }}>
        <ReactFlow
          nodes={addedNodes}
          edges={nodeEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
        >
          <MiniMap />
          <Controls />
          {/* @ts-ignore */}
          <Background variant="dots" gap={12} size={1} color="#6e6e6eff" />
          <Panel position="top-left">
            <AgentToolPanel />
          </Panel>
          <Panel position="top-right">
            Settings
          </Panel>

          <Panel position="bottom-center">
            <Button onClick={SaveNodesAndEdges}><Save /> Save</Button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  )
}

export default AgentBuilder
