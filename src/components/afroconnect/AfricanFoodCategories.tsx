
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
      id: "snail",
      name: "Snail",
      image: "/lovable-uploads/c10a65bf-dcd6-44d2-af29-84eb412554a9.png",
      description: "Traditional African snails, rich in protein and used in many stews and soups."
    },
    {
      id: "ogbono",
      name: "Ogbono Seed",
      image: "/lovable-uploads/40638a92-9f47-4e7b-86ac-37f9a06ab091.png",
      description: "Seeds used to make the popular Ogbono soup, known for its mucilaginous (slimy) texture."
    },
    {
      id: "fish",
      name: "Fish",
      image: "/lovable-uploads/a2bae456-bf4b-488a-a766-8bb8117a55ee.png",
      description: "Dried fish, a staple protein source in many African dishes and stews."
    },
    {
      id: "garri",
      name: "Garri",
      image: "/lovable-uploads/06d81f7b-34d0-434d-a060-a20f213032bb.png",
      description: "Cassava flour that has been fermented and roasted, commonly used to make fufu or eba."
    },
    {
      id: "egusi",
      name: "Egusi/Melon",
      image: "/lovable-uploads/46c1e7ab-95cf-400d-b45d-0a5764572031.png",
      description: "Ground melon seeds used to thicken soups and add a rich, nutty flavor to dishes."
    },
    {
      id: "ofada",
      name: "Ofada Rice",
      image: "/lovable-uploads/19fdb9d5-c004-4ac2-bf5e-1741ec7e2544.png",
      description: "A traditional Nigerian rice variety known for its robust flavor and natural aroma."
    },
    {
      id: "variety",
      name: "Variety",
      image: "/lovable-uploads/696dad7a-0f8d-4dd9-9d75-1a049a39be5b.png",
      description: "Assorted spices, herbs, and ingredients used in traditional African cooking."
    },
    {
      id: "palm-oil",
      name: "Palm Oil",
      image: "/lovable-uploads/72b36f68-4014-47c5-96e1-3995b4edcd9c.png",
      description: "Red palm oil, an essential ingredient in West African cuisine, adding color and flavor."
    },
    {
      id: "yam",
      name: "Yam Tubers",
      image: "/lovable-uploads/b7a26887-c963-4ad3-aeb2-e681b27a056a.png",
      description: "Starchy tubers that are boiled, roasted, fried, or pounded into fufu."
    },
    {
      id: "beans",
      name: "Beans & Grains",
      image: "/lovable-uploads/859ab634-b5b1-479c-8b09-5eb329e1700e.png",
      description: "Various beans, legumes, and grains that form the foundation of many African dishes."
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
