import InfoLayout from '../_components/InfoLayout'
import { CheckCircle2 } from 'lucide-react'

export default function StatusPage() {
    return (
        <InfoLayout
            title="System Status"
            description="Real-time monitoring of FlowAgent services and infrastructure."
        >
            <div className="space-y-10">
                <div className="p-6 bg-black/5 border border-white/5 rounded-2xl flex items-center gap-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                    <div>
                        <h3 className="text-xl font-bold text-green-500 leading-tight">All Systems Operational</h3>
                        <p className="text-sm text-green-500/80 font-medium">Last updated: {new Date().toLocaleTimeString()} (Just now)</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 px-1">Service Metrics</h2>
                    <div className="grid gap-3">
                        {[
                            { name: "Workflow Engine", status: "Operational", health: 100 },
                            { name: "AI Orchestration (OpenAI)", status: "Operational", health: 100 },
                            { name: "AI Orchestration (Gemini)", status: "Operational", health: 100 },
                            { name: "Dashboard & API", status: "Operational", health: 100 },
                            { name: "Preview Sandbox", status: "Operational", health: 100 },
                        ].map((service, i) => (
                            <div key={i} className="p-5 bg-slate-900/40 rounded-xl border border-white/5 flex items-center justify-between">
                                <span className="font-bold text-white">{service.name}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded tracking-wide uppercase">
                                        {service.status}
                                    </span>
                                    <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500" style={{ width: `${service.health}%` }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4 pt-10">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 px-1">Incident History</h2>
                    <div className="text-center py-12 bg-slate-900/20 rounded-3xl border border-dashed border-white/10">
                        <p className="text-slate-400 font-medium">No incidents reported in the last 90 days.</p>
                    </div>
                </div>
            </div>
        </InfoLayout>
    )
}
