const problems = [
  {
    icon: '★',
    title: 'No accompanying driver available',
    body: "Can't find a qualified accompanying driver for your test date? We source a verified one for you.",
  },
  {
    icon: '◆',
    title: 'No suitable vehicle',
    body: 'DVSA requires a roadworthy vehicle. We match you with a compliant, test-ready car.',
  },
  {
    icon: '✿',
    title: 'No family or friend available',
    body: "Can't find someone to accompany you? Our verified drivers provide test-day support.",
  },
];

const badges = [
  'UK Test-Day Support',
  'Insured Vehicles',
  'Verified Drivers',
  'Quick Online Booking',
];

export default function WhyLearnersUseUs() {
  return (
    <section className="py-20 bg-[#6baed6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-5xl font-bold text-gray-900">Why Learners Use Us</h2>
        </div>
        <div className="text-center mb-2">
          <p className="text-2xl font-semibold text-gray-800">Your test day covered</p>
        </div>
        <p className="text-center text-gray-700 text-lg mb-14">
          Common situations that leave learners without test-day support.
        </p>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {problems.map((p) => (
            <div
              key={p.title}
              className="bg-[#8ec5d6]/60 border border-[#7ab5c8] rounded-2xl p-7 backdrop-blur-sm"
            >
              <span className="text-orange-500 text-4xl block mb-4">{p.icon}</span>
              <h3 className="font-bold text-gray-900 text-lg mb-3">{p.title}</h3>
              <p className="text-gray-700 text-base leading-relaxed italic">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {badges.map((badge) => (
            <div key={badge} className="flex items-center gap-2 text-gray-900 font-bold text-base">
              <span className="text-green-700 text-xl">★</span>
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
