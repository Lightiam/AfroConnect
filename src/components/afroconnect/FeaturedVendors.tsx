
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Vendor {
  id: string;
  name: string;
  country: string;
  image: string;
  rating: number;
  verified: boolean;
  productCount: number;
}

const FeaturedVendors: React.FC = () => {
  const vendors: Vendor[] = [
    { 
      id: "v1", 
      name: "Jollof Rice", 
      country: "Nigeria", 
      image: "/lovable-uploads/c8af5427-bb1e-4f30-ae4d-79adfe1868f0.png",
      rating: 4.8, 
      verified: true,
      productCount: 38
    },
    { 
      id: "v2", 
      name: "Pounded yam & Egusi", 
      country: "Ghana", 
      image: "/lovable-uploads/1c867b3c-085c-4480-873e-6b4c441044cf.png",
      rating: 4.7, 
      verified: true,
      productCount: 45
    },
    { 
      id: "v3", 
      name: "Savannah Flavors", 
      country: "Kenya", 
      image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", 
      rating: 4.5, 
      verified: true,
      productCount: 29
    },
  ];

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Featured Vendors</h2>
        <button className="text-[#2E7D32] text-sm font-medium flex items-center">
          View All
          <i className="ti ti-chevron-right ml-1" aria-hidden="true" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vendors.map((vendor) => (
          <div 
            key={vendor.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div className="relative h-32">
              <img 
                src={vendor.image} 
                alt={vendor.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <div className="flex items-center justify-between w-full">
                    <h3 className="font-semibold">{vendor.name}</h3>
                    <div className="flex items-center">
                      <i className="ti ti-star-filled text-yellow-400 mr-1" aria-hidden="true" />
                      <span>{vendor.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-white/80">{vendor.country}</p>
                </div>
              </div>
              {vendor.verified && (
                <Badge 
                  variant="success" 
                  className="absolute top-2 right-2 flex items-center gap-1"
                >
                  <i className="ti ti-check text-xs" aria-hidden="true" />
                  Verified
                </Badge>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{vendor.productCount} products</span>
                <Link to="/vendor-profile" className="text-[#2E7D32] text-sm font-medium">
                  Visit Store
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedVendors;
