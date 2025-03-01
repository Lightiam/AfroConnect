import React from "react";
import FeatureList from "./FeatureList";
import AppScreenMockup from "./AppScreenMockup";
import ProductItem from "./ProductItem";
import ProductCard from "./ProductCard";

const GroceryLanding: React.FC = () => {
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
      <main className="flex bg-white p-10 max-md:flex-col max-md:p-5">
        <section className="flex-1 pr-[60px] max-md:mb-10">
          <h1 className="text-2xl font-semibold text-[#333] mb-2.5">
            Gexpress
          </h1>
          <p className="text-[#666] text-base mb-5">Shop From Anywhere</p>
          <h2 className="text-5xl font-bold text-[#333] leading-[1.2] mb-10 max-md:text-4xl max-sm:text-[28px]">
            Online Grocery Pick & Delivery
          </h2>
          <FeatureList features={features} screensCount="30+ Screens" />
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
    </>
  );
};

export default GroceryLanding;
