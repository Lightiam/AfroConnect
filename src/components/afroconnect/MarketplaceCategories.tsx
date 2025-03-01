
import React from "react";

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

const MarketplaceCategories: React.FC = () => {
  const categories: Category[] = [
    { id: "spices", name: "Spices & Seasonings", icon: "pepper", count: 128 },
    { id: "grains", name: "Grains & Flours", icon: "wheat", count: 95 },
    { id: "oils", name: "Oils & Sauces", icon: "bottle", count: 74 },
    { id: "snacks", name: "Snacks & Treats", icon: "cookie", count: 103 },
    { id: "drinks", name: "Beverages", icon: "glass", count: 67 },
    { id: "beauty", name: "Beauty & Wellness", icon: "flower", count: 89 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <div 
          key={category.id}
          className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center"
        >
          <div className="w-12 h-12 bg-[#F8F2E8] rounded-full flex items-center justify-center mb-3">
            <i className={`ti ti-${category.icon} text-[#8B4513] text-xl`} aria-hidden="true" />
          </div>
          <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">{category.name}</h3>
          <p className="text-sm text-gray-500">{category.count} items</p>
        </div>
      ))}
    </div>
  );
};

export default MarketplaceCategories;
