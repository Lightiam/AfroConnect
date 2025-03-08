
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
      name: "Spices", 
      icon: "pepper-hot", 
      count: 128,
      image: "/lovable-uploads/e2046a7c-4fca-47c8-8ad1-29b94499528b.png" 
    },
    { 
      id: "crayfish", 
      name: "Crayfishes", 
      icon: "fish", 
      count: 95,
      image: "/lovable-uploads/f5843af2-7f2f-4fc0-98dc-7e5d68b4c289.png" 
    },
    { 
      id: "kuli-kuli", 
      name: "Kuli-kuli", 
      icon: "nut", 
      count: 67,
      image: "/lovable-uploads/886cd2bb-3e33-46b7-af02-952c2938e6fd.png" 
    },
    { 
      id: "beans", 
      name: "Beans", 
      icon: "bean", 
      count: 54,
      image: "/lovable-uploads/94f271c3-e5f9-4e10-b1d9-796b15b004dc.png" 
    },
    { 
      id: "koko-yam", 
      name: "Koko-Yam", 
      icon: "carrot", 
      count: 81,
      image: "/lovable-uploads/c98b6122-f393-452b-8b3b-3ada787ec493.png" 
    },
    { 
      id: "plantain", 
      name: "Plantain", 
      icon: "leaf", 
      count: 93,
      image: "/lovable-uploads/4d46f94d-a008-490a-b711-da435c1c5db7.png" 
    },
    { 
      id: "amala", 
      name: "Amala Powder", 
      icon: "wheat", 
      count: 89,
      image: "/lovable-uploads/d1e3de22-092b-4a29-ae96-63f6717da2f4.png" 
    },
    { 
      id: "tiger-nuts", 
      name: "Tiger Nuts", 
      icon: "seedling", 
      count: 112,
      image: "/lovable-uploads/7d207088-29c0-40d0-8e84-b1c2f16806b5.png" 
    },
    { 
      id: "acha", 
      name: "Acha", 
      icon: "wheat", 
      count: 75,
      image: "/lovable-uploads/be9ec05d-bf4e-45ac-8c90-5b366c5a57f8.png" 
    },
    { 
      id: "kilishi", 
      name: "Kilishi", 
      icon: "beef", 
      count: 83,
      image: "/lovable-uploads/33ba3b61-e137-4def-9737-fe32ae435a50.png" 
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
