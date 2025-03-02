
import React from "react";

interface ContentItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
}

const CulturalContentHub: React.FC = () => {
  const contentItems: ContentItem[] = [
    {
      id: "c1",
      title: "The Art of Making Perfect Suya",
      excerpt: "Discover the secrets behind Nigeria's favorite spicy grilled meat delicacy and its traditional preparation.",
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Meat Delicacies",
      date: "May 15, 2023"
    },
    {
      id: "c2",
      title: "Akamu: The Nutritious Nigerian Breakfast",
      excerpt: "Learn how to prepare this fermented cereal porridge loved across West Africa for its health benefits.",
      image: "https://images.unsplash.com/photo-1565200003018-ecc3decc85d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Breakfast Foods",
      date: "June 3, 2023"
    },
    {
      id: "c3",
      title: "Amala and Ewedu: Perfect Pairing",
      excerpt: "Master the art of making smooth Amala and complementing Ewedu soup, a treasured Yoruba combination.",
      image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Yoruba Cuisine",
      date: "July 12, 2023"
    },
    {
      id: "c4",
      title: "Regional Delicacies: Igbo vs Yoruba Foods",
      excerpt: "Explore the distinctive culinary traditions of two of Nigeria's major ethnic groups and their signature dishes.",
      image: "https://images.unsplash.com/photo-1603431777007-61db4494a034?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Cultural Cuisine",
      date: "August 8, 2023"
    }
  ];

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">African Food Hub</h2>
        <button className="text-[#2E7D32] text-sm font-medium flex items-center">
          View All
          <i className="ti ti-chevron-right ml-1" aria-hidden="true" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contentItems.map((item) => (
          <article 
            key={item.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row"
          >
            <div className="md:w-1/3">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 md:w-2/3">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>{item.category}</span>
                <span className="mx-2">•</span>
                <span>{item.date}</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{item.excerpt}</p>
              <button className="text-[#2E7D32] text-sm font-medium flex items-center">
                Read More
                <i className="ti ti-arrow-right ml-1" aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>
      
      <div className="bg-[#F2FCE2] rounded-xl p-6 mt-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 md:mr-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Subscribe to Our Food Newsletter</h3>
            <p className="text-gray-600">Get weekly African recipes, cooking tips, and exclusive traditional food guides.</p>
          </div>
          <div className="w-full md:w-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none border border-gray-300"
              />
              <button className="bg-[#2E7D32] text-white px-4 py-2 rounded-r-lg font-medium hover:bg-[#1B5E20] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulturalContentHub;
