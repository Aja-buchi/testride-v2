import Image from 'next/image';

const columns = [
  {
    label: 'Our Story',
    img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
    alt: 'Car driving on a UK road',
    heading: 'Our Story',
    body: (
      <>
        <p className="text-gray-600 text-base leading-relaxed mb-4 text-justify">
          TestRide was created to solve a common challenge faced by learner drivers across the UK:{' '}
          <span className="text-green-700 italic font-semibold">
            finding a qualified accompanying driver and suitable vehicle for practical driving tests.
          </span>
        </p>
        <p className="text-gray-600 text-base leading-relaxed text-justify">
          Many learners experience unnecessary stress when instructors become unavailable or when
          family and friends are unable to help on test day. TestRide was built to bridge that gap
          with a simpler and more reliable support system.
        </p>
      </>
    ),
  },
  {
    label: 'Our Vision',
    img: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80',
    alt: 'Light bulb representing vision and innovation',
    heading: 'Our Vision',
    body: (
      <>
        <p className="text-gray-600 text-base leading-relaxed mb-4 text-justify">
          Our vision is to become the UK&apos;s trusted platform for driving test-day support,
          helping learner drivers access dependable accompaniment services quickly and conveniently.
        </p>
        <p className="text-gray-600 text-base leading-relaxed text-justify">
          We aim to build a scalable support network that improves accessibility, reduces last-minute
          cancellations, and gives learners greater confidence heading into their practical driving tests.
        </p>
      </>
    ),
  },
  {
    label: 'Technology',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    alt: 'Person using digital booking technology on a tablet',
    heading: 'Technology',
    body: (
      <>
        <p className="text-gray-600 text-base leading-relaxed mb-4 text-justify">
          TestRide combines digital booking tools, driver verification processes, and location-based
          matching to simplify test-day logistics for learner drivers.
        </p>
        <p className="text-gray-600 text-base leading-relaxed text-justify">
          Our platform is designed to make requesting support straightforward while creating a
          flexible opportunity for qualified drivers to connect with learners in their area.
        </p>
      </>
    ),
  },
];

export default function AboutUs() {
  return (
    <section id="about-us" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="mb-10">
          <h2 className="text-5xl font-bold text-gray-900 mb-2">About Us</h2>
          <div className="w-16 h-1 bg-teal-500 rounded-full" />
        </div>

        {/* Intro block — left-aligned, justified */}
        <div className="max-w-4xl mb-16">
          <p className="text-gray-700 text-lg leading-relaxed mb-5 text-justify">
            TestRide is a UK-based platform designed to help learner drivers access reliable test-day
            support when they need it most. We connect learners with qualified accompanying drivers and
            suitable vehicles for practical driving tests, making the process simpler, more flexible,
            and less stressful.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-5 text-justify">
            Whether a driving instructor becomes unavailable, a learner lacks access to a suitable
            vehicle, or last-minute support is needed before a test, TestRide aims to provide a
            practical and dependable solution.
          </p>
          <p className="font-semibold italic text-gray-800 text-lg leading-relaxed mb-5 text-justify">
            We are building a modern support platform focused on convenience, trust, and accessibility
            for learner drivers across the UK. By combining simple online booking with a growing network
            of verified drivers, TestRide is working to improve how learners prepare for one of the most
            important milestones in their driving journey.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            Let the experience speak for itself. Our mission is to make test-day preparation feel more
            organised, accessible, and confidence-driven for every learner driver we support.
          </p>
        </div>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {columns.map((col) => (
            <div key={col.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={col.img}
                  alt={col.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-2">{col.label}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{col.heading}</h3>
                {col.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
