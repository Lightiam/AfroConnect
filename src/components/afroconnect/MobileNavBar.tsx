
import React from "react";
import { Link } from "react-router-dom";

interface MobileNavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({ activeTab, setActiveTab }) => {
  return (
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
  );
};

export default MobileNavBar;
