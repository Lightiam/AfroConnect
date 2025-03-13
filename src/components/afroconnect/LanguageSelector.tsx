
import React, { useState } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

// Most common languages from Google's Speech-to-Text API
const commonLanguages = [
  { code: "en-US", name: "English (US)" },
  { code: "fr-FR", name: "French" },
  { code: "es-ES", name: "Spanish" },
  { code: "de-DE", name: "German" },
  { code: "it-IT", name: "Italian" },
  { code: "pt-BR", name: "Portuguese (Brazil)" },
  { code: "ru-RU", name: "Russian" },
  { code: "ja-JP", name: "Japanese" },
  { code: "ko-KR", name: "Korean" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "ar-SA", name: "Arabic" },
  { code: "hi-IN", name: "Hindi" },
  { code: "sw-KE", name: "Swahili" },
  { code: "yo-NG", name: "Yoruba" },
  { code: "ha-NG", name: "Hausa" },
  { code: "ig-NG", name: "Igbo" },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  selectedLanguage, 
  onLanguageChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (value: string) => {
    onLanguageChange(value);
  };

  return (
    <div className="flex items-center justify-end">
      <div className="relative">
        <div className="flex items-center">
          <Globe size={16} className="text-gray-500 mr-1" />
          <Select value={selectedLanguage} onValueChange={handleLanguageSelect}>
            <SelectTrigger className="h-auto py-1 px-2 text-xs border-none bg-white/70 hover:bg-white transition-colors w-40">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {commonLanguages.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
