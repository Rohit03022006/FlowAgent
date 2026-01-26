"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon, Plus } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { UserDetailsContext } from "@/context/UserDetailsContext";


export default function CreateAgentSection() {
  const [openDialog, setOpenDialog] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [loader, setLoader] = useState(false);

  const router = useRouter();
  const { userDetails } = useContext(UserDetailsContext);

  const CreateAgentMutation = useMutation(api.agent.CreateAgent);

  const CreateAgent = async () => {
    if (loader || !userDetails?._id) return;

    setLoader(true);

    try {
      const agentId = await CreateAgentMutation({
        name: agentName.trim() || "New Agent",
        userId: userDetails._id,
      });

      setOpenDialog(false);
      await new Promise((resolve) => setTimeout(resolve, 300));

      router.push(`/agent-builder/${agentId}`);
    } catch (error) {
      console.error("Failed to create agent:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="space-y-2 flex flex-col justify-center items-center mt-3 text-center">
      <h1 className="text-3xl font-semibold tracking-tight font-mono">
        Create AI Agent
      </h1>

      <p className="text-base text-muted-foreground max-w-md font-sans">
        Create powerful AI agent workflows with customizable tools and
        instructions.
      </p>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button size="lg" className="mt-6 font-medium">
            <Plus className="mr-2 h-4 w-4" />
            Create New Agent
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-mono text-lg">
              Enter Agent Name
            </DialogTitle>

            <DialogDescription>
              <Input
                placeholder="Agent Name"
                className="mt-4 w-full font-sans"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                disabled={loader}
              />
            </DialogDescription>
          </DialogHeader>

          {/* ✅ Footer MUST be here */}
          <DialogFooter>
            <DialogClose asChild disabled={loader}>
              <Button variant="ghost" disabled={loader}>
                Cancel
              </Button>
            </DialogClose>

            <Button
              onClick={CreateAgent}
              disabled={loader}
              className="min-w-35"
            >
              {loader ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Agent"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>

      </Dialog>
    </div>
  );
}
