import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Repeat } from "lucide-react";
import { Input } from "@/components/ui/input";

const WhileLoop = ({ data }: any) => {
  return (
    <div className="relative rounded-xl border border-gray-200 bg-white shadow-sm min-w-[170px] p-1.5">
      <div className="flex items-center gap-1.5">
        <div className="p-1.5 rounded-md flex items-center justify-center" style={{ backgroundColor: data?.bgColor || "#ede9fe" }}>
          <Repeat className="h-3.5 w-3.5 text-gray-700" />
        </div>

        <div className="flex flex-col leading-tight">
          <span className="text-xs font-medium text-gray-900">Loop</span>
        </div>
      </div>

      <div className="mt-1">
        <Input placeholder="Condition" className="h-6 text-[10px] px-2" disabled />
      </div>

      <Handle type="target" position={Position.Left} id="input" className="w-2.5 h-2.5 bg-blue-500 border border-white" />

      <Handle type="source" position={Position.Right} id="loop" className="w-2.5 h-2.5 bg-purple-500 border border-white" style={{ top: 49 }} />

    </div>
  );
};

export default WhileLoop;
