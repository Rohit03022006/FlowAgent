"use client";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { useConvex } from "convex/react";
import React, { useContext, useEffect, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { BotIcon } from "lucide-react";
import { Agent } from "@/app/types/AgentType";
import moment from "moment";
import Link from "next/link";

export default function MyAgent() {
  const { userDetails } = useContext(UserDetailsContext);
  const [agentList, setAgentList] = useState<Agent[]>([]);
  const convex = useConvex();

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

  return (
    <div className="w-full mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {agentList.map((agent) => (
          <Link href={`/agent-builder/${agent._id}`} key={agent._id} className="p-4 mb-2 border rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <BotIcon className="inline-block mr-2 bg-yellow-200 p-1 h-8 w-8 rounded-sm" />
            <h2 className="font-medium text-lg">{agent.name}</h2>
            <h2 className="text-sm text-gray-500">{moment(agent._creationTime).fromNow()}</h2>
          </Link>
        ))}
      </div>
      
    </div>
  );
}
