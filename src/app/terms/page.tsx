import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and conditions for using DwellMerge rental listing platform',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">DwellMerge</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Terms and Conditions</CardTitle>
            <p className="text-muted-foreground">Last updated: January 1, 2024</p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using DwellMerge (&quot;the Platform&quot;), you accept and agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. User Responsibilities</h2>
              <div className="space-y-3">
                <p><strong>Financial Safety:</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Users must <strong>NEVER</strong> send payments before physically visiting the property</li>
                  <li>Users must verify the identity of the landlord or caretaker before any financial transaction</li>
                  <li>Users are responsible for conducting their own due diligence</li>
                </ul>
                
                <p><strong>Account Usage:</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Users must provide accurate and truthful information</li>
                  <li>Users are responsible for maintaining the confidentiality of their account</li>
                  <li>Users must not create multiple accounts or impersonate others</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Platform Liability Disclaimer</h2>
              <p>DwellMerge bears <strong>NO LIABILITY</strong> for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Scams</strong> - Users are responsible for verifying all information independently</li>
                <li><strong>Financial loss</strong> - Any monetary transactions are at the user&apos;s own risk</li>
                <li><strong>False listings</strong> - While we strive to maintain quality, we cannot guarantee accuracy of all listings</li>
                <li><strong>Property conditions</strong> - Users must inspect properties personally before making decisions</li>
                <li><strong>Disputes between users</strong> - DwellMerge is not party to agreements between landlords and tenants</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Platform Rights and Enforcement</h2>
              <p>DwellMerge reserves the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Ban users</strong> who violate terms of service or engage in fraudulent activity</li>
                <li><strong>Label landlords as scammers</strong> based on verified reports and evidence</li>
                <li><strong>Delete accounts or listings</strong> that violate our policies</li>
                <li><strong>Suspend or terminate services</strong> at any time without prior notice</li>
                <li><strong>Modify these terms</strong> with appropriate notice to users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Content and Listing Policies</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All property listings must be accurate and truthful</li>
                <li>Users must not post fraudulent or misleading information</li>
                <li>Inappropriate content will be removed without notice</li>
                <li>Users retain ownership of content they upload but grant DwellMerge usage rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Legal Compliance and Immunity</h2>
              <p>
                DwellMerge operates under global content immunity laws, including but not limited to Section 230 of the 
                Communications Decency Act in the United States. The platform serves as an intermediary and is not responsible 
                for user-generated content or third-party actions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. No Warranties</h2>
              <p>
                DwellMerge provides the platform &quot;AS IS&quot; without any warranties, expressed or implied. We do not warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The service will meet your specific requirements</li>
                <li>The service will be uninterrupted, timely, secure, or error-free</li>
                <li>The information obtained through the service will be accurate or reliable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. User Indemnification</h2>
              <p>
                Users agree to indemnify and hold harmless DwellMerge, its officers, directors, employees, and agents from and against 
                any and all claims, damages, obligations, losses, liabilities, costs, and expenses arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your use of the platform</li>
                <li>Your violation of these terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Any transactions or agreements made through the platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Dispute Resolution</h2>
              <p>
                Any disputes arising from the use of DwellMerge will be handled under the laws of Kenya. Users agree to attempt 
                to resolve disputes through negotiation before pursuing legal action.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Privacy and Data Protection</h2>
              <p>
                User privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
              <p>
                DwellMerge reserves the right to modify these terms at any time. Users will be notified of significant changes, 
                and continued use of the platform constitutes acceptance of modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us through our support channels.
              </p>
            </section>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Important Reminder</h3>
              <p className="text-yellow-700">
                By using DwellMerge, you acknowledge that you understand and accept all risks associated with online property searching. 
                Always verify information independently and never send money without physically inspecting the property and 
                confirming the identity of the person you&apos;re dealing with.
              </p>
            </div>

            <div className="text-center pt-8">
              <p className="text-sm text-muted-foreground">
                Use of DwellMerge constitutes legal agreement with these terms.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
