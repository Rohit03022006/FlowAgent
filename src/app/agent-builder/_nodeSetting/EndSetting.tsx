import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'

const defaultFormData = {
    schema: ""
};

export default function EndSetting({ selectedNode, updateFormData }: any) {
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
        toast.success("End setting saved successfully!");
        setLoading(false);
    }

    return (
        <div className="space-y-4">
            <div>
                <h2 className='text-lg font-semibold'>End</h2>
                <p className='text-sm text-muted-foreground leading-tight'>Choose what to do when the workflow ends</p>
            </div>

            <div className='space-y-2'>
                <Label>Output Schema (JSON)</Label>
                <Textarea
                    placeholder='{ "result": "string" }'
                    className="min-h-[150px]"
                    onChange={(e) => handleChange("schema", e.target.value)}
                    value={formData?.schema || ""}
                />
            </div>
            <Button className="w-full mt-2" onClick={onSave} disabled={loading}>
                {loading ? <Loader2 className='h-4 w-4 mr-2 animate-spin' /> : <Save className='h-4 w-4 mr-2' />}
                {loading ? "Saving..." : "Save"}
            </Button>
        </div>
    )
}


