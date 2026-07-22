'use client';

import { useState } from 'react';
import site from '@/lib/site';

const STRIPE_PAYMENT_LINK = process.env.NEXT_PUBLIC_STRIPE_DRIVER_LINK ?? '#';

interface UploadField {
  id: string;
  label: string;
  description: string;
  required: boolean;
  multiple?: boolean;
}

const UPLOAD_FIELDS: UploadField[] = [
  {
    id: 'licence_front',
    label: 'Driving Licence – Front',
    description: 'Clear photo or scan of the front of your UK driving licence.',
    required: true,
  },
  {
    id: 'licence_back',
    label: 'Driving Licence – Back',
    description: 'Clear photo or scan of the back of your UK driving licence.',
    required: true,
  },
  {
    id: 'proof_identity',
    label: 'Proof of Identity',
    description: 'Passport, national ID card, or other government-issued photo ID.',
    required: true,
  },
  {
    id: 'proof_address',
    label: 'Proof of Address',
    description: 'Utility bill, bank statement, or council tax letter dated within the last 3 months.',
    required: true,
  },
  {
    id: 'vehicle_insurance',
    label: 'Vehicle Insurance Certificate',
    description: 'Insurance that covers accompanying learner drivers on test day. Required if you are providing your own vehicle.',
    required: true,
  },
  {
    id: 'mot_certificate',
    label: 'MOT Certificate',
    description: 'Current MOT certificate for the vehicle being used (if applicable).',
    required: false,
  },
  {
    id: 'vehicle_photos',
    label: 'Vehicle Photos',
    description: 'Clear exterior photos of the vehicle – front, rear, and both sides. You may upload multiple images.',
    required: true,
    multiple: true,
  },
];

export default function VerificationForm() {
  const [files, setFiles] = useState<Record<string, FileList | null>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (id: string, fileList: FileList | null) => {
    setFiles((prev) => ({ ...prev, [id]: fileList }));
    if (fileList && fileList.length > 0) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    UPLOAD_FIELDS.filter((f) => f.required).forEach((field) => {
      if (!files[field.id] || files[field.id]!.length === 0) {
        e[field.id] = 'This document is required';
      }
    });
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus('loading');

    try {
      const formData = new FormData();
      UPLOAD_FIELDS.forEach((field) => {
        const fileList = files[field.id];
        if (fileList) {
          for (let i = 0; i < fileList.length; i++) {
            formData.append(field.id, fileList[i]);
          }
        }
      });

      const res = await fetch('/api/verification', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center space-y-6">
        {/* Success icon */}
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Documents Submitted!</h2>
          <p className="text-gray-600 leading-relaxed">
            Your documents have been received. Our team will verify your details within{' '}
            <strong>48 hours</strong>.
          </p>
          <p className="text-gray-600 mt-2 leading-relaxed">
            To complete your driver registration and secure your place in the network,
            please pay the one-time registration fee below.
          </p>
        </div>

        {/* Stripe Pay Now */}
        <a
          href={STRIPE_PAYMENT_LINK}
          className="btn-green text-lg px-10 py-4 w-full block"
          target={STRIPE_PAYMENT_LINK === '#' ? undefined : '_blank'}
          rel="noopener noreferrer"
        >
          Pay Now – Complete Registration
        </a>
        <p className="text-gray-400 text-xs">Secure payment powered by Stripe.</p>

        <div className="border-t border-gray-100 pt-4 text-sm text-gray-500">
          <p>
            Questions? Email us at{' '}
            <a href={`mailto:${site.email}`} className="text-blue-600 hover:underline">
              {site.email}
            </a>{' '}
            or call{' '}
            <a href={`tel:${site.phone}`} className="text-blue-600 hover:underline">
              {site.phone}
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Verification</h2>
        <p className="text-gray-600 leading-relaxed">
          Upload clear copies of the required documents below. Accepted formats: JPG, PNG, PDF
          (max 10 MB per file). Required fields are marked with *.
        </p>
      </div>

      {UPLOAD_FIELDS.map((field) => (
        <div key={field.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
          <label className="form-label mb-1">
            {field.label}
            {field.required ? ' *' : ' (if applicable)'}
          </label>
          <p className="text-gray-500 text-sm mb-3">{field.description}</p>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf,.heic,.webp"
            multiple={field.multiple}
            onChange={(e) => handleFileChange(field.id, e.target.files)}
            className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-teal-50 file:text-teal-700
              hover:file:bg-teal-100
              cursor-pointer"
          />
          {files[field.id] && files[field.id]!.length > 0 && (
            <p className="text-teal-600 text-xs mt-2">
              ✓ {files[field.id]!.length} file{files[field.id]!.length > 1 ? 's' : ''} selected
            </p>
          )}
          {errors[field.id] && <p className="form-error mt-1">{errors[field.id]}</p>}
        </div>
      ))}

      {status === 'error' && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
          Something went wrong uploading your documents. Please try again or contact{' '}
          <a href={`mailto:${site.email}`} className="underline">{site.email}</a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full text-lg py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Uploading Documents…' : 'Submit Documents'}
      </button>
    </form>
  );
}
