import React from "react";
import { Handle, Position } from "@xyflow/react";
import { MergeIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function IfElseLoop({ data }: any) {
  return (
    <div className="relative rounded-xl border border-gray-200 bg-white shadow-sm min-w-[170px] p-1.5">
      <div className="flex items-center gap-1.5">
        <div className="p-1.5 rounded-md flex items-center justify-center" style={{ backgroundColor: data?.bgColor || "#e0f2fe" }}>
          <MergeIcon className="h-3.5 w-3.5 text-gray-700" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-xs font-medium text-gray-900">Condition</span>
        </div>
      </div>

      <div className="mt-1 max-w-[140px] flex flex-col gap-0.5">
        <Input
          placeholder="If condition"
          className="h-6 text-[10px] px-2"
          disabled
          value={data?.setting?.condition || ""}
        />
        <div className="text-[8px] text-gray-400 px-2 italic">Else: automatic</div>
      </div>


      <Handle type="target" position={Position.Left} className="w-2.5 h-2.5 bg-blue-500 border border-white" />

      <Handle type="source" position={Position.Right} id="if" className="w-2.5 h-2.5 bg-green-500 border border-white" style={{ top: 48 }} />

      <Handle type="source" position={Position.Right} id="else" className="w-2.5 h-2.5 bg-red-500 border border-white" style={{ top: 72 }} />
    </div>
  );
}
