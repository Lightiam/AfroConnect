
import React from "react";
import { Search } from "lucide-react";

interface SearchKeywordsProps {
  onKeywordClick: (keyword: string) => void;
}

const SearchKeywords: React.FC<SearchKeywordsProps> = ({ onKeywordClick }) => {
  const keywords = ["Jollof Rice", "Shea Butter", "Palm Oil", "African Spices"];

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-3 md:mt-4">
      {keywords.map((keyword) => (
        <span
          key={keyword}
          className="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm bg-white/30 text-white cursor-pointer hover:bg-white/40 transition-colors"
          onClick={() => onKeywordClick(keyword)}
        >
          <Search className="mr-1" size={12} />
          {keyword}
        </span>
      ))}
    </div>
  );
};

export default SearchKeywords;
