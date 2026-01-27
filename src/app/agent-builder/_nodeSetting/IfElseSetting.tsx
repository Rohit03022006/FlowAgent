import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'

const defaultFormData = {
    condition: "",
};


export default function IfElseSetting({ selectedNode, updateFormData }: any) {
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
        toast.success("If/Else setting saved successfully!");
        setLoading(false);
    }

    return (
        <div className="space-y-4">
            <div>
                <h2 className='text-lg font-semibold'>If/Else Condition</h2>
                <p className='text-sm text-muted-foreground leading-tight'>Define the logic for branching the workflow</p>
            </div>

            <div className='space-y-2'>
                <Label>Condition</Label>
                <Input
                    placeholder="e.g. data.status === 'success'"
                    onChange={(e) => handleChange("condition", e.target.value)}
                    value={formData?.condition || ""}
                />
                <p className='text-[10px] text-muted-foreground'>Use JavaScript expression for the condition.</p>
            </div>

            <Button className="w-full mt-2" onClick={onSave} disabled={loading}>
                {loading ? <Loader2 className='h-4 w-4 mr-2 animate-spin' /> : <Save className='h-4 w-4 mr-2' />}
                {loading ? "Saving..." : "Save"}
            </Button>
        </div>
    )
}
