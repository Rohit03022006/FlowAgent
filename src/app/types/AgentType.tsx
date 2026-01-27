import { Id } from "../../../convex/_generated/dataModel";

export type Agent = {

  _creationTime: number,
  _id: Id<"AgentTable">;
  name: string;
  config?: any;
  published: boolean;
  nodes?: any;
  edges?: any;
  userId: Id<"UserTable">;
  createdAt: number;
  updatedAt?: number;
  agentToolConfig?: any;
}