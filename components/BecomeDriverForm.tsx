'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import site from '@/lib/site';

const CITIES = ['Birmingham', 'Manchester', 'London', 'Other'];
const AVAILABILITY_OPTIONS = ['Weekdays', 'Weekends', 'Evenings', 'Short notice bookings', 'Flexible'];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  postcode: string;
  licenceDuration: string;
  vehicleAccess: string;
  vehicleMakeModel: string;
  learnerInsurance: string;
  availability: string[];
  preferredCentres: string;
  previousExperience: string;
  motivation: string;
  consent: boolean;
}

const initial: FormData = {
  fullName: '', email: '', phone: '', city: '', postcode: '',
  licenceDuration: '', vehicleAccess: '', vehicleMakeModel: '',
  learnerInsurance: '', availability: [], preferredCentres: '',
  previousExperience: '', motivation: '', consent: false,
};

export default function BecomeDriverForm({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const set = (field: keyof FormData, value: string | boolean | string[]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleAvailability = (opt: string) => {
    set(
      'availability',
      form.availability.includes(opt)
        ? form.availability.filter((a) => a !== opt)
        : [...form.availability, opt],
    );
  };

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.city) e.city = 'City is required';
    if (!form.postcode.trim()) e.postcode = 'Postcode is required';
    if (!form.licenceDuration) e.licenceDuration = 'Please select licence duration';
    if (!form.vehicleAccess) e.vehicleAccess = 'Please select an option';
    if (!form.vehicleMakeModel.trim()) e.vehicleMakeModel = 'Vehicle make and model is required';
    if (!form.learnerInsurance) e.learnerInsurance = 'Please select an option';
    if (form.availability.length === 0) e.availability = 'Select at least one availability option';
    if (!form.previousExperience) e.previousExperience = 'Please select an option';
    if (!form.motivation.trim()) e.motivation = 'Please share your motivation';
    if (!form.consent) e.consent = 'You must confirm this to proceed';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus('loading');
    try {
      const res = await fetch('/api/become-driver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/thank-you/driver');
      }
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

      {/* City + Postcode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">City / Area *</label>
          <select className="form-input" value={form.city} onChange={(e) => set('city', e.target.value)}>
            <option value="">Select a city</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.city && <p className="form-error">{errors.city}</p>}
        </div>
        <div>
          <label className="form-label">Postcode *</label>
          <input className="form-input" type="text" value={form.postcode}
            onChange={(e) => set('postcode', e.target.value)} placeholder="e.g. B1 1AA" />
          {errors.postcode && <p className="form-error">{errors.postcode}</p>}
        </div>
      </div>

      {/* Licence Duration */}
      <div>
        <label className="form-label">How long have you held a full driving licence? *</label>
        <div className="space-y-2 mt-1">
          {['3–5 years', '5–10 years', '10+ years'].map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="licenceDuration" value={opt} checked={form.licenceDuration === opt}
                onChange={() => set('licenceDuration', opt)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
        {errors.licenceDuration && <p className="form-error">{errors.licenceDuration}</p>}
      </div>

      {/* Vehicle Access */}
      <div>
        <label className="form-label">Do you have access to a vehicle? *</label>
        <div className="space-y-2 mt-1">
          {['Yes', 'No'].map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="vehicleAccess" value={opt} checked={form.vehicleAccess === opt}
                onChange={() => set('vehicleAccess', opt)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
        {errors.vehicleAccess && <p className="form-error">{errors.vehicleAccess}</p>}
      </div>

      {/* Vehicle Make & Model */}
      <div>
        <label className="form-label">Vehicle Make & Model *</label>
        <input className="form-input" type="text" value={form.vehicleMakeModel}
          onChange={(e) => set('vehicleMakeModel', e.target.value)} placeholder="e.g. Toyota Yaris" />
        {errors.vehicleMakeModel && <p className="form-error">{errors.vehicleMakeModel}</p>}
      </div>

      {/* Learner Insurance */}
      <div>
        <label className="form-label">Do you have, or are you willing to obtain, learner driver insurance? *</label>
        <div className="space-y-2 mt-1">
          {['Yes', 'No', 'Not sure'].map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="learnerInsurance" value={opt} checked={form.learnerInsurance === opt}
                onChange={() => set('learnerInsurance', opt)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
        {errors.learnerInsurance && <p className="form-error">{errors.learnerInsurance}</p>}
      </div>

      {/* Availability */}
      <div>
        <label className="form-label">Availability * (select all that apply)</label>
        <div className="space-y-2 mt-1">
          {AVAILABILITY_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.availability.includes(opt)}
                onChange={() => toggleAvailability(opt)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
        {errors.availability && <p className="form-error">{errors.availability}</p>}
      </div>

      {/* Preferred Test Centres */}
      <div>
        <label className="form-label">Preferred Test Centres (optional)</label>
        <input className="form-input" type="text" value={form.preferredCentres}
          onChange={(e) => set('preferredCentres', e.target.value)}
          placeholder="e.g. Birmingham Kingstanding, Manchester Didsbury" />
      </div>

      {/* Previous Experience */}
      <div>
        <label className="form-label">Do you have previous experience accompanying learner drivers? *</label>
        <div className="space-y-2 mt-1">
          {['Yes', 'No'].map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="previousExperience" value={opt} checked={form.previousExperience === opt}
                onChange={() => set('previousExperience', opt)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
        {errors.previousExperience && <p className="form-error">{errors.previousExperience}</p>}
      </div>

      {/* Motivation */}
      <div>
        <label className="form-label">Why are you interested in joining TestRide? *</label>
        <textarea className="form-input" rows={4} value={form.motivation}
          onChange={(e) => set('motivation', e.target.value)}
          placeholder="Tell us a bit about yourself and why you'd like to support learner drivers…" />
        {errors.motivation && <p className="form-error">{errors.motivation}</p>}
      </div>

      {/* Consent */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700 text-sm">
            I confirm that the information provided is accurate to the best of my knowledge. I understand
            that submitting this form does not guarantee acceptance into the TestRide driver network. *
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
        {status === 'loading' ? 'Submitting…' : 'Submit Application'}
      </button>
    </form>
  );
}
