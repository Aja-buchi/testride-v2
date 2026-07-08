import Link from 'next/link';
import Image from 'next/image';

export default function HereToSupport() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Here to support you</h2>
            <p className="text-gray-600 text-xl leading-relaxed mb-8">
              TestRide connects learner drivers with qualified drivers and insured cars for stress-free test days.
            </p>
            <Link href="/book-a-driver" className="btn-outline">
              Book now
            </Link>
          </div>

          {/* Right: image + testimonial */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80"
                alt="A car with L-plates on a UK street"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Testimonial card */}
            <div className="absolute bottom-6 left-4 right-4 bg-white rounded-xl shadow-lg p-5">
              <p className="font-semibold text-gray-800 text-lg">
                <span className="text-2xl text-gray-400 leading-none mr-1">"</span>
                Made my test day so easy!
              </p>
              <p className="text-gray-500 text-sm mt-1">Emma R</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
