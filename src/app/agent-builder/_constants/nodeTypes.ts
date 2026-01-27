import StartNode from '../_customNode/StartNode';
import AgentNode from '../_customNode/AgentNode';
import EndNode from '../_customNode/EndNode';
import IfElseLoop from '../_customNode/IfElseLoop';
import WhileLoop from '../_customNode/WhileLoop';
import UserApproval from '../_customNode/UserApprovalNode';
import ApiNode from '../_customNode/ApiNode';

export const nodeTypes = {
    StartNode: StartNode,
    AgentNode: AgentNode,
    EndNode: EndNode,
    IfElseLoop: IfElseLoop,
    WhileLoop: WhileLoop,
    UserApproval: UserApproval,
    ApiNode: ApiNode,
};
