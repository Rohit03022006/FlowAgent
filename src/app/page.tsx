"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Bot, Cpu, Layers, Sparkles, Zap, Layout, MousePointer2, Settings2, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useAnimate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function StatItem({ val, suffix, label, delay }: { val: number, suffix: string, label: string, delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const duration = 2000

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const easeOutQuad = 1 - (1 - progress) * (1 - progress)
        const currentCount = easeOutQuad * val

        setCount(currentCount)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(val)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [isInView, val])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="text-center md:text-left space-y-2 group"
    >
      <div className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter flex items-baseline justify-center md:justify-start gap-1">
        <span>{Number.isInteger(val) ? Math.floor(count) : count.toFixed(2)}</span>
        <span className="text-primary text-2xl md:text-3xl">{suffix}</span>
      </div>
      <div className="text-muted-foreground font-bold uppercase tracking-[0.2em] text-[10px] group-hover:text-primary transition-colors duration-300">
        {label}
      </div>
    </motion.div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans overflow-x-hidden">
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
            <Badge variant="secondary" className="px-4 py-1.5 rounded-full border-primary/20 bg-primary/10 text-primary text-xs font-bold mb-8 hover:bg-primary/20 transition-colors">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              THE FUTURE OF AGENTIC WORKFLOWS
            </Badge>

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

            <div className="relative max-w-5xl mx-auto rounded-3xl border border-border p-2 bg-card/5 backdrop-blur-sm shadow-2xl">
              <AspectRatio ratio={16 / 9} className="relative rounded-2xl overflow-hidden border border-border shadow-inner bg-card">
                <Image
                  src="/ai_agent_hero.png"
                  alt="FlowAgent Dashboard"
                  fill
                  className="object-cover opacity-80"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
              </AspectRatio>
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
                <Card key={i} className="group overflow-hidden bg-card/40 hover:bg-card/60 transition-all hover:border-primary/50 border-border relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-colors" />
                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500 border border-primary/10">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed font-medium text-base">
                      {feature.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-card/20 border-y border-border/40 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

          {/* Dotted Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-[0.15] [background-image:radial-gradient(#64748b_1.5px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Three Steps to Production</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">Go from an idea to a fully functioning AI agent in minutes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {[
                {
                  step: "01",
                  icon: MousePointer2,
                  title: "Design Your Flow",
                  desc: "Drag and drop logic nodes, LLM blocks, and tool connectors to define how your agent thinks and acts."
                },
                {
                  step: "02",
                  icon: Settings2,
                  title: "Configure Tools",
                  desc: "Grant your agent capabilities by connecting APIs, databases, or custom scripts with enterprise-grade security."
                },
                {
                  step: "03",
                  icon: Rocket,
                  title: "Deploy & Scale",
                  desc: "One-click deployment to our edge-optimized infrastructure with built-in monitoring and automatic scaling."
                }
              ].map((item, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 rounded-[2rem] bg-background border border-border shadow-xl flex items-center justify-center group-hover:border-primary/50 transition-all duration-500 group-hover:shadow-primary/5">
                      <item.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <Badge className="absolute -top-2 -right-2 h-8 min-w-8 rounded-full border-2 border-background font-black text-xs p-0 flex items-center justify-center shadow-lg">
                      {item.step}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground tracking-tight">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium px-4">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Stats / Social Proof */}
        <section className="py-24 relative overflow-hidden">
          <Separator className="absolute top-0 left-0 w-full bg-border/40" />

          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
              {[
                { val: 5, suffix: "M+", label: "Tasks automated", delay: 0 },
                { val: 15, suffix: "K+", label: "Agents deployed", delay: 0.1 },
                { val: 99.99, suffix: "%", label: "System uptime", delay: 0.2 },
                { val: 2, suffix: "ms", label: "Latency targeted", delay: 0.3 }
              ].map((stat, i) => (
                <StatItem key={i} {...stat} />
              ))}
            </div>
          </div>

          <Separator className="absolute bottom-0 left-0 w-full bg-border/40" />
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
