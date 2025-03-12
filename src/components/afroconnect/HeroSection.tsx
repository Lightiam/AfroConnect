
import React from "react";

interface HeroSectionProps {
  children: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ children }) => {
  return (
    <section className="bg-[#355E3B] py-6 md:py-10 px-3 md:px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-5 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
            Connect with Authentic African Food Products
          </h1>
          <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
            Discover and order genuine African ingredients, spices, and food products from verified vendors worldwide.
          </p>
        </div>
        {children}
      </div>
    </section>
  );
};

export default HeroSection;
