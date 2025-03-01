import React, { useState } from "react";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import EnhancedProductItem from "./EnhancedProductItem";
import EnhancedProductCard from "./EnhancedProductCard";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  altText: string;
  description?: string;
  weight?: string;
  discount?: string;
  categoryId: string;
}

const GroceryShop: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [cartItems, setCartItems] = useState<Record<string, number>>({});

  const categories = [
    { id: "fruits", name: "Fruits", icon: "apple" },
    { id: "vegetables", name: "Vegetables", icon: "salad" },
    { id: "dairy", name: "Dairy", icon: "milk" },
    { id: "bakery", name: "Bakery", icon: "bread" },
  ];

  const products: Product[] = [
    {
      id: "1",
      name: "Tomato",
      price: "$5.99",
      image: "https://placehold.co/100x100/ff6b6b/ff6b6b",
      altText: "Tomato",
      description: "Fresh organic tomatoes",
      weight: "500g",
      categoryId: "vegetables",
    },
    {
      id: "2",
      name: "Broccoli",
      price: "$3.99",
      image: "https://placehold.co/100x100/4caf50/4caf50",
      altText: "Broccoli",
      description: "Fresh organic broccoli",
      weight: "300g",
      categoryId: "vegetables",
    },
    {
      id: "3",
      name: "Avocado",
      price: "$11.99",
      image: "https://placehold.co/100x100/8bc34a/8bc34a",
      altText: "Avocado",
      description: "Ripe avocados",
      weight: "250g",
      discount: "-15%",
      categoryId: "fruits",
    },
    {
      id: "4",
      name: "Strawberry",
      price: "$8.99",
      image: "https://placehold.co/100x100/e91e63/e91e63",
      altText: "Strawberry",
      description: "Sweet strawberries",
      weight: "200g",
      categoryId: "fruits",
    },
    {
      id: "5",
      name: "Orange",
      price: "$6.99",
      image: "https://placehold.co/100x100/ff9800/ff9800",
      altText: "Orange",
      description: "Juicy oranges",
      weight: "1kg",
      categoryId: "fruits",
    },
    {
      id: "6",
      name: "Milk",
      price: "$4.99",
      image: "https://placehold.co/100x100/90caf9/90caf9",
      altText: "Milk",
      description: "Fresh whole milk",
      weight: "1L",
      categoryId: "dairy",
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddToCart = (productId: string, quantity: number) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === null || product.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalCartItems = Object.values(cartItems).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#333] mb-2">Gexpress Shop</h1>
        <p className="text-gray-600">Fresh groceries delivered to your door</p>

        <SearchBar onSearch={handleSearch} />

        <div className="flex justify-between items-center mt-6">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="flex items-center gap-4">
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                className={`px-3 py-1.5 ${viewMode === "grid" ? "bg-[#4caf50] text-white" : "bg-white text-gray-700"}`}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <i className="ti ti-grid-dots" aria-hidden="true" />
              </button>
              <button
                className={`px-3 py-1.5 ${viewMode === "list" ? "bg-[#4caf50] text-white" : "bg-white text-gray-700"}`}
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <i className="ti ti-list" aria-hidden="true" />
              </button>
            </div>

            <div className="relative">
              <button className="p-2 bg-white border border-gray-200 rounded-full">
                <i
                  className="ti ti-shopping-cart text-[#4caf50]"
                  aria-hidden="true"
                />
              </button>
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalCartItems}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <EnhancedProductCard
                key={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                altText={product.altText}
                discount={product.discount}
                onAddToCart={(quantity) =>
                  handleAddToCart(product.id, quantity)
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredProducts.map((product) => (
              <EnhancedProductItem
                key={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                altText={product.altText}
                description={product.description}
                weight={product.weight}
                onAddToCart={(quantity) =>
                  handleAddToCart(product.id, quantity)
                }
              />
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <i
              className="ti ti-search-off text-4xl text-gray-400 mb-2"
              aria-hidden="true"
            />
            <p className="text-gray-500">
              No products found. Try a different search or category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default GroceryShop;
