
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const BuyerProfile: React.FC = () => {
  // Mock data for buyer profile
  const buyerData = {
    id: "b1",
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "+1 (555) 987-6543",
    location: "Toronto, Canada",
    joinDate: "August 2023",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
    orderCount: 24,
    savedVendors: 12,
    savedProducts: 38,
    interests: ["West African Cuisine", "Spices", "Organic Products"],
    preferences: {
      dietaryRestrictions: ["Gluten-Free"],
      favoriteCuisines: ["Nigerian", "Ghanaian", "Ethiopian"]
    }
  };

  // Mock recent orders
  const recentOrders = [
    {
      id: "o1",
      date: "May 15, 2024",
      status: "Delivered",
      total: "$45.99",
      items: 3,
      vendor: "Mama's Delicacies"
    },
    {
      id: "o2",
      date: "April 30, 2024",
      status: "Delivered",
      total: "$32.50",
      items: 2,
      vendor: "Ghana Spice Co."
    },
    {
      id: "o3",
      date: "April 12, 2024",
      status: "Delivered",
      total: "$58.75",
      items: 4,
      vendor: "Savannah Flavors"
    }
  ];

  // Mock saved products
  const savedProducts = [
    {
      id: "sp1",
      name: "Premium Jollof Rice Spice",
      price: "$12.99",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      vendor: "Mama's Delicacies"
    },
    {
      id: "sp2",
      name: "Traditional Palm Oil",
      price: "$8.99",
      image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      vendor: "Ghana Spice Co."
    },
    {
      id: "sp3",
      name: "Organic Dried Hibiscus",
      price: "$6.99",
      image: "https://images.unsplash.com/photo-1573491599731-5aebc5dedb2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      vendor: "Savannah Flavors"
    },
    {
      id: "sp4",
      name: "Premium Egusi Seeds",
      price: "$10.99",
      image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      vendor: "Mama's Delicacies"
    }
  ];
  
  return (
    <div className="bg-gray-50 min-h-screen pb-20 md:pb-10">
      {/* Cover Image */}
      <div className="relative h-36 md:h-56 w-full">
        <img 
          src={buyerData.coverImage} 
          alt="Profile cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Back button */}
        <Link to="/" className="absolute top-4 left-4 bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
          <i className="ti ti-arrow-left text-gray-800" aria-hidden="true" />
        </Link>
      </div>
      
      {/* Profile Header */}
      <div className="relative px-4 md:px-6 lg:container mx-auto">
        <div className="bg-white rounded-xl shadow-md -mt-12 relative z-10 p-4 md:p-6">
          <div className="flex flex-col md:flex-row">
            {/* Profile Image */}
            <div className="flex-shrink-0 -mt-16 mb-4 md:mb-0 md:-mt-20 md:mr-6 mx-auto md:mx-0">
              <div className="rounded-full overflow-hidden border-4 border-white shadow-lg h-24 w-24 md:h-32 md:w-32">
                <img 
                  src={buyerData.profileImage} 
                  alt={buyerData.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">{buyerData.name}</h1>
              <p className="text-gray-500 mt-1">{buyerData.location}</p>
              <p className="text-gray-500 text-sm mt-1">Member since {buyerData.joinDate}</p>
              
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                {buyerData.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
              
              <div className="mt-4 md:mt-6">
                <button className="px-4 py-2 bg-[#355E3B] text-white rounded-full hover:bg-[#2E5133] transition-colors text-sm">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Stats */}
      <div className="container mx-auto px-4 md:px-6 mt-6">
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <div className="bg-white rounded-xl shadow-sm p-3 md:p-4 text-center">
            <p className="text-gray-500 text-xs md:text-sm">Orders</p>
            <p className="font-bold text-lg md:text-xl">{buyerData.orderCount}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-3 md:p-4 text-center">
            <p className="text-gray-500 text-xs md:text-sm">Saved Products</p>
            <p className="font-bold text-lg md:text-xl">{buyerData.savedProducts}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-3 md:p-4 text-center">
            <p className="text-gray-500 text-xs md:text-sm">Followed Vendors</p>
            <p className="font-bold text-lg md:text-xl">{buyerData.savedVendors}</p>
          </div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="container mx-auto px-4 md:px-6 mt-6">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold">Recent Orders</h2>
            <button className="text-[#355E3B] text-sm font-medium flex items-center">
              View All
              <i className="ti ti-chevron-right ml-1" aria-hidden="true" />
            </button>
          </div>
          
          <div className="divide-y divide-gray-100">
            {recentOrders.map(order => (
              <div key={order.id} className="py-3 md:py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800 text-sm md:text-base">{order.vendor}</p>
                    <p className="text-gray-500 text-xs md:text-sm">{order.date} • {order.items} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm md:text-base">{order.total}</p>
                    <Badge 
                      variant="success" 
                      className="mt-1 text-xs"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Saved Products */}
      <div className="container mx-auto px-4 md:px-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-semibold">Saved Products</h2>
          <button className="text-[#355E3B] text-sm font-medium flex items-center">
            View All
            <i className="ti ti-chevron-right ml-1" aria-hidden="true" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {savedProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-32 md:h-40 object-cover"
                />
                <button className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full hover:bg-white text-red-500 transition-colors">
                  <i className="ti ti-heart-filled text-sm" aria-hidden="true" />
                </button>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-800 text-sm md:text-base truncate">{product.name}</h3>
                <p className="text-gray-500 text-xs mt-1">{product.vendor}</p>
                <p className="text-[#4caf50] font-semibold text-sm md:text-base mt-1">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Preferences Section */}
      <div className="container mx-auto px-4 md:px-6 mt-6">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Preferences</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Favorite Cuisines</h3>
              <div className="flex flex-wrap gap-2">
                {buyerData.preferences.favoriteCuisines.map((cuisine, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {cuisine}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</h3>
              <div className="flex flex-wrap gap-2">
                {buyerData.preferences.dietaryRestrictions.map((restriction, index) => (
                  <Badge key={index} variant="destructive" className="text-xs">
                    {restriction}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-700">Contact Information</h3>
              <button className="text-[#355E3B] text-xs font-medium">
                Edit
              </button>
            </div>
            
            <div className="mt-2 space-y-2">
              <p className="flex items-center text-gray-700 text-sm">
                <i className="ti ti-mail mr-2" aria-hidden="true" />
                {buyerData.email}
              </p>
              <p className="flex items-center text-gray-700 text-sm">
                <i className="ti ti-phone mr-2" aria-hidden="true" />
                {buyerData.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
