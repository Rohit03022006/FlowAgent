import { Button } from "@/components/ui/button"
import { ChevronLeft, Code2, Save } from "lucide-react"
import { Play, Share } from "lucide-react"
import { Agent } from "@/app/types/AgentType";

type Props = {
    agentDetails: Agent | null;
}

const Header = ({agentDetails}: Props) => {
    return (
        <div className="w-full p-2 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <ChevronLeft className="h-6 w-6" />
                <h2 className="text-lg font-bold ">{agentDetails?.name}</h2>
            </div> 

            <div className="flex items-center gap-4">
                <Button variant={'ghost'}> <Code2 /> Code</Button>         
                <Button> <Play /> Preview</Button>
                <Button> <Share /> Publish</Button>
            </div>

        </div>
    )
}

export default Header