'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label="TestRide home">
      <Image
        src="/testRide%20logo.png"
        alt="TestRide logo"
        width={220}
        height={66}
        className="h-16 w-auto object-contain"
        priority
      />
    </Link>
  );
}
