import Link from 'next/link';
import Image from 'next/image';

const learnerSteps = [
  {
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80',
    alt: 'Person filling in a form',
    title: 'Submit your test details',
    body: 'Tell us your test date, time, and centre — takes under 2 minutes',
  },
  {
    img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80',
    alt: 'Two people shaking hands',
    title: 'Get Matched',
    body: 'We find a verified accompanying driver near your DVSA test centre.',
  },
  {
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    alt: 'L-plate sign',
    title: 'Arrive test-ready',
    body: 'Your driver meets you and provides test-day support throughout.',
  },
];

const driverSteps = [
  {
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
    alt: 'Person signing a document',
    title: 'Apply and verify documents',
    body: 'Submit your licence and insurance details for a quick verification check.',
  },
  {
    img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&q=80',
    alt: 'Calendar',
    title: 'Set your availability',
    body: 'Tell us which dates and test centres you can cover.',
  },
  {
    img: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80',
    alt: 'Person holding money',
    title: 'Earn from bookings',
    body: 'Get matched with learners and earn from test-day support work.',
  },
];

function StepCard({
  img, alt, title, body,
}: { img: string; alt: string; title: string; body: string }) {
  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={img} alt={alt} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="p-5">
        <h4 className="font-bold text-gray-900 text-lg mb-2">{title}</h4>
        <p className="text-gray-600 text-base leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#e0f2fe]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-3">
          <h2 className="text-5xl font-bold text-gray-900">How It Works</h2>
        </div>
        <p className="text-center text-gray-600 text-xl mb-16">
          Simple steps to get you test-ready with a qualified driver and car.
        </p>

        {/* For Learners */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-blue-700 mb-10">For Learners</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learnerSteps.map((s) => (
              <StepCard key={s.title} {...s} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/book-a-driver" className="btn-primary">
              Book a Driver
            </Link>
          </div>
        </div>

        {/* For Drivers */}
        <div>
          <h3 className="text-3xl font-bold text-blue-700 mb-10">For Drivers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {driverSteps.map((s) => (
              <StepCard key={s.title} {...s} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/become-a-driver" className="btn-primary">
              Become a Driver
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
