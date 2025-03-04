
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
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=300&h=300&auto=format&fit=crop"
    },
    { 
      id: "grains", 
      name: "Grains & Flours", 
      icon: "wheat", 
      count: 95,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?q=80&w=300&h=300&auto=format&fit=crop"
    },
    { 
      id: "suya", 
      name: "Suya & Grilled Meats", 
      icon: "flame", 
      count: 67,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=300&h=300&auto=format&fit=crop"
    },
    { 
      id: "akamu", 
      name: "Akamu & Porridges", 
      icon: "bowl", 
      count: 54,
      image: "https://images.unsplash.com/photo-1495461199391-8c39ab674295?q=80&w=300&h=300&auto=format&fit=crop"
    },
    { 
      id: "amala", 
      name: "Amala & Swallows", 
      icon: "utensils", 
      count: 81,
      image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=300&h=300&auto=format&fit=crop"
    },
    { 
      id: "igbo", 
      name: "Igbo Delicacies", 
      icon: "leafy-green", 
      count: 93,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300&h=300&auto=format&fit=crop"
    },
    { 
      id: "yoruba", 
      name: "Yoruba Delicacies", 
      icon: "soup", 
      count: 89,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=300&h=300&auto=format&fit=crop"
    },
    { 
      id: "soups", 
      name: "Soups & Stews", 
      icon: "cooking-pot", 
      count: 112,
      image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?q=80&w=300&h=300&auto=format&fit=crop"
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
