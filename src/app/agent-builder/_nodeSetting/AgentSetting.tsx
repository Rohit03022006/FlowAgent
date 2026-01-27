import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FileJson2, Loader2, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const defaultFormData = {
    name: "",
    instructions: "",
    includeHistory: true,
    model: "gemini-flash-1.5",
    output: "text",
    schema: "",
};

const AgentSetting = ({ selectedNode, updateFormData }: any) => {

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState(defaultFormData);

    useEffect(() => {
        if (selectedNode) {
            setFormData({
                ...defaultFormData,
                name: selectedNode.data.label || "",
                ...(selectedNode.data.setting || {})
            });
        }
    }, [selectedNode]);

    const handleChange = (key: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const onSave = () => {
        setLoading(true);
        console.log(formData);
        updateFormData(formData)
        toast.success("Agent setting saved successfully!");
        setLoading(false);
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-lg font-semibold">Agent</h2>
                <p className="text-sm text-muted-foreground">
                    Call the AI model with your instructions
                </p>
            </div>

            {/* Name */}
            <div className="space-y-2">
                <Label>Name</Label>
                <Input placeholder="Agent name" onChange={(e) => handleChange("name", e.target.value)} value={formData?.name || ""} />
            </div>

            {/* Instruction */}
            <div className="space-y-2">
                <Label>Instruction</Label>
                <Textarea placeholder="Describe what this agent should do..." className="min-h-[100px]" onChange={(e) => handleChange("instructions", e.target.value)} value={formData?.instructions || ""} />

                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground px-0">
                    <FileJson2 className="h-4 w-4" />
                    Add context
                </Button>
            </div>

            {/* Chat History */}
            <div className="flex items-center justify-between rounded-lg border p-3">
                <Label>Include chat history</Label>
                <Switch onCheckedChange={(checked) => handleChange("includeHistory", checked)} checked={formData?.includeHistory} />
            </div>

            {/* Model */}
            <div className="flex items-center justify-between gap-4">
                <Label className='whitespace-nowrap'>Model</Label>
                <Select onValueChange={(value) => handleChange("model", value)} value={formData?.model}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="gemini-3-pro">Gemini 3 Pro</SelectItem>
                        <SelectItem value="gemini-flash-1.5">Gemini Flash 1.5</SelectItem>
                        <SelectItem value="gemini-2.5-pro">Gemini 2.5 Pro</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Output Format */}
            <div className="space-y-3">
                <Label>Output format</Label>
                <Tabs defaultValue="text" className="w-[400px]" onValueChange={(value) => handleChange("output", value)} value={formData?.output}>
                    <TabsList>
                        <TabsTrigger value="text">Text</TabsTrigger>
                        <TabsTrigger value="json">JSON</TabsTrigger>
                    </TabsList>
                    <TabsContent value="text">
                        <p className="text-sm text-muted-foreground">Output will be returned as plain text.</p>
                    </TabsContent>
                    <TabsContent value="json" className="space-y-2">
                        <p className="text-sm text-muted-foreground">Enter a JSON schema the model must follow.</p>
                        <Textarea placeholder='{ "title": "string" }' className="min-h-[300px]" onChange={(e) => handleChange("schema", e.target.value)} value={formData?.schema || ""} />
                    </TabsContent>
                </Tabs>
            </div>

            <Button className="w-full" onClick={onSave} disabled={loading} > {loading ? <Loader2 className='h-4 w-4 mr-2 animate-spin' /> : <Save className='h-4 w-4 mr-2' />} {loading ? "Saving..." : "Save"}</Button>
        </div>
    );
};


export default AgentSetting;
