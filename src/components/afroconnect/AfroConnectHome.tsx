
import React, { useState } from "react";
import Header from "./Header";
import HeroSearch from "./HeroSearch";
import MarketplaceCategories from "./MarketplaceCategories";
import FeaturedProducts from "./FeaturedProducts";
import FeaturedVendors from "./FeaturedVendors";
import CulturalContentHub from "./CulturalContentHub";
import Footer from "./Footer";
import MobileNavBar from "./MobileNavBar";

const AfroConnectHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("home");

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <HeroSearch />

      <main className="container mx-auto px-3 md:px-4 py-4 md:py-6">
        <section className="mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Popular Categories</h2>
            <button className="text-[#355E3B] text-xs md:text-sm font-medium flex items-center">
              View All
              <i className="ti ti-chevron-right ml-1" aria-hidden="true" />
            </button>
          </div>
          <MarketplaceCategories />
        </section>

        <FeaturedProducts />
        <FeaturedVendors />
        <CulturalContentHub />
      </main>

      <Footer />
      <MobileNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default AfroConnectHome;
