"use client";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { useConvex, useMutation } from "convex/react";
import React, { useContext, useEffect, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { BotIcon, MoreVertical, Trash2 } from "lucide-react";
import { Agent } from "@/app/types/AgentType";
import moment from "moment";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function MyAgent() {
  const { userDetails } = useContext(UserDetailsContext);
  const [agentList, setAgentList] = useState<Agent[]>([]);
  const convex = useConvex();
  const deleteAgent = useMutation(api.agent.DeleteAgent);
  const router = useRouter();

  useEffect(() => {
    if (!userDetails?._id) return;
    GetUserAgents();
  }, [userDetails]);

  const GetUserAgents = async () => {
    const result = await convex.query(api.agent.GetUserAgents, {
      userId: userDetails._id,
    });
    setAgentList(result);
  };

  const onDeleteAgent = async (e: React.MouseEvent, agentId: any) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await deleteAgent({ agentId });
      toast.success("Agent deleted successfully");
      GetUserAgents();
    } catch (e) {
      toast.error("Failed to delete agent");
    }
  }

  return (
    <div className="w-full mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {agentList.map((agent) => (
          <div key={agent._id} className="relative group">
            <Link href={`/agent-builder/${agent._id}`} className="block p-5 border rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white hover:border-blue-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <BotIcon className="bg-yellow-100 text-yellow-700 p-2 h-10 w-10 rounded-xl" />
                  <div>
                    <h2 className="font-semibold text-lg text-slate-900">{agent.name}</h2>
                    <h2 className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                      Created {moment(agent._creationTime).fromNow()}
                    </h2>
                  </div>
                </div>
              </div>
            </Link>

            <div className="absolute top-4 right-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem
                    onClick={(e) => onDeleteAgent(e, agent._id)}
                    className="text-destructive focus:text-destructive flex items-center gap-2 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Agent
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
