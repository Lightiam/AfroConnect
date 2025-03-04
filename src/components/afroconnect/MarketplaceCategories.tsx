
import React from "react";
import { Link } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  image: string;
}

const MarketplaceCategories: React.FC = () => {
  const categories: Category[] = [
    { 
      id: "spices", 
      name: "Spices & Seasonings", 
      icon: "pepper-hot", 
      count: 128,
      image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=300&h=300&auto=format&fit=crop"
    },
    { 
      id: "grains", 
      name: "Grains & Flours", 
      icon: "wheat", 
      count: 95,
      image: "https://images.unsplash.com/photo-1627735747011-b8d19a1ecf6f?q=80&w=300&h=300&auto=format&fit=crop"
    },
    { 
      id: "suya", 
      name: "Suya & Grilled Meats", 
      icon: "flame", 
      count: 67,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=300&h=300&auto=format&fit=crop"
    },
    { 
      id: "akamu", 
      name: "Akamu & Porridges", 
      icon: "bowl", 
      count: 54,
      image: "https://images.unsplash.com/photo-1590189182193-1fb15307dfb4?q=80&w=300&h=300&auto=format&fit=crop"
    },
    { 
      id: "amala", 
      name: "Amala & Swallows", 
      icon: "utensils", 
      count: 81,
      image: "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?q=80&w=300&h=300&auto=format&fit=crop"
    },
    { 
      id: "igbo", 
      name: "Igbo Delicacies", 
      icon: "leafy-green", 
      count: 93,
      image: "https://images.unsplash.com/photo-1611712142269-12b7433e28e9?q=80&w=300&h=300&auto=format&fit=crop"
    },
    { 
      id: "yoruba", 
      name: "Yoruba Delicacies", 
      icon: "soup", 
      count: 89,
      image: "https://images.unsplash.com/photo-1536304575999-cce3da162998?q=80&w=300&h=300&auto=format&fit=crop"
    },
    { 
      id: "soups", 
      name: "Soups & Stews", 
      icon: "cooking-pot", 
      count: 112,
      image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=300&h=300&auto=format&fit=crop"
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
      {categories.map((category) => (
        <Link 
          to={`/search?category=${category.id}`}
          key={category.id}
          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col"
        >
          <div className="h-32 w-full relative">
            <img 
              src={category.image} 
              alt={category.name}
              className="w-full h-full object-cover" 
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
              <p className="text-white text-xs md:text-sm font-medium">{category.count} items</p>
            </div>
          </div>
          <div className="p-2 md:p-3 flex items-center">
            <div className="w-8 h-8 bg-[#F2FCE2] rounded-full flex items-center justify-center mr-2">
              <i className={`ti ti-${category.icon} text-[#2E7D32] text-base`} aria-hidden="true" />
            </div>
            <h3 className="font-medium text-gray-800 text-xs md:text-sm line-clamp-1">{category.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MarketplaceCategories;
