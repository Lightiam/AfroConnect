import React, { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search for groceries...",
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center w-full max-w-md mx-auto mt-4 mb-6"
    >
      <div className="absolute left-3 text-gray-400">
        <i className="ti ti-search" aria-hidden="true" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent"
        aria-label="Search"
      />
      <button
        type="submit"
        className="absolute right-2 p-1 text-white bg-[#4caf50] rounded-full hover:bg-[#3d8b40] focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:ring-offset-2"
        aria-label="Submit search"
      >
        <i className="ti ti-arrow-right" aria-hidden="true" />
      </button>
    </form>
  );
};

export default SearchBar;
