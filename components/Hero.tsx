'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/backup%20image.jpg"
      >
        <source src="/Leaner%20driver.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24">
        <div className="max-w-2xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Test Day Support
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-10 leading-relaxed">
            Book a qualified driver and car for your UK practical driving test.
          </p>
          <Link href="/book-a-driver" className="btn-primary text-lg px-10 py-4">
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
}
