
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import ProductCard from "../grocery/ProductCard";
import FeaturedVendors from "./FeaturedVendors";
import MarketplaceCategories from "./MarketplaceCategories";
import CulturalContentHub from "./CulturalContentHub";
import HeroSearch from "./HeroSearch";
import { Link } from "react-router-dom";

const AfroConnectHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("home");

  // African food products using the uploaded images
  const featuredProducts = [
    {
      id: "spice-mix",
      name: "Premium Spice Mix",
      image: "/lovable-uploads/e2046a7c-4fca-47c8-8ad1-29b94499528b.png",
      price: "$12.99",
      country: "Nigeria",
      isNew: true
    },
    {
      id: "crayfish",
      name: "Dried Crayfish",
      image: "/lovable-uploads/f5843af2-7f2f-4fc0-98dc-7e5d68b4c289.png",
      price: "$8.49",
      country: "Ghana"
    },
    {
      id: "kuli-kuli",
      name: "Kuli-Kuli",
      image: "/lovable-uploads/6317c600-e26d-482d-b363-778bc7cec112.png",
      price: "$15.99",
      country: "Niger"
    },
    {
      id: "shea-butter",
      name: "Tiger Nuts",
      image: "/lovable-uploads/7d207088-29c0-40d0-8e84-b1c2f16806b5.png",
      price: "$21.99",
      country: "Mali",
      isNew: true
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-[#355E3B] text-white shadow-md">
        <div className="container mx-auto px-3 md:px-4 py-2 md:py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/e6dee00a-5d92-435b-a385-666bdf0a083b.png" 
                alt="AfroConnect Logo" 
                className="h-8 md:h-10 w-auto bg-white rounded-md p-1"
              />
              <h1 className="text-xl md:text-2xl font-bold">AfroConnect</h1>
            </div>
            <nav className="hidden md:flex space-x-4">
              <Link to="/buyer-profile" className="px-3 py-2 rounded-full text-sm bg-white/20 hover:bg-white/30 transition-all">
                Sign In
              </Link>
              <Link to="/vendor-profile" className="px-3 py-2 rounded-full text-sm bg-white hover:bg-opacity-90 text-[#355E3B] transition-all">
                Become a Vendor
              </Link>
            </nav>
            <button className="md:hidden text-xl">
              <i className="ti ti-menu-2" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

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

        <section className="mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Featured Products</h2>
            <Link to="/search" className="text-[#355E3B] text-xs md:text-sm font-medium flex items-center">
              View All
              <i className="ti ti-chevron-right ml-1" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            {featuredProducts.map(product => (
              <Link to="/vendor-profile" key={product.id}>
                <ProductCard 
                  image={product.image}
                  price={product.price}
                  altText={product.name}
                  name={product.name}
                  country={product.country}
                  isNew={product.isNew}
                  onPress={() => {}}
                />
              </Link>
            ))}
          </div>
        </section>

        <FeaturedVendors />

        <CulturalContentHub />
      </main>

      <footer className="bg-[#355E3B] text-white py-4 md:py-6">
        <div className="container mx-auto px-3 md:px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-3 md:mb-4">
                <img 
                  src="/lovable-uploads/e6dee00a-5d92-435b-a385-666bdf0a083b.png" 
                  alt="AfroConnect Logo" 
                  className="h-8 md:h-10 w-auto bg-white rounded-md p-1"
                />
                <h3 className="text-base md:text-lg font-semibold">AfroConnect</h3>
              </div>
              <p className="text-white/80 mb-3 md:mb-4 text-sm md:text-base">Connecting African food vendors with diaspora customers worldwide.</p>
              <div className="flex gap-4">
                <a href="#" className="text-white hover:text-white/80" aria-label="Facebook">
                  <i className="ti ti-brand-facebook" aria-hidden="true" />
                </a>
                <a href="#" className="text-white hover:text-white/80" aria-label="Twitter">
                  <i className="ti ti-brand-twitter" aria-hidden="true" />
                </a>
                <a href="#" className="text-white hover:text-white/80" aria-label="Instagram">
                  <i className="ti ti-brand-instagram" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Quick Links</h3>
              <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
                <li>
                  <a href="#" className="text-white/80 hover:text-white">Home</a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white">Marketplace</a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white">Vendors</a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white">Cultural Hub</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Contact Us</h3>
              <address className="not-italic text-white/80 text-sm md:text-base">
                <p className="mb-2">Email: info@afroconnect.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>

          <div className="border-t border-white/20 mt-6 md:mt-8 pt-4 md:pt-6 text-center text-white/80 text-xs md:text-sm">
            <p>
              &copy; {new Date().getFullYear()} AfroConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 flex justify-around py-2 md:hidden z-10">
        <button 
          className={`p-1.5 rounded-full flex flex-col items-center ${activeTab === 'home' ? 'text-[#355E3B]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('home')}
        >
          <i className="ti ti-home text-lg" aria-hidden="true" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>
        <button 
          className={`p-1.5 rounded-full flex flex-col items-center ${activeTab === 'marketplace' ? 'text-[#355E3B]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('marketplace')}
        >
          <i className="ti ti-shopping-cart text-lg" aria-hidden="true" />
          <span className="text-[10px] mt-0.5">Market</span>
        </button>
        <button 
          className={`p-1.5 rounded-full flex flex-col items-center ${activeTab === 'vendors' ? 'text-[#355E3B]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('vendors')}
        >
          <i className="ti ti-building-store text-lg" aria-hidden="true" />
          <span className="text-[10px] mt-0.5">Vendors</span>
        </button>
        <button 
          className={`p-1.5 rounded-full flex flex-col items-center ${activeTab === 'culture' ? 'text-[#355E3B]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('culture')}
        >
          <i className="ti ti-article text-lg" aria-hidden="true" />
          <span className="text-[10px] mt-0.5">Culture</span>
        </button>
        <Link to="/buyer-profile" 
          className={`p-1.5 rounded-full flex flex-col items-center ${activeTab === 'profile' ? 'text-[#355E3B]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('profile')}
        >
          <i className="ti ti-user text-lg" aria-hidden="true" />
          <span className="text-[10px] mt-0.5">Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default AfroConnectHome;
