import React from "react";
import { Handle, Position } from "@xyflow/react";
import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserApproval({ data }: any) {
  return (
    <div className="relative rounded-xl border border-gray-200 bg-white shadow-sm min-w-[170px] p-1.5">

      <div className="flex items-center gap-1.5">
        <div className="p-1.5 rounded-md flex items-center justify-center" style={{ backgroundColor: data?.bgColor || "#dcfce7" }}>
          <ThumbsUp className="h-3.5 w-3.5 text-gray-700" />
        </div>

        <div className="flex flex-col leading-tight">
          <span className="text-xs font-medium text-gray-900">
           User Approval
          </span>
        </div>
      </div>

      <div className="mt-1 text-[10px] text-gray-500">
        Requires user confirmation
      </div>

      <div className="mt-1 flex flex-col gap-0.5 nodrag">
        <Button variant="outline" className="h-6 text-[10px] px-2" disabled >
          Approve
        </Button>
        <Button variant="outline" className="h-6 text-[10px] px-2" disabled>
          Reject
        </Button>
      </div>

      <Handle type="target" position={Position.Left} className="w-2.5 h-2.5 bg-blue-500 border border-white" />

      <Handle type="source" position={Position.Right} id="approved" className="w-2.5 h-2.5 bg-green-500 border border-white"  style={{ top: 67 }} />

      <Handle type="source" position={Position.Right} id="rejected" className="w-2.5 h-2.5 bg-red-500 border border-white" style={{ top: 92 }} />
    </div>
  );
};


 