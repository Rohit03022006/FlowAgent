import { Handle, Position } from '@xyflow/react'
import { Square } from 'lucide-react'
import React from 'react'

export default function EndNode() {
  return (
    <div className="flex items-center gap-2 p-2 rounded-2xl border border-gray-200 bg-white shadow-sm min-w-[150px]">
      <div className="flex items-center gap-2 w-full">
        <div className="p-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFE3E3' }}>
          <Square className="h-4 w-4 text-gray-700" />
        </div>

        <div className="flex flex-col">
          <h2 className="text-sm font-medium text-gray-900">End</h2>
        </div>

        <Handle type="target" position={Position.Left} className="w-3 h-3 bg-blue-500 border-2 border-white" />
      </div>
    </div>

  )
}
