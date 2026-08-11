import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyDonate } from './components/WhyDonate';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { TrustSection } from './components/TrustSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { RazorpayModal } from './components/RazorpayModal';
import { ScrollSection } from './components/ScrollSection';
import { DarkToLightDivider, LightToDarkDivider } from './components/SectionDividers';
import { DonatePage } from './components/DonatePage';
import { CURRENT_CAMPAIGN, FUTURE_CAMPAIGNS } from './data/campaignData';

export default function App() {
  const [activeCampaignId, setActiveCampaignId] = useState<string>('one-meal-one-smile');
  const [currentPage, setCurrentPage] = useState<'home' | 'donate'>('home');
  const [donateAmount, setDonateAmount] = useState<number>(500);

  const currentCampaign = FUTURE_CAMPAIGNS.find((c) => c.id === activeCampaignId) || CURRENT_CAMPAIGN;

  const handleOpenDonateModal = (amount: number = 500) => {
    setDonateAmount(amount);
    setCurrentPage('donate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = (anchor?: string) => {
    setCurrentPage('home');
    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (currentPage === 'donate') {
    return (
      <DonatePage
        initialAmount={donateAmount}
        onClose={() => handleNavigateHome()}
        onDonateSuccess={() => handleNavigateHome()}
        onNavigateHome={handleNavigateHome}
      />
    );
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-[#0a2240] text-slate-900 font-sans antialiased selection:bg-amber-400 selection:text-slate-950 relative">
      
      {/* Header */}
      <Header
        onOpenDonateModal={handleOpenDonateModal}
      />

      {/* Hero Section (Dark) */}
      <Hero
        campaign={currentCampaign}
        onOpenDonateModal={handleOpenDonateModal}
        onSelectCampaign={setActiveCampaignId}
      />

      {/* Transition: Dark Hero -> Light WhyDonate */}
      <DarkToLightDivider bgFrom="#0a2240" bgTo="#f8fafc" />

      {/* Why Your Donation Matters Section (Light #f8fafc) */}
      <ScrollSection id="why-donate">
        <WhyDonate
          onOpenDonateModal={handleOpenDonateModal}
        />
      </ScrollSection>

      {/* Transition: Light WhyDonate -> Dark AboutSection */}
      <LightToDarkDivider bgFrom="#f8fafc" bgTo="#0a2240" />

      {/* About Truth Foundation (Dark #0a2240) */}
      <ScrollSection id="about">
        <AboutSection />
      </ScrollSection>

      {/* Transition: Dark AboutSection -> Light GallerySection */}
      <DarkToLightDivider bgFrom="#0a2240" bgTo="#ffffff" />

      {/* Field Gallery (Light #ffffff) */}
      <ScrollSection id="gallery">
        <GallerySection onOpenDonateModal={handleOpenDonateModal} />
      </ScrollSection>

      {/* Transition: Light GallerySection -> Dark TrustSection */}
      <LightToDarkDivider bgFrom="#ffffff" bgTo="#0a2240" />

      {/* Trust & Accreditations Section (Dark #0a2240) */}
      <ScrollSection id="trust">
        <TrustSection />
      </ScrollSection>

      {/* Transition: Dark TrustSection -> Light TestimonialsSection */}
      <DarkToLightDivider bgFrom="#0a2240" bgTo="#f8fafc" />

      {/* Testimonials (Light #f8fafc) */}
      <ScrollSection id="testimonials">
        <TestimonialsSection />
      </ScrollSection>

      {/* Transition: Light TestimonialsSection -> Dark FAQSection */}
      <LightToDarkDivider bgFrom="#f8fafc" bgTo="#0a2240" />

      {/* FAQ Section (Dark #0a2240) */}
      <ScrollSection id="faq">
        <FAQSection onOpenDonateModal={handleOpenDonateModal} />
      </ScrollSection>

      {/* Transition: Dark FAQSection -> Light Footer */}
      <DarkToLightDivider bgFrom="#0a2240" bgTo="#f8fafc" />

      {/* Footer (Light #f8fafc) */}
      <Footer onNavigateHome={handleNavigateHome} />

      {/* Floating WhatsApp Widget */}
      <FloatingWhatsApp />

    </div>
  );
}

