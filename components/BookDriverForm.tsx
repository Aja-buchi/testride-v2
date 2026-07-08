'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import site from '@/lib/site';

const CITIES = ['Birmingham', 'Manchester', 'London', 'Other'];
const URGENCY_OPTIONS = ['Within 48 hours', 'Within 1 week', 'Within 2 weeks', 'More than 2 weeks away'];
const SUPPORT_REASONS = [
  'Instructor unavailable',
  'No access to suitable car',
  'No qualified driver',
  'Last-minute booking',
  'Need backup support',
  'Other',
];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  testBooked: string;
  testDate: string;
  testTime: string;
  testCentre: string;
  city: string;
  needCar: string;
  supportReasons: string[];
  urgency: string;
  notes: string;
  consent: boolean;
}

const initial: FormData = {
  fullName: '', email: '', phone: '', testBooked: '', testDate: '', testTime: '',
  testCentre: '', city: '', needCar: '', supportReasons: [], urgency: '', notes: '', consent: false,
};

export default function BookDriverForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const set = (field: keyof FormData, value: string | boolean | string[]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleReason = (reason: string) => {
    set(
      'supportReasons',
      form.supportReasons.includes(reason)
        ? form.supportReasons.filter((r) => r !== reason)
        : [...form.supportReasons, reason],
    );
  };

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.testBooked) e.testBooked = 'Please select an option';
    if (!form.testDate) e.testDate = 'Test date is required';
    if (!form.testTime) e.testTime = 'Test time is required';
    if (!form.testCentre.trim()) e.testCentre = 'Test centre is required';
    if (!form.city) e.city = 'City is required';
    if (!form.needCar) e.needCar = 'Please select an option';
    if (form.supportReasons.length === 0) e.supportReasons = 'Select at least one reason';
    if (!form.urgency) e.urgency = 'Please select urgency';
    if (!form.consent) e.consent = 'You must accept the terms';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus('loading');
    try {
      const res = await fetch('/api/book-driver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      router.push('/thank-you/book');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Full Name */}
      <div>
        <label className="form-label">Full Name *</label>
        <input className="form-input" type="text" value={form.fullName}
          onChange={(e) => set('fullName', e.target.value)} placeholder="Your full name" />
        {errors.fullName && <p className="form-error">{errors.fullName}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="form-label">Email Address *</label>
        <input className="form-input" type="email" value={form.email}
          onChange={(e) => set('email', e.target.value)} placeholder="your@email.com" />
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="form-label">Phone Number *</label>
        <input className="form-input" type="tel" value={form.phone}
          onChange={(e) => set('phone', e.target.value)} placeholder="+44 7700 000000" />
        {errors.phone && <p className="form-error">{errors.phone}</p>}
      </div>

      {/* Test booked? */}
      <div>
        <label className="form-label">Have you already booked your practical driving test? *</label>
        <div className="space-y-2 mt-1">
          {['Yes', 'No, but I plan to soon'].map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="testBooked" value={opt} checked={form.testBooked === opt}
                onChange={() => set('testBooked', opt)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
        {errors.testBooked && <p className="form-error">{errors.testBooked}</p>}
      </div>

      {/* Date + Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Test Date *</label>
          <input className="form-input" type="date" value={form.testDate}
            onChange={(e) => set('testDate', e.target.value)} />
          {errors.testDate && <p className="form-error">{errors.testDate}</p>}
        </div>
        <div>
          <label className="form-label">Test Time *</label>
          <input className="form-input" type="time" value={form.testTime}
            onChange={(e) => set('testTime', e.target.value)} />
          {errors.testTime && <p className="form-error">{errors.testTime}</p>}
        </div>
      </div>

      {/* Test Centre */}
      <div>
        <label className="form-label">Driving Test Centre *</label>
        <input className="form-input" type="text" value={form.testCentre}
          onChange={(e) => set('testCentre', e.target.value)}
          placeholder="e.g. Birmingham Kingstanding Test Centre" />
        {errors.testCentre && <p className="form-error">{errors.testCentre}</p>}
      </div>

      {/* City */}
      <div>
        <label className="form-label">City / Area *</label>
        <select className="form-input" value={form.city} onChange={(e) => set('city', e.target.value)}>
          <option value="">Select a city</option>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.city && <p className="form-error">{errors.city}</p>}
      </div>

      {/* Need car? */}
      <div>
        <label className="form-label">Do you need a suitable car for your driving test? *</label>
        <div className="space-y-2 mt-1">
          {['Yes', 'No', 'Not sure yet'].map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="needCar" value={opt} checked={form.needCar === opt}
                onChange={() => set('needCar', opt)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
        {errors.needCar && <p className="form-error">{errors.needCar}</p>}
      </div>

      {/* Support reasons */}
      <div>
        <label className="form-label">Why are you looking for test-day support? * (select all that apply)</label>
        <div className="space-y-2 mt-1">
          {SUPPORT_REASONS.map((reason) => (
            <label key={reason} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.supportReasons.includes(reason)}
                onChange={() => toggleReason(reason)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
              <span className="text-gray-700">{reason}</span>
            </label>
          ))}
        </div>
        {errors.supportReasons && <p className="form-error">{errors.supportReasons}</p>}
      </div>

      {/* Urgency */}
      <div>
        <label className="form-label">How urgently do you need support? *</label>
        <div className="space-y-2 mt-1">
          {URGENCY_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="urgency" value={opt} checked={form.urgency === opt}
                onChange={() => set('urgency', opt)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
        {errors.urgency && <p className="form-error">{errors.urgency}</p>}
      </div>

      {/* Notes */}
      <div>
        <label className="form-label">Additional Notes</label>
        <textarea className="form-input" rows={4} value={form.notes}
          onChange={(e) => set('notes', e.target.value)}
          placeholder="Any other information you'd like us to know…" />
      </div>

      {/* Consent */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700 text-sm">
            I understand that submitting this form is a request only and does not guarantee booking
            confirmation. TestRide will contact me to confirm availability and next steps. *
          </span>
        </label>
        {errors.consent && <p className="form-error mt-1">{errors.consent}</p>}
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
          Something went wrong. Please try again or contact {site.email}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full text-lg py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Submitting…' : 'Submit Booking Request'}
      </button>
    </form>
  );
}
