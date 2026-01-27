import InfoLayout from '../_components/InfoLayout'

export default function PrivacyPage() {
    return (
        <InfoLayout
            title="Privacy Policy"
            description="How we handle your data and protect your privacy at FlowAgent."
        >
            <div className="space-y-8 text-slate-800">
                <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4 italic">1. Introduction</h2>
                    <p>Welcome to FlowAgent. We value your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information when you use our platform.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4 italic">2. Data Collection</h2>
                    <p>We collect information that you provide directly to us, such as when you create an account, build a workflow, or contact support. This includes:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>Account information (Name, Email, Profile Picture) via Clerk.</li>
                        <li>Workflow data (Nodes, Edges, Agent Configurations) stored in Convex.</li>
                        <li>API keys and external service credentials (encrypted).</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4 italic">3. Use of AI Services</h2>
                    <p>FlowAgent interacts with third-party AI providers like OpenAI and Google Gemini. When you run an agent, parts of your workflow configuration and chat inputs may be sent to these providers to generate responses. We do not use your private data to train our own models.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4 italic">4. Security</h2>
                    <p>We implement industry-standard security measures to protect your data. All communication is encrypted via SSL/TLS, and sensitive configuration data is strictly controlled.</p>
                </section>
            </div>
        </InfoLayout>
    )
}
