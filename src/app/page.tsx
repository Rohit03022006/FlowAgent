"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Bot, Cpu, Layers, Sparkles, Zap, Layout } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tighter">FlowAgent</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
            </div>

            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Sign In</Button>
              </SignInButton>
              <Link href="/dashboard">
                <Button className="rounded-xl font-bold">Get Started</Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground mr-4 font-bold">Dashboard</Button>
              </Link>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8">
              <Sparkles className="w-3 h-3" />
              <span>THE FUTURE OF AGENTIC WORKFLOWS</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground max-w-4xl mx-auto leading-[1.1]">
              Orchestrate AI Agents with <span className="text-primary">Visual Precision</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Design, build, and deploy complex AI agent workflows using our drag-and-drop orchestration engine. Powered by the world's most advanced LLMs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-8 text-lg shadow-xl shadow-primary/20 rounded-2xl group transition-all font-bold">
                  Start Building Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-border hover:bg-accent rounded-2xl font-semibold">
                Watch Demo
              </Button>
            </div>

            {/* Hero Image / Dashboard Preview */}
            <div className="relative max-w-5xl mx-auto rounded-3xl border border-border p-2 bg-card/5 backdrop-blur-sm shadow-2xl">
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-border shadow-inner bg-card flex items-center justify-center">
                <Image
                  src="/ai_agent_hero.png"
                  alt="FlowAgent Dashboard"
                  fill
                  className="object-cover opacity-80"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Engineered for Intelligence</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">Everything you need to build production-ready agentic systems without writing complex boilerplate.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Layers,
                  title: "Visual Orchestration",
                  desc: "Connect LLMs, APIs, and logic nodes in an intuitive drag-and-drop canvas designed for high-velocity development."
                },
                {
                  icon: Cpu,
                  title: "Multi-Model Support",
                  desc: "Seamlessly switch between Gemini 2.0, GPT-4o, and o1 models within a single unified flow."
                },
                {
                  icon: Layout,
                  title: "Autonomous Agents",
                  desc: "Create self-correcting agents that can use tools, handle errors, and execute multi-step business logic."
                }
              ].map((feature, i) => (
                <div key={i} className="group p-8 rounded-3xl border border-border bg-card/40 hover:bg-card/60 transition-all hover:border-primary/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-colors" />
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-primary/10">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Stats / Social Proof */}
        <section className="py-20 bg-primary/5 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between gap-12 text-center md:text-left">
            {[
              { val: "5M+", label: "Tasks automated" },
              { val: "15K+", label: "Agents deployed" },
              { val: "99.99%", label: "System uptime" },
              { val: "2ms", label: "Latency targeted" }
            ].map((stat, i) => (
              <div key={i} className="flex-1 min-w-[200px]">
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tighter">{stat.val}</div>
                <div className="text-muted-foreground font-bold uppercase tracking-[0.2em] text-[10px]">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="p-16 rounded-[48px] bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden shadow-2xl shadow-primary/20 border border-white/5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />

              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-primary-foreground tracking-tight leading-[1.1]">
                Scale your AI <br /> capabilities infinitely.
              </h2>
              <p className="text-primary-foreground/80 mb-10 max-w-lg mx-auto text-lg leading-relaxed font-medium">
                Join the network of modern engineering teams building autonomous agentic systems.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <Link href="/dashboard">
                  <Button size="lg" variant="secondary" className="h-16 px-10 text-xl rounded-2xl font-black transition-all shadow-2xl hover:scale-105 active:scale-95">
                    Build Your Agent
                  </Button>
                </Link>

              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-border text-muted-foreground bg-background/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary fill-primary" />
              <span className="text-foreground text-2xl font-bold tracking-tight">FlowAgent</span>
            </div>

            <div className="flex gap-12 text-sm font-semibold uppercase tracking-widest">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/security" className="hover:text-foreground transition-colors">Security</Link>
              <Link href="/status" className="hover:text-foreground transition-colors">Status</Link>
            </div>
          </div>

          <div className="text-center text-[10px] font-bold uppercase tracking-[0.3em] opacity-90a">
            &copy; 2026 FlowAgent Orchestration Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
