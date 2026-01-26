import React, { useContext } from 'react'
import { MousePointer, Square, MergeIcon , Repeat, ThumbsUp, Webhook } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { WorkFlowContext } from '@/context/WorkFlowContext';

const AgentTools = [
    {
        name: 'Agent',
        icon: MousePointer,
        bgColor: '#CDF7E3', // Light mint green
        id: 'agent',
        type: 'AgentNode',
    },
    {
        name: 'End',
        icon: Square,
        bgColor: '#FFE3E3', // Soft pastel red
        id: 'end',
        type: 'EndNode',
    },
    {
        name: 'If/Else',
        icon: MergeIcon,
        bgColor: '#FFF3CD', // Light pastel yellow
        id: 'ifElse',
        type: 'IfElseLoop',
    },
    {
        name: 'While/Repeat',
        icon: Repeat,
        bgColor: '#E3F2FD', // Light blue
        id: 'while',
        type: 'WhileLoop',
    },
    {
        name: 'User Approval',
        icon: ThumbsUp,
        bgColor: '#EADCF8', // Light lavender
        id: 'approval',
        type: 'UserApproval',
    },
    {
        name: 'API',
        icon: Webhook,
        bgColor: '#D1F0FF', // Light cyan
        id: 'api',
        type: 'ApiNode',
    },
];
const AgentToolPanel = () => {
    const { addedNodes, setAddedNodes } = useContext(WorkFlowContext);
    const onAgentToolClick = (tool: any) => {
        const { icon, ...toolWithoutIcon } = tool;
        const newNode = {
            id: `${tool.id}-${Date.now()}`,
            position: { x: 0, y: 100 },
            data: { ...toolWithoutIcon, label: tool.name, id: `${tool.id}-${Date.now()}`, type: tool.type },
            type: tool.type
        };
        setAddedNodes((prev: any) => [...prev, newNode]);
    }

    return (
        <div className="p-2 bg-gray-50 rounded-2xl shadow">
            <h2 className="text-lg mb-2 text-gray-700 font-bold">Agent Tools</h2>
            <div>
                {AgentTools.map((tool, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 rounded-xl" onClick={() => onAgentToolClick(tool)}>
                        <tool.icon className="p-2 rounded-lg h-8 w-8 bg-gray-200" style={{ backgroundColor: tool.bgColor }} />
                        <h2 className="text-sm font-medium">{tool.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AgentToolPanel