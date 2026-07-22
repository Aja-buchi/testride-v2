'use client';

import { useState } from 'react';

const REQUIREMENTS = [
  'You are at least 21 years of age.',
  'You hold a valid, full UK driving licence (not a provisional licence).',
  'You have held your full UK driving licence for a minimum of 3 years.',
  'You have not been subject to a driving disqualification in the last 5 years.',
  'If providing a vehicle, it is roadworthy, has a current MOT certificate, and is properly taxed.',
  'You hold, or are willing to obtain, valid insurance that explicitly covers accompanying a learner driver on a practical test day.',
  'You are not acting as the learner\'s registered Approved Driving Instructor (ADI) or trainee instructor (PDI) for the test being supported.',
  'You consent to a background and identity verification check as part of the TestRide driver onboarding process.',
  'You understand that TestRide is an introductory platform only and does not guarantee acceptance into the driver network or any test outcome for the learner.',
  'You agree to abide by TestRide\'s Code of Conduct, all DVSA requirements, and applicable UK road traffic legislation during every booking.',
];

interface Props {
  onNext: () => void;
}

export default function EligibilityCheck({ onNext }: Props) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Eligibility Requirements</h2>
        <p className="text-gray-600 leading-relaxed">
          To join the TestRide driver network, you must meet <strong>all</strong> of the following
          requirements. Please read each point carefully before proceeding.
        </p>
      </div>

      <ol className="space-y-3">
        {REQUIREMENTS.map((req, i) => (
          <li key={i} className="flex gap-4 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-500 text-white text-sm font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <span className="text-gray-700 leading-relaxed">{req}</span>
          </li>
        ))}
      </ol>

      {/* Declaration */}
      <div className="bg-blue-50 border border-blue-300 rounded-xl p-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="w-5 h-5 mt-0.5 flex-shrink-0 text-teal-600 rounded border-gray-400 focus:ring-teal-500"
          />
          <span className="text-gray-800 font-medium leading-relaxed">
            I confirm that I have read, understood, and meet all of the above eligibility
            requirements. I consent to the verification checks described and agree to
            TestRide&apos;s Terms of Service and Privacy Policy.
          </span>
        </label>
      </div>

      {/* Next button — only visible when checkbox is checked */}
      {confirmed && (
        <button
          onClick={onNext}
          className="btn-primary w-full text-lg py-4"
        >
          Next: Application Form →
        </button>
      )}
    </div>
  );
}
