import React, { useState } from "react";
import FeatureList from "./FeatureList";
import AppScreenMockup from "./AppScreenMockup";
import ProductItem from "./ProductItem";
import ProductCard from "./ProductCard";
import GroceryShop from "./GroceryShop";

const EnhancedGroceryLanding: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"landing" | "shop">("landing");

  const features = [
    { text: "Trendy Design Style" },
    { text: "Fully Customizable" },
    { text: "Reuse Component" },
    { text: "Free Icons & Font Used" },
  ];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-[#333]">Gexpress</h1>
            <span className="text-sm text-gray-500">Shop From Anywhere</span>
          </div>

          <nav>
            <ul className="flex gap-6">
              <li>
                <button
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeTab === "landing"
                      ? "bg-[#4caf50] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("landing")}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeTab === "shop"
                      ? "bg-[#4caf50] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("shop")}
                >
                  Shop
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {activeTab === "landing" ? (
        <main className="flex bg-white p-10 max-md:flex-col max-md:p-5">
          <section className="flex-1 pr-[60px] max-md:mb-10">
            <h2 className="text-5xl font-bold text-[#333] leading-[1.2] mb-10 max-md:text-4xl max-sm:text-[28px]">
              Online Grocery Pick & Delivery
            </h2>

            <FeatureList features={features} screensCount="30+ Screens" />

            <button
              className="mt-8 px-6 py-3 bg-[#4caf50] text-white rounded-full font-medium hover:bg-[#3d8b40] transition-colors flex items-center gap-2"
              onClick={() => setActiveTab("shop")}
            >
              <span>Shop Now</span>
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </button>
          </section>

          <section className="flex-[2] grid grid-cols-[repeat(2,1fr)] gap-5 max-md:grid-cols-[1fr]">
            <div className="max-sm:grid-cols-[1fr]">
              <AppScreenMockup>
                <div className="flex flex-col gap-[15px]">
                  <ProductItem
                    image="https://placehold.co/100x100/ff6b6b/ff6b6b"
                    name="Tomato"
                    price="$5.99"
                    altText="Tomato"
                  />
                  <ProductItem
                    image="https://placehold.co/100x100/4caf50/4caf50"
                    name="Broccoli"
                    price="$3.99"
                    altText="Broccoli"
                  />
                </div>
              </AppScreenMockup>

              <AppScreenMockup>
                <div className="grid flex-col gap-[15px] grid-cols-[repeat(2,1fr)] max-sm:grid-cols-[1fr]">
                  <ProductCard
                    image="https://placehold.co/100x100/8bc34a/8bc34a"
                    price="$11.99"
                    altText="Avocado"
                  />
                  <ProductCard
                    image="https://placehold.co/100x100/e91e63/e91e63"
                    price="$8.99"
                    altText="Strawberry"
                  />
                  <ProductCard
                    image="https://placehold.co/100x100/ff9800/ff9800"
                    price="$6.99"
                    altText="Orange"
                  />
                </div>
              </AppScreenMockup>
            </div>
          </section>
        </main>
      ) : (
        <GroceryShop />
      )}

      <footer className="bg-gray-100 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Gexpress</h3>
              <p className="text-gray-600 mb-4">Shop From Anywhere</p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#4caf50]"
                  aria-label="Facebook"
                >
                  <i className="ti ti-brand-facebook" aria-hidden="true" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#4caf50]"
                  aria-label="Twitter"
                >
                  <i className="ti ti-brand-twitter" aria-hidden="true" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#4caf50]"
                  aria-label="Instagram"
                >
                  <i className="ti ti-brand-instagram" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#4caf50]">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#4caf50]">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#4caf50]">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#4caf50]">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="not-italic text-gray-600">
                <p className="mb-2">123 Grocery St, Food City</p>
                <p className="mb-2">Email: info@gexpress.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} Gexpress. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default EnhancedGroceryLanding;
