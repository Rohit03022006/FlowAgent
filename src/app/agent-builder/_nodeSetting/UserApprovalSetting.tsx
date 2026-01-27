import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'

const defaultFormData = {
    name: "",
    message: "",  
};

export default function UserApprovalSetting({ selectedNode, updateFormData }: any) {
    const [formData, setFormData] = useState(defaultFormData)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (selectedNode) {
            setFormData(selectedNode?.data?.setting || defaultFormData);
        }
    }, [selectedNode]);

    const handleChange = (key: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const onSave = () => {
        setLoading(true);
        updateFormData(formData)
        toast.success("User Approval setting saved successfully!");
        setLoading(false);
    }

    return (
        <div className="space-y-4">
            <div>
                <h2 className='text-lg font-semibold'>User Approval</h2>
                <p className='text-sm text-muted-foreground leading-tight'>Pause for a human approval or rejection as per the condition</p>
            </div>

            <div className='space-y-2'>
               
                <Label>Name</Label>
                <Input
                    placeholder="Name"
                    onChange={(e) => handleChange("name", e.target.value)}
                    value={formData?.name || ""}
                />
                <Label>Message</Label>
                <Textarea
                    placeholder="Describe the message to show to the user"
                    onChange={(e) => handleChange("message", e.target.value)}
                    value={formData?.message || ""}
                />
            </div>

            <Button className="w-full mt-2" onClick={onSave} disabled={loading}>
                {loading ? <Loader2 className='h-4 w-4 mr-2 animate-spin' /> : <Save className='h-4 w-4 mr-2' />}
                {loading ? "Saving..." : "Save"}
            </Button>
        </div>
    )
}
