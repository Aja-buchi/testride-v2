'use client';

import { useState } from 'react';
import Link from 'next/link';
import site from '@/lib/site';

export default function Footer() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ fullName: '', email: '', phone: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-[#1e293b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h3 className="text-2xl font-bold mb-3">Contact</h3>
            <p className="text-gray-300 mb-6">Questions? Reach out anytime, we&apos;re here.</p>

            {/* Social icons */}
            <div className="flex items-center gap-5 mb-8">
              <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="hover:text-brand-teal transition-colors">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href={site.socials.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                className="hover:text-brand-teal transition-colors">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.78a4.85 4.85 0 01-1.02-.09z"/>
                </svg>
              </a>
              <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="hover:text-brand-teal transition-colors">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            <div className="space-y-1 text-gray-300">
              <p className="text-xs font-semibold text-white uppercase tracking-wider mb-2">Contact us on:</p>
              <p>{site.phone}</p>
              <a href={`mailto:${site.email}`} className="hover:text-white transition-colors">
                {site.email}
              </a>
              <p>{site.address}</p>
            </div>
          </div>

          {/* Enquiry form */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Send Us An Enquiry:</h4>
            {status === 'success' ? (
              <div className="bg-green-600/20 border border-green-500 rounded-lg p-6 text-green-300">
                Thank you! We&apos;ll be in touch shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Full Name*</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full bg-white text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Email Address*</label>
                  <input
                    type="email"
                    required
                    placeholder="Please enter a valid email address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Phone*</label>
                  <input
                    type="tel"
                    required
                    placeholder="Please enter a valid phone number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-white text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                {status === 'error' && (
                  <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
                >
                  {status === 'loading' ? 'Sending…' : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Scrolling legal notice */}
        <div className="mt-12 overflow-hidden border-t border-b border-gray-700 py-3">
          <div className="flex whitespace-nowrap animate-marquee">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="text-gray-400 text-sm mx-12">
                TestRide is a trading name of Ajonyx Holdings Ltd, registered in England and Wales (Company No. 17421899)
                &nbsp;&nbsp;•&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* Disclaimer + copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-xs text-center max-w-3xl mx-auto leading-relaxed">
            <em>
              Important: We are an independent support platform and are not affiliated with the DVSA. Availability may
              vary by location. All bookings are subject to eligibility and vehicle suitability checks.
            </em>
          </p>
          <p className="text-gray-500 text-sm text-center mt-4">© 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
