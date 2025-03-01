
import React, { useState } from "react";

const HeroSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality
  };

  return (
    <section className="bg-gradient-to-r from-[#8B4513] to-[#F5DEB3] py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Connect with Authentic African Food Products
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Discover and order genuine African ingredients, spices, and food products from verified vendors worldwide.
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative flex bg-white rounded-full overflow-hidden shadow-lg">
            <div className="flex-grow flex items-center">
              <i className="ti ti-search text-gray-400 ml-4" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search for African food products, spices, ingredients..."
                className="w-full py-3 px-4 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-[#8B4513] text-white px-6 py-3 font-medium hover:bg-[#734013] transition-colors"
            >
              Search
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/30 text-white cursor-pointer hover:bg-white/40 transition-colors">
              <i className="ti ti-flame mr-1" aria-hidden="true" />
              Jollof Rice
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/30 text-white cursor-pointer hover:bg-white/40 transition-colors">
              <i className="ti ti-flame mr-1" aria-hidden="true" />
              Shea Butter
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/30 text-white cursor-pointer hover:bg-white/40 transition-colors">
              <i className="ti ti-flame mr-1" aria-hidden="true" />
              Palm Oil
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/30 text-white cursor-pointer hover:bg-white/40 transition-colors">
              <i className="ti ti-flame mr-1" aria-hidden="true" />
              African Spices
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default HeroSearch;
