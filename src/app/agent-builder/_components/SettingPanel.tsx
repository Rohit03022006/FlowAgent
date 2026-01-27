import React, { useContext } from 'react'
import { WorkFlowContext } from '@/context/WorkFlowContext';
import AgentSetting from '../_nodeSetting/AgentSetting';
import EndSetting from '../_nodeSetting/EndSetting';
import IfElseSetting from '../_nodeSetting/IfElseSetting';
import WhileLoopSetting from '../_nodeSetting/WhileLoopSetting';
import UserApprovalSetting from '../_nodeSetting/UserApprovalSetting';
import ApiAgentSettings from '../_nodeSetting/ApiSetting';
import StartSetting from '../_nodeSetting/StartSetting';

import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useParams } from 'next/navigation';
import { Id } from '../../../../convex/_generated/dataModel';
import { toast } from 'sonner';

export default function SettingPanel() {
    const { selectedNodes, setAddedNodes, addedNodes, nodeEdges } = useContext(WorkFlowContext);
    const updateAgentDetails = useMutation(api.agent.UpdateAgentDetails);
    const { agentId } = useParams();

    const onUpdateNodeData = async (formData: any) => {
        if (!selectedNodes) return;

        const updatedNode = {
            ...selectedNodes,
            data: {
                ...selectedNodes?.data,
                label: formData.name !== undefined ? formData.name : selectedNodes?.data?.label,
                setting: formData
            }
        }

        // Update local state
        const newNodes = addedNodes.map((node: any) =>
            node.id === selectedNodes?.id ? updatedNode : node
        );
        setAddedNodes(newNodes);

        // Auto-save to backend
        try {
            await updateAgentDetails({
                agentId: agentId as Id<"AgentTable">,
                nodes: newNodes,
                edges: nodeEdges
            });
        } catch (error) {
            console.error("Failed to auto-save:", error);
            toast.error("Failed to sync changes to server.");
        }
    }

    if (!selectedNodes) return null;

    return (
        <div className='p-2 bg-gray-50 rounded-2xl shadow text-lg mb-2 text-gray-700 font-bold w-[350px]'>
            {selectedNodes?.type === 'AgentNode' && <AgentSetting selectedNode={selectedNodes} updateFormData={(value: any) => onUpdateNodeData(value)} />}
            {selectedNodes?.type === 'EndNode' && <EndSetting selectedNode={selectedNodes} updateFormData={(value: any) => onUpdateNodeData(value)} />}
            {selectedNodes?.type === 'IfElseLoop' && <IfElseSetting selectedNode={selectedNodes} updateFormData={(value: any) => onUpdateNodeData(value)} />}
            {selectedNodes?.type === 'WhileLoop' && <WhileLoopSetting selectedNode={selectedNodes} updateFormData={(value: any) => onUpdateNodeData(value)} />}
            {selectedNodes?.type === 'UserApproval' && <UserApprovalSetting selectedNode={selectedNodes} updateFormData={(value: any) => onUpdateNodeData(value)} />}
            {selectedNodes?.type === 'ApiNode' && <ApiAgentSettings selectedNode={selectedNodes} updateFormData={(value: any) => onUpdateNodeData(value)} />}
            {selectedNodes?.type === 'StartNode' && <StartSetting selectedNode={selectedNodes} updateFormData={(value: any) => onUpdateNodeData(value)} />}

        </div>
    )
}

