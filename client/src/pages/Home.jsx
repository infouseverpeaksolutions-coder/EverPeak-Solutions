import React from 'react';
import { Helmet } from 'react-helmet-async';
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
  return (
    <div className="bg-brand-black min-h-screen">
      <Helmet>
        <title>EverPeak Solutions | IT & Digital Marketing Agency</title>
        <meta
          name="description"
          content="EverPeak Solutions delivers modern full-stack web development, custom software engineering, mobile apps, SEO, and performance marketing to scale ambitious brands."
        />
        <meta property="og:title" content="EverPeak Solutions | IT & Digital Marketing Agency" />
        <meta
          property="og:description"
          content="Elevate your vision into reality. Innovate beyond expectations. Dominate your digital future."
        />
        <meta property="og:url" content="https://everpeaksolutions.in/" />
      </Helmet>
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
