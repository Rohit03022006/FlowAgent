import { Button } from "@/components/ui/button"
import { ChevronLeft, Code2, Save, X } from "lucide-react"
import { Play, Share } from "lucide-react"
import { Agent } from "@/app/types/AgentType";
import Link from "next/link";

type Props = {
    agentDetails: Agent | null;
    previewHeader?: boolean;
    onPublish: () => void;  
}

const Header = ({ agentDetails, previewHeader = false, onPublish }: Props) => {
    return (
        <div className="w-full p-2 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <Link href={'/dashboard'}>
                    <Button variant={'ghost'} size={'icon'}>
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                </Link>
                <h2 className="text-lg font-bold ">{agentDetails?.name}</h2>
            </div>

            <div className="flex items-center gap-4">
                <Button variant={'ghost'}> <Code2 /> Code</Button>
                {!previewHeader ? <Link href={`/agent-builder/${agentDetails?._id}/preview`}>
                    <Button> <Play /> Preview</Button>
                </Link> : <Link href={`/agent-builder/${agentDetails?._id}`}>
                    <Button variant={'outline'}> <X /> Close Preview</Button>
                </Link>}
                <Button onClick={onPublish}> <Share /> Publish</Button>
            </div>

        </div>
    )
}

export default Header