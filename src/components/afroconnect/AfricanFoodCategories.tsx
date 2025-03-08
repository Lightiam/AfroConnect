
import React from "react";
import { Link } from "react-router-dom";

interface FoodItem {
  id: string;
  name: string;
  image: string;
  description: string;
}

const AfricanFoodCategories: React.FC = () => {
  const foodItems: FoodItem[] = [
    {
      id: "spices",
      name: "Spices",
      image: "/lovable-uploads/e2046a7c-4fca-47c8-8ad1-29b94499528b.png",
      description: "Variety of colorful African spices used in traditional cooking."
    },
    {
      id: "crayfish",
      name: "Crayfishes",
      image: "/lovable-uploads/f5843af2-7f2f-4fc0-98dc-7e5d68b4c289.png",
      description: "Dried crayfish for rich flavoring in soups and sauces."
    },
    {
      id: "kuli-kuli",
      name: "Kali-kuli",
      image: "/lovable-uploads/6317c600-e26d-482d-b363-778bc7cec112.png",
      description: "Crunchy groundnut snack common in West African cuisine."
    },
    {
      id: "beans",
      name: "Beans",
      image: "/lovable-uploads/94f271c3-e5f9-4e10-b1d9-796b15b004dc.png",
      description: "Various beans used in traditional African stews and porridges."
    },
    {
      id: "koko-yam",
      name: "Koko-Yam",
      image: "/lovable-uploads/c98b6122-f393-452b-8b3b-3ada787ec493.png",
      description: "Starchy root vegetable used in soups and as a side dish."
    },
    {
      id: "plantain",
      name: "Plantain",
      image: "/lovable-uploads/4d46f94d-a008-490a-b711-da435c1c5db7.png",
      description: "Versatile fruit that can be fried, boiled, or roasted as a staple food."
    },
    {
      id: "amala",
      name: "Amala Powder",
      image: "/lovable-uploads/d1e3de22-092b-4a29-ae96-63f6717da2f4.png",
      description: "Yam flour used to make a popular Nigerian swallow food."
    },
    {
      id: "tiger-nuts",
      name: "Tiger Nuts",
      image: "/lovable-uploads/7d207088-29c0-40d0-8e84-b1c2f16806b5.png",
      description: "Small, sweet tubers used for snacking or making tiger nut milk."
    },
    {
      id: "acha",
      name: "Acha",
      image: "/lovable-uploads/be9ec05d-bf4e-45ac-8c90-5b366c5a57f8.png",
      description: "Ancient African grain with a nutty flavor, also known as fonio."
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-10">
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">African Food Ingredients</h2>
        <p className="text-gray-600 mt-2">Authentic African ingredients for your traditional recipes</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {foodItems.map((item) => (
          <Link 
            to={`/search?q=${item.name}`}
            key={item.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full"
          >
            <div className="relative h-32 md:h-40">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="text-white text-xs md:text-sm font-medium">{item.name}</p>
              </div>
            </div>
            <div className="p-2 md:p-3 flex-grow">
              <p className="text-gray-600 text-xs md:text-sm line-clamp-2">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AfricanFoodCategories;
