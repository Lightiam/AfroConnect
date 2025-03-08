
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
      image: "/lovable-uploads/40638a92-9f47-4e7b-86ac-37f9a06ab091.png" // Ogbono seeds
    },
    { 
      id: "grains", 
      name: "Grains & Flours", 
      icon: "wheat", 
      count: 95,
      image: "/lovable-uploads/19fdb9d5-c004-4ac2-bf5e-1741ec7e2544.png" // Ofada Rice
    },
    { 
      id: "proteins", 
      name: "Proteins", 
      icon: "fish", 
      count: 67,
      image: "/lovable-uploads/c10a65bf-dcd6-44d2-af29-84eb412554a9.png" // Snail
    },
    { 
      id: "flours", 
      name: "Flours & Starches", 
      icon: "bowl", 
      count: 54,
      image: "/lovable-uploads/06d81f7b-34d0-434d-a060-a20f213032bb.png" // Garri
    },
    { 
      id: "seeds", 
      name: "Seeds & Nuts", 
      icon: "seedling", 
      count: 81,
      image: "/lovable-uploads/46c1e7ab-95cf-400d-b45d-0a5764572031.png" // Egusi Seeds
    },
    { 
      id: "dried-fish", 
      name: "Dried Fish", 
      icon: "fish", 
      count: 93,
      image: "/lovable-uploads/a2bae456-bf4b-488a-a766-8bb8117a55ee.png" // Dried Fish
    },
    { 
      id: "oils", 
      name: "Oils & Sauces", 
      icon: "bottle", 
      count: 89,
      image: "/lovable-uploads/72b36f68-4014-47c5-96e1-3995b4edcd9c.png" // Palm Oil
    },
    { 
      id: "roots", 
      name: "Roots & Tubers", 
      icon: "potato", 
      count: 112,
      image: "/lovable-uploads/b7a26887-c963-4ad3-aeb2-e681b27a056a.png" // Yam Tubers
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
