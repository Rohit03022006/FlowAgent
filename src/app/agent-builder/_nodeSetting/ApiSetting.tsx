"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { FileJson } from "lucide-react";

type ApiSettings = {
  name: string;
  method: "GET" | "POST";
  url: string;
  apiKey: string;
  includeApiKey: boolean;
  bodyParams: string;
};

const defaultFormData: ApiSettings = {
  name: "",
  method: "GET",
  url: "",
  apiKey: "",
  includeApiKey: true,
  bodyParams: "",
};

function ApiAgentSettings({
  selectedNode,
  updateFormData,
}: any) {
  const [formData, setFormData] = useState<ApiSettings>(defaultFormData);

  useEffect(() => {
    if (selectedNode) {
      setFormData({
        ...defaultFormData,
        name: selectedNode.data.label || "",
        ...(selectedNode.data.setting || {})
      });
    }
  }, [selectedNode]);


  const handleChange = (key: keyof ApiSettings, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSave = () => {
    updateFormData(formData);
    toast.success("API Agent Settings Updated!");
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-bold text-lg">API Agent</h2>
        <p className="text-sm text-gray-500">Call an external API endpoint with your chosen method</p>
      </div>

      {/* Name */}
      <div className="space-y-1">
        <Label>Name</Label>
        <Input placeholder="API Agent Name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
      </div>

      {/* Method */}
      <div className="space-y-1">
        <Label>Request Method</Label>
        <Select value={formData.method} onValueChange={(value) => handleChange("method", value as "GET" | "POST")}>
          <SelectTrigger>
            <SelectValue placeholder="Select Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* URL */}
      <div className="space-y-1">
        <Label>API URL</Label>
        <Input placeholder="https://api.example.com/data" value={formData.url} onChange={(e) => handleChange("url", e.target.value)} />
      </div>

      {/* API Key Toggle */}
      <div className="flex items-center justify-between">
        <Label>Include API Key</Label>
        <Switch checked={formData.includeApiKey} onCheckedChange={(checked) => handleChange("includeApiKey", checked)} />
      </div>

      {/* API Key */}
      {formData.includeApiKey && (
        <div className="space-y-1">
          <Label>API Key</Label>
          <Input type="password" placeholder="Enter API Key" value={formData.apiKey} onChange={(e) => handleChange("apiKey", e.target.value)} />
        </div>
      )}

      {/* Body Params */}
      {formData.method === "POST" && (
        <div className="space-y-1">
          <Label>Body Parameters (JSON)</Label>
          <Textarea className="h-24" placeholder={`{
  "param1": "value1",
  "param2": "value2"
}`}
            value={formData.bodyParams}
            onChange={(e) =>
              handleChange("bodyParams", e.target.value)
            }
          />
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
            <FileJson className="h-4 w-4" />
            Add valid JSON body for POST requests
          </div>
        </div>
      )}

      <Button className="w-full mt-2" onClick={onSave}>
        Save
      </Button>
    </div>
  );
}

export default ApiAgentSettings;
