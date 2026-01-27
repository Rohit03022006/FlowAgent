import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Webhook } from "lucide-react";

const ApiNode = ({ data }: any) => {
    return (
        <div className="relative rounded-xl border border-gray-200 bg-white shadow-sm min-w-[170px] p-1.5">
            <div className="flex items-center gap-1.5">
                <div className="p-1.5 rounded-md flex items-center justify-center" style={{ backgroundColor: data?.bgColor || "#e2e8f0" }}>
                    <Webhook className="h-3.5 w-3.5 text-gray-700" />
                </div>

                <div className="flex flex-col leading-tight">
                    <span className="text-xs text-muted-foreground">API</span>
                    <span className="text-sm font-medium text-gray-900"> {data?.label || "API"}</span>
                </div>
            </div>

            <Handle type="target" position={Position.Left} className="w-2.5 h-2.5 bg-blue-500 border border-white" />
            <Handle type="source" position={Position.Right} className="w-2.5 h-2.5 bg-green-500 border border-white" />
        </div>

    );
};

export default ApiNode;
