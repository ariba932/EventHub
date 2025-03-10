import React from "react";
import Header from "@/components/marketing/Header";
import Hero from "@/components/marketing/Hero";
import Features from "@/components/marketing/Features";
import Testimonials from "@/components/marketing/Testimonials";
import Pricing from "@/components/marketing/Pricing";
import FAQ from "@/components/marketing/FAQ";
import Footer from "@/components/marketing/Footer";

const LandingPage = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero onSecondaryAction={scrollToFeatures} />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
