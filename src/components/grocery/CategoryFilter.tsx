import React from "react";

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3 text-[#333]">Categories</h3>
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === null
              ? "bg-[#4caf50] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => onSelectCategory(null)}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
              selectedCategory === category.id
                ? "bg-[#4caf50] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => onSelectCategory(category.id)}
          >
            <i className={`ti ti-${category.icon}`} aria-hidden="true" />
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
