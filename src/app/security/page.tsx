import InfoLayout from '../_components/InfoLayout'
import { ShieldCheck, Lock, EyeOff, Globe } from 'lucide-react'

export default function SecurityPage() {
    return (
        <InfoLayout
            title="Security Overview"
            description="Our commitment to keeping your agents and data secure."
        >
            <div className="space-y-12 text-slate-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        {
                            icon: ShieldCheck,
                            title: "Encryption",
                            desc: "All data transmitted to and from FlowAgent is encrypted using industry-standard TLS 1.3."
                        },
                        {
                            icon: Lock,
                            title: "Access Control",
                            desc: "We use Clerk for enterprise-grade authentication and identity management."
                        },
                        {
                            icon: EyeOff,
                            title: "Data Privacy",
                            desc: "Your agent configurations and API keys are stored with strict access controls and zero-knowledge principles where possible."
                        },
                        {
                            icon: Globe,
                            title: "Infrastructure",
                            desc: "Powered by Convex and Vercel, our infrastructure is built on multiple layers of cloud security."
                        }
                    ].map((item, i) => (
                        <div key={i} className="p-6 bg-slate-900/50 rounded-2xl border border-white/5 space-y-4">
                            <div className="w-10 h-10 rounded-lg bg-black/10 flex items-center justify-center text-blue-500">
                                <item.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-black">{item.title}</h3>
                            <p className="text-sm leading-relaxed text-black">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <section className="p-8 bg-black/5 border border-gray-500/10 rounded-3xl">
                    <h2 className="text-2xl font-bold text-black mb-4">Responsible Disclosure</h2>
                    <p className="text-primary">If you discover a security vulnerability, we'd love to hear from you. Please contact our security team at <span className="text-blue-400 font-bold underline">security@flowagent.ai</span>. We aim to respond to all reports within 24 hours.</p>
                </section>
            </div>
        </InfoLayout>
    )
}
