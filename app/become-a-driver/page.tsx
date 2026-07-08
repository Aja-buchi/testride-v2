import type { Metadata } from 'next';
import Image from 'next/image';
import BecomeDriverForm from '@/components/BecomeDriverForm';

export const metadata: Metadata = {
  title: 'Become a Driver – TestRide',
  description: 'Join the TestRide driver network. Earn money by supporting learner drivers on their practical driving test day.',
};

export default function BecomeADriverPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#e0f2fe]">

      {/* Page header */}
      <div className="py-14 text-center px-4">
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">Become A Driver</h1>
        <p className="text-gray-600 text-xl">Join our network — earn by supporting learners on test day</p>
      </div>

      {/* Full-width landscape hero image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative w-full aspect-[21/8] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=85"
            alt="Confident driver behind the wheel of a car, ready to support learner drivers"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
          <div className="absolute inset-0 flex items-center px-10 sm:px-16">
            <div className="max-w-lg">
              <p className="text-white text-2xl sm:text-3xl font-bold leading-snug drop-shadow-lg">
                Drive with purpose.<br />Earn from every booking.
              </p>
              <p className="text-gray-200 text-base sm:text-lg mt-3 drop-shadow">
                Join a growing network of verified drivers supporting UK learners.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form card — centred below image */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Teal accent bar */}
          <div className="h-2 bg-teal-500" />
          <div className="p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Become A Driver</h2>
            <p className="text-gray-600 text-base leading-relaxed mb-3">
              TestRide is building a network of reliable drivers who may be able to support learner
              drivers attending practical driving tests across the UK.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-3">
              If you hold a full driving licence and meet the eligibility requirements, complete the
              form below to express interest.
            </p>
            <p className="text-gray-500 text-sm italic mb-3">
              Submitting this form does not guarantee acceptance into the network.
            </p>
            <p className="text-red-500 text-sm mb-8">* Indicates required field</p>
            <BecomeDriverForm />
          </div>
        </div>
      </div>
    </div>
  );
}
