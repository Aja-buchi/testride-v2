import Hero from '@/components/Hero';
import HereToSupport from '@/components/HereToSupport';
import WhyLearnersUseUs from '@/components/WhyLearnersUseUs';
import HowItWorks from '@/components/HowItWorks';
import AboutUs from '@/components/AboutUs';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutUs />
      <WhyLearnersUseUs />
      <HowItWorks />
      <HereToSupport />
    </>
  );
}
