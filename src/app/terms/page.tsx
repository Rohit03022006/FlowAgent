import InfoLayout from '../_components/InfoLayout'

export default function TermsPage() {
    return (
        <InfoLayout
            title="Terms of Service"
            description="The rules and guidelines for using the FlowAgent platform."
        >
            <div className="space-y-8 text-slate-300">
                <section>
                    <h2 className="text-2xl font-bold text-primary mb-4 italic">1. Agreement to Terms</h2>
                    <p className="text-primary">By accessing or using FlowAgent, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-primary mb-4 italic">2. User Accounts</h2>
                    <p className="text-primary">You are responsible for maintaining the confidentiality of your account credentials. You must immediately notify us of any unauthorized use of your account.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-primary mb-4 italic">3. Usage Limits</h2>
                    <p className="text-primary">Our platform may impose usage limits based on your plan. This includes limits on the number of agents, node executions, and API calls. Exceeding these limits may result in temporary suspension of services.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-primary mb-4 italic">4. Intellectual Property</h2>
                    <p className="text-primary">You retain ownership of the workflows you create. FlowAgent owns the platform, branding, and underlying technology.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-primary mb-4 italic">5. Prohibited Conduct</h2>
                    <p className="text-primary">You agree not to use FlowAgent for any illegal activities, including but not limited to generating malicious content, spamming, or attempting to bypass security measures.</p>
                </section>
            </div>
        </InfoLayout>
    )
}
