import type { Metadata } from 'next';
import Link from 'next/link';
import site from '@/lib/site';

export const metadata: Metadata = {
  title: 'Application Received – TestRide',
  description: 'Your driver application has been received. We will be in touch within 48 hours.',
};

export default function ThankYouDriverPage() {
  return (
    <div className="pt-20 min-h-screen bg-[#e0f2fe] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-10 text-center">
        {/* Success icon */}
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">Application Received!</h1>
        <p className="text-gray-600 mb-2 leading-relaxed">
          Thank you for your interest in joining the TestRide driver network. We&apos;ll review your
          application and get back to you within <strong>48 hours</strong>.
        </p>
        <p className="text-gray-600 mb-8 leading-relaxed">
          If you applied via our website, please continue the verification process to complete
          your registration.
        </p>

        <Link
          href="/become-a-driver"
          className="btn-primary text-base px-8 py-3 inline-block mb-6"
        >
          ← Return to Application
        </Link>

        <div className="border-t border-gray-100 pt-6">
          <p className="text-gray-500 text-sm mb-2">Questions? Contact us:</p>
          <a href={`mailto:${site.email}`} className="text-blue-600 hover:underline text-sm">
            {site.email}
          </a>
          <p className="text-gray-500 text-sm mt-1">{site.phone}</p>
        </div>

        <Link href="/" className="inline-block mt-4 text-blue-600 text-sm hover:underline">
          ← Back to homepage
        </Link>
      </div>
    </div>
  );
}
