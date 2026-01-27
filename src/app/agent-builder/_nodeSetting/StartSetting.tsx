"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, Rocket, Info } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const defaultFormData = {
    name: "Start Workflow",
    description: "The entry point of your agentic flow.",
    systemPrompt: "",
};

const StartSetting = ({ selectedNode, updateFormData }: any) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(defaultFormData);

    useEffect(() => {
        if (selectedNode) {
            setFormData({
                ...defaultFormData,
                name: selectedNode.data?.label || defaultFormData.name,
                ...(selectedNode.data?.setting || {})
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
        updateFormData(formData);
        toast.success("Start node settings saved successfully!");
        setLoading(false);
    };

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-lg font-semibold">Start</h2>
                <p className="text-sm text-muted-foreground leading-tight">
                    Configure the global context for your workflow
                </p>
            </div>

            {/* Node Label */}
            <div className="space-y-2">
                <Label>Node Label</Label>
                <Input
                    placeholder="Enter node label..."
                    onChange={(e) => handleChange("name", e.target.value)}
                    value={formData?.name || ""}
                />
            </div>

            {/* Description */}
            <div className="space-y-2">
                <Label>Description</Label>
                <Input
                    placeholder="Briefly describe what this flow does..."
                    onChange={(e) => handleChange("description", e.target.value)}
                    value={formData?.description || ""}
                />
            </div>

            {/* System Prompt */}
            <div className="space-y-2">
                <Label>Global System Prompt</Label>
                <Textarea
                    placeholder="Set the global personality and rules for this workflow..."
                    className="min-h-[150px]"
                    onChange={(e) => handleChange("systemPrompt", e.target.value)}
                    value={formData?.systemPrompt || ""}
                />
                <p className="text-[10px] text-muted-foreground italic">
                    This prompt will be available to all AI agents within this flow.
                </p>
            </div>

            {/* Save Button */}
            <Button
                className="w-full mt-2"
                onClick={onSave}
                disabled={loading}
            >
                {loading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                    <Save className="h-4 w-4 mr-2" />
                )}
                {loading ? "Saving..." : "Save"}
            </Button>
        </div>

    );
};

export default StartSetting;