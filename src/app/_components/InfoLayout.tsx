"use client";
import React from 'react'
import Link from 'next/link'
import { ChevronLeft, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

type InfoLayoutProps = {
    title: string;
    description: string;
    children: React.ReactNode;
}

export default function InfoLayout({ title, description, children }: InfoLayoutProps) {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Zap className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold tracking-tighter">FlowAgent</span>
                    </Link>
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <ChevronLeft className="w-4 h-4" /> Back to Home
                        </Button>
                    </Link>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="mb-12 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                        {title}
                    </h1>
                    <p className="text-xl text-muted-foreground font-medium">
                        {description}
                    </p>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                    {children}
                </div>
            </main>

            <footer className="py-12 border-t border-border mt-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">
                        &copy; 2026 FlowAgent Orchestration Platform. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}
