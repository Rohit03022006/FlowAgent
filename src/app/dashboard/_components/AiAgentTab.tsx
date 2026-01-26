import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyAgent from "./MyAgent";
import TemplatesAgents from "./TemplatesAgents";

export default function AiAgentTab() {
  return (
    <div className="px-10 md:px-20 lg:px-40 mt-10">
      <Tabs defaultValue="myagents" className="w-full">
        <TabsList>
          <TabsTrigger value="myagents">My Agents</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="myagents"><MyAgent /></TabsContent> 
        <TabsContent value="templates"><TemplatesAgents /></TabsContent>
      </Tabs>
    </div>
  );
}
