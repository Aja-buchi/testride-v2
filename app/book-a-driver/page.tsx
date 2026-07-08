import type { Metadata } from 'next';
import Image from 'next/image';
import BookDriverForm from '@/components/BookDriverForm';

export const metadata: Metadata = {
  title: 'Book a Driver – TestRide',
  description: "Fill in your test details and we'll match you with a verified accompanying driver and insured car for your UK practical driving test.",
};

export default function BookADriverPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#e0f2fe]">

      {/* Page header */}
      <div className="py-14 text-center px-4">
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">Book your driver now</h1>
        <p className="text-gray-600 text-xl">Fill in your details and we&apos;ll handle the rest</p>
      </div>

      {/* Full-width landscape hero image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative w-full aspect-[21/8] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=85"
            alt="Learner driver sitting in a car with an instructor, preparing for their practical driving test"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center px-10 sm:px-16">
            <div className="max-w-lg">
              <p className="text-white text-2xl sm:text-3xl font-bold leading-snug drop-shadow-lg">
                Your qualified driver.<br />Your test day. Sorted.
              </p>
              <p className="text-gray-200 text-base sm:text-lg mt-3 drop-shadow">
                Connecting UK learners with verified drivers and insured cars.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form card — centred below image */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Book a Driver</h2>
          <p className="text-gray-600 text-base leading-relaxed mb-3">
            Fill in your test details below and we&apos;ll match you with a verified accompanying
            driver and insured car near your test centre. We aim to confirm your booking within
            24 hours.
          </p>
          <p className="text-red-500 text-sm mb-8">* Indicates required field</p>
          <BookDriverForm />
        </div>
      </div>
    </div>
  );
}
