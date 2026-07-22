'use client';

import { useState, useRef } from 'react';
import EligibilityCheck from '@/components/EligibilityCheck';
import BecomeDriverForm from '@/components/BecomeDriverForm';
import VerificationForm from '@/components/VerificationForm';

type Stage = 1 | 2 | 3;

const STEPS = [
  { n: 1 as Stage, label: 'Eligibility' },
  { n: 2 as Stage, label: 'Application' },
  { n: 3 as Stage, label: 'Verification' },
];

export default function BecomeADriverClient() {
  const [stage, setStage] = useState<Stage>(1);
  const cardRef = useRef<HTMLDivElement>(null);

  const advance = (next: Stage) => {
    setStage(next);
    setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

      {/* Progress stepper */}
      <div className="flex items-center justify-center mb-10">
        {STEPS.map((step, i) => (
          <div key={step.n} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
                  ${stage > step.n
                    ? 'bg-teal-500 text-white'
                    : stage === step.n
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                    : 'bg-gray-200 text-gray-500'
                  }`}
              >
                {stage > step.n ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : step.n}
              </div>
              <span
                className={`mt-2 text-xs font-semibold transition-colors ${
                  stage === step.n ? 'text-blue-600' : stage > step.n ? 'text-teal-600' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-0.5 w-16 sm:w-24 mx-2 mb-5 transition-colors duration-300 ${
                  stage > step.n ? 'bg-teal-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Stage card */}
      <div ref={cardRef} className="bg-white rounded-3xl shadow-xl overflow-hidden scroll-mt-32">
        <div
          className={`h-2 transition-colors duration-300 ${
            stage === 3 ? 'bg-teal-500' : 'bg-blue-600'
          }`}
        />
        <div className="p-8 sm:p-12">
          {stage === 1 && <EligibilityCheck onNext={() => advance(2)} />}
          {stage === 2 && <BecomeDriverForm onSuccess={() => advance(3)} />}
          {stage === 3 && <VerificationForm />}
        </div>
      </div>
    </div>
  );
}
