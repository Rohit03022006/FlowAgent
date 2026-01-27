"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";

import { api } from "../../convex/_generated/api";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { WorkFlowContext } from "@/context/WorkFlowContext";
import { Toaster } from "@/components/ui/sonner";
import { ReactFlowProvider } from "@xyflow/react";

function Provider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const createUser = useMutation(api.user.CreateNewUser);
  const [userDetails, setUserDetails] = useState<any>();
  const [selectedNodes, setSelectedNodes] = useState<any>();
  const [addedNodes, setAddedNodes] = useState([
    {
      id: "start",
      position: { x: 0, y: 0 },
      data: { label: "Start" },
      type: "StartNode",
    }
  ]);
  const [nodeEdges, setNodeEdges] = useState([]);

  useEffect(() => {
    user && CreateAndGetUser();
  }, [user]);

  const CreateAndGetUser = async () => {
    if (user) {
      const result = await createUser({
        name: user.fullName ?? " ",
        email: user.primaryEmailAddress?.emailAddress ?? " ",
        imageUrl: user.imageUrl ?? "",
      });
      //save  to context
      setUserDetails(result);
    }
  };
  return (
    <div>
      <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
        <ReactFlowProvider>
          <WorkFlowContext.Provider value={{ addedNodes, setAddedNodes, nodeEdges, setNodeEdges, selectedNodes, setSelectedNodes }}>
            <div>
              {children}
              <Toaster />
            </div>
          </WorkFlowContext.Provider>
        </ReactFlowProvider>
      </UserDetailsContext.Provider>
    </div>
  );
}

export default Provider;
