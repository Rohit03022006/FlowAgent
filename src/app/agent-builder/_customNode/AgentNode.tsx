import { MousePointerClick } from 'lucide-react'
import React from 'react'
import { Handle, Position } from '@xyflow/react'

export default function AgentNode({ data }: any) {
    return (
        <div className="flex items-center gap-2 p-2 rounded-2xl border border-gray-200 bg-white shadow-sm min-w-[150px]">
            <div className="flex items-center gap-2 w-full">
                <div
                    className="p-2 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: data?.bgColor || '#e2e8f0' }}
                >
                    <MousePointerClick className="h-4 w-4 text-gray-700" />
                </div>
                <div className="flex flex-col">
                    <h2 className='text-xs text-muted-foreground'>Agent</h2>
                    <h2 className="text-sm font-medium text-gray-900">{data?.label || 'Agent'}</h2>
                </div>
                <Handle type="source" position={Position.Right} className="w-3 h-3 bg-blue-500 border-2 border-white" />
                <Handle type="target" position={Position.Left} className="w-3 h-3 bg-blue-500 border-2 border-white" />
            </div>
        </div>
    )
}

