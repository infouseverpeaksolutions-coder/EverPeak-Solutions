import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import FloatingWhatsApp from '../components/common/FloatingWhatsApp';
import EnquiryModal from '../components/enquiry/EnquiryModal';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-brand-black text-brand-offwhite">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <EnquiryModal />
    </div>
  );
};

export default MainLayout;
