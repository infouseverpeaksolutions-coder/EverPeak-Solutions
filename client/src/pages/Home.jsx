import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import StatsBanner from '../components/home/StatsBanner';
import ServicesOverview from '../components/home/ServicesOverview';
import ITServicesSection from '../components/home/ITServicesSection';
import DigitalMarketingSection from '../components/home/DigitalMarketingSection';
import SelectedWork from '../components/home/SelectedWork';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ProcessSection from '../components/home/ProcessSection';
import CaseStudies from '../components/home/CaseStudies';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'EverPeak Solutions | IT & Digital Marketing Agency';
  }, []);

  return (
    <div className="bg-brand-black min-h-screen">
      <Hero />
      <StatsBanner />
      <ServicesOverview />
      <ITServicesSection />
      <DigitalMarketingSection />
      <SelectedWork />
      <WhyChooseUs />
      <ProcessSection />
      <CaseStudies />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default Home;
