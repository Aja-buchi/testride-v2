import type { Metadata } from 'next';
import Link from 'next/link';
import site from '@/lib/site';

export const metadata: Metadata = {
  title: 'Booking Received – TestRide',
  description: 'Your booking request has been received. Complete your payment to confirm your test-day driver.',
};

const STRIPE_PAYMENT_LINK = process.env.NEXT_PUBLIC_STRIPE_BOOK_LINK ?? '#';

export default function ThankYouBookPage() {
  return (
    <div className="pt-20 min-h-screen bg-[#e0f2fe] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-10 text-center">
        {/* Success icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">Request Received!</h1>
        <p className="text-gray-600 mb-2 leading-relaxed">
          Thank you for submitting your booking request. Our team will review your details and confirm
          a verified driver near your test centre within <strong>24 hours</strong>.
        </p>
        <p className="text-gray-600 mb-8 leading-relaxed">
          To secure your booking, please complete payment using the button below. You will receive a
          confirmation email once payment is processed.
        </p>

        {/* Stripe Pay Now */}
        <a
          href={STRIPE_PAYMENT_LINK}
          className="btn-green text-lg px-10 py-4 w-full block mb-4"
          target={STRIPE_PAYMENT_LINK === '#' ? undefined : '_blank'}
          rel="noopener noreferrer"
        >
          Pay Now
        </a>

        <p className="text-gray-400 text-xs mb-6">
          Secure payment powered by Stripe. You will not be charged until a driver is confirmed.
        </p>

        <div className="border-t border-gray-100 pt-6">
          <p className="text-gray-500 text-sm mb-4">Questions? Contact us:</p>
          <a href={`mailto:${site.email}`} className="text-blue-600 hover:underline text-sm">
            {site.email}
          </a>
          <p className="text-gray-500 text-sm mt-1">{site.phone}</p>
        </div>

        <Link href="/" className="inline-block mt-6 text-blue-600 text-sm hover:underline">
          ← Back to homepage
        </Link>
      </div>
    </div>
  );
}
