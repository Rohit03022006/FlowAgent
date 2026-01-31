"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Send, Bot, User, Sparkles, ShieldCheck, Zap, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

type Prop = {
  GenerateAgentToolConfig: any;
  loading: boolean;
  agentDetails: any;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatUi({ GenerateAgentToolConfig, loading, agentDetails }: Prop) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Welcome to ${agentDetails?.name || 'your Agent'}! I've been configured based on your workflow. How can I assist you today?`,
      timestamp: new Date()
    }
  ]);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [userInput, setUserInput] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: userInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const inputToSend = userInput;
    setUserInput('');
    setLoadingMessage(true);

    try {
      const response = await fetch("/api/agent-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agentName: agentDetails?.name,
          agentDetails: agentDetails?.config?.agent || [],
          input: inputToSend,
          conversationId: ""
        })
      });

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      // Add a placeholder assistant message that we will stream into
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          setMessages(prev => {
            const last = prev[prev.length - 1];
            if (last && last.role === 'assistant') {
              const updated = [...prev];
              updated[updated.length - 1] = {
                ...last,
                content: last.content + chunk
              };
              return updated;
            }
            return prev;
          });
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoadingMessage(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Premium Header */}
      <div className="px-5 py-4 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-100">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 leading-tight flex items-center gap-1.5">
              {agentDetails?.name || "Agent Name"}
              <div className="p-0.5 bg-blue-50 rounded">
                <Zap className="w-3 h-3 text-blue-500 fill-blue-500" />
              </div>
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-green-600 font-bold flex items-center gap-1 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Online
              </span>
              <span className="text-[10px] text-slate-400 font-medium border-l pl-2 border-slate-200 uppercase tracking-wider">
                Preview Mode
              </span>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={GenerateAgentToolConfig}
          disabled={loading}
          className="h-9 w-9 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          title="Regenerate Agent Configuration"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-1 bg-slate-50/30">
        <div className="p-5 space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm border ${msg.role === 'user'
                ? 'bg-slate-900 border-slate-800 text-white'
                : 'bg-white border-slate-200 text-blue-600'
                }`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`flex flex-col space-y-1 max-w-[85%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
                  }`}>
                  {msg.content}
                </div>
                <span className="text-[10px] text-slate-400 px-1 font-medium">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input Footer */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0">
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <Sparkles className="w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <Input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Message your agent..."
            className="pl-11 pr-14 py-6 bg-slate-50 border-slate-200 rounded-2xl text-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:bg-white transition-all shadow-inner border-none"
          />
          <div className="absolute inset-y-0 right-1.5 flex items-center">
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!userInput.trim() || loading}
              className="h-10 w-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-100 transition-all hover:scale-105 active:scale-95"
            >
              {loadingMessage && <Loader2 className="w-4 h-4 animate-spin" />}
              {!loadingMessage && <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center gap-5 text-[10px] text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-slate-300" /> Secure Sandbox
          </span>
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-slate-300" /> High Performance
          </span>
        </div>
      </div>
    </div>
  );
}
