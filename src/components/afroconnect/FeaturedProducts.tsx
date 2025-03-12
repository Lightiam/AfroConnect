
import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../grocery/ProductCard";

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  country: string;
  isNew?: boolean;
}

const FeaturedProducts: React.FC = () => {
  const featuredProducts: Product[] = [
    {
      id: "spice-mix",
      name: "Premium Spice Mix",
      image: "/lovable-uploads/e2046a7c-4fca-47c8-8ad1-29b94499528b.png",
      price: "$12.99",
      country: "Nigeria",
      isNew: true
    },
    {
      id: "crayfish",
      name: "Dried Crayfish",
      image: "/lovable-uploads/f5843af2-7f2f-4fc0-98dc-7e5d68b4c289.png",
      price: "$8.49",
      country: "Ghana"
    },
    {
      id: "kuli-kuli",
      name: "Kuli-Kuli",
      image: "/lovable-uploads/6317c600-e26d-482d-b363-778bc7cec112.png",
      price: "$15.99",
      country: "Niger"
    },
    {
      id: "shea-butter",
      name: "Tiger Nuts",
      image: "/lovable-uploads/7d207088-29c0-40d0-8e84-b1c2f16806b5.png",
      price: "$21.99",
      country: "Mali",
      isNew: true
    }
  ];

  return (
    <section className="mb-6 md:mb-8">
      <div className="flex justify-between items-center mb-3 md:mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Featured Products</h2>
        <Link to="/search" className="text-[#355E3B] text-xs md:text-sm font-medium flex items-center">
          View All
          <i className="ti ti-chevron-right ml-1" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
        {featuredProducts.map(product => (
          <Link to="/vendor-profile" key={product.id}>
            <ProductCard 
              image={product.image}
              price={product.price}
              altText={product.name}
              name={product.name}
              country={product.country}
              isNew={product.isNew}
              onPress={() => {}}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
