
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const VendorProfile: React.FC = () => {
  // Mock data for vendor profile
  const vendorData = {
    id: "v1",
    name: "Mama's Delicacies",
    email: "contact@mamasdelicacies.com",
    phone: "+1 (555) 123-4567",
    country: "Nigeria",
    city: "Lagos",
    bio: "Authentic Nigerian cuisine and ingredients, bringing the taste of home to your kitchen. Family-owned business with over 20 years of experience.",
    joinDate: "March 2022",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    coverImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
    rating: 4.8,
    verified: true,
    totalSales: 756,
    productCount: 38,
    followers: 142,
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com"
    }
  };

  // Mock products list
  const products = [
    {
      id: "p1",
      name: "Premium Jollof Rice Spice",
      price: "$12.99",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      isNew: true
    },
    {
      id: "p2",
      name: "Traditional Palm Oil",
      price: "$8.99",
      image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "p3",
      name: "Organic Dried Hibiscus",
      price: "$6.99",
      image: "https://images.unsplash.com/photo-1573491599731-5aebc5dedb2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "p4",
      name: "Premium Egusi Seeds",
      price: "$10.99",
      image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      isNew: true
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20 md:pb-10">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 lg:h-80 w-full">
        <img 
          src={vendorData.coverImage} 
          alt="Store cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Back button */}
        <Link to="/" className="absolute top-4 left-4 bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
          <i className="ti ti-arrow-left text-gray-800" aria-hidden="true" />
        </Link>
        
        {/* Share button */}
        <button className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
          <i className="ti ti-share text-gray-800" aria-hidden="true" />
        </button>
      </div>
      
      {/* Profile Header */}
      <div className="relative px-4 md:px-6 lg:container mx-auto">
        <div className="bg-white rounded-xl shadow-md -mt-16 relative z-10 p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center">
            {/* Profile Image */}
            <div className="flex-shrink-0 -mt-20 mb-4 md:mb-0 md:-mt-24 md:mr-6">
              <div className="rounded-xl overflow-hidden border-4 border-white shadow-lg h-24 w-24 md:h-32 md:w-32">
                <img 
                  src={vendorData.image} 
                  alt={vendorData.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900">{vendorData.name}</h1>
                    {vendorData.verified && (
                      <Badge 
                        variant="success" 
                        className="ml-2 flex items-center gap-1"
                      >
                        <i className="ti ti-check text-xs" aria-hidden="true" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-500 mt-1">{vendorData.country}, {vendorData.city}</p>
                </div>
                
                <div className="flex items-center mt-4 md:mt-0 space-x-3">
                  <div className="flex items-center text-yellow-500">
                    <i className="ti ti-star-filled mr-1" aria-hidden="true" />
                    <span className="font-medium">{vendorData.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({vendorData.totalSales} sales)</span>
                  </div>
                  <button className="px-4 py-2 bg-[#355E3B] text-white rounded-full hover:bg-[#2E5133] transition-colors text-sm">
                    Follow
                  </button>
                </div>
              </div>
              
              {/* Store stats */}
              <div className="grid grid-cols-3 gap-4 mt-4 md:mt-6 text-center">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs md:text-sm">Products</p>
                  <p className="font-bold text-lg md:text-xl">{vendorData.productCount}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs md:text-sm">Followers</p>
                  <p className="font-bold text-lg md:text-xl">{vendorData.followers}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs md:text-sm">Rating</p>
                  <div className="flex items-center justify-center font-bold text-lg md:text-xl">
                    {vendorData.rating}
                    <i className="ti ti-star-filled text-yellow-500 ml-1" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* About Section */}
      <div className="container mx-auto px-4 md:px-6 mt-6">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">About</h2>
          <p className="text-gray-700">{vendorData.bio}</p>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact Details</h3>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center text-gray-700">
                    <i className="ti ti-mail mr-2" aria-hidden="true" />
                    {vendorData.email}
                  </li>
                  <li className="flex items-center text-gray-700">
                    <i className="ti ti-phone mr-2" aria-hidden="true" />
                    {vendorData.phone}
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Social Media</h3>
                <div className="flex mt-2 space-x-3">
                  <a href={vendorData.socialLinks.facebook} className="text-gray-600 hover:text-blue-600">
                    <i className="ti ti-brand-facebook text-xl" aria-hidden="true" />
                  </a>
                  <a href={vendorData.socialLinks.instagram} className="text-gray-600 hover:text-pink-600">
                    <i className="ti ti-brand-instagram text-xl" aria-hidden="true" />
                  </a>
                  <a href={vendorData.socialLinks.twitter} className="text-gray-600 hover:text-blue-400">
                    <i className="ti ti-brand-twitter text-xl" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Products Section */}
      <div className="container mx-auto px-4 md:px-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-semibold">Products</h2>
          <button className="text-[#355E3B] text-sm font-medium flex items-center">
            View All
            <i className="ti ti-chevron-right ml-1" aria-hidden="true" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-32 md:h-40 object-cover"
                />
                {product.isNew && (
                  <Badge 
                    variant="success" 
                    className="absolute top-2 right-2 text-xs font-medium"
                  >
                    New
                  </Badge>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-800 text-sm md:text-base truncate">{product.name}</h3>
                <p className="text-[#4caf50] font-semibold text-sm md:text-base mt-1">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
