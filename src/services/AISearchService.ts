
// This service will handle AI search functionality
export interface SearchResult {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image?: string;
}

export const performAISearch = async (query: string): Promise<SearchResult[]> => {
  console.log(`Performing AI search for: ${query}`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // African food items data based on the provided images
  const results: SearchResult[] = [
    {
      id: "1",
      name: "African Spices",
      description: "Variety of colorful African spices used in traditional cooking",
      category: "Spices",
      price: 9.99,
      image: "/lovable-uploads/e2046a7c-4fca-47c8-8ad1-29b94499528b.png"
    },
    {
      id: "2",
      name: "Dried Crayfish",
      description: "Dried crayfish for rich flavoring in soups and sauces",
      category: "Crayfishes",
      price: 12.99,
      image: "/lovable-uploads/f5843af2-7f2f-4fc0-98dc-7e5d68b4c289.png"
    },
    {
      id: "3",
      name: "Kali-kuli",
      description: "Crunchy groundnut snack common in West African cuisine",
      category: "Snacks",
      price: 7.49,
      image: "/lovable-uploads/6317c600-e26d-482d-b363-778bc7cec112.png"
    },
    {
      id: "4",
      name: "African Beans",
      description: "Various beans used in traditional stews and porridges",
      category: "Beans",
      price: 6.99,
      image: "/lovable-uploads/94f271c3-e5f9-4e10-b1d9-796b15b004dc.png"
    },
    {
      id: "5",
      name: "Koko-Yam",
      description: "Starchy root vegetable used in soups and as a side dish",
      category: "Roots & Tubers",
      price: 8.99,
      image: "/lovable-uploads/c98b6122-f393-452b-8b3b-3ada787ec493.png"
    },
    {
      id: "6",
      name: "Plantain",
      description: "Versatile fruit that can be fried, boiled, or roasted",
      category: "Fruits",
      price: 5.99,
      image: "/lovable-uploads/4d46f94d-a008-490a-b711-da435c1c5db7.png"
    },
    {
      id: "7",
      name: "Amala Powder",
      description: "Yam flour used to make a popular Nigerian swallow food",
      category: "Flours",
      price: 10.49,
      image: "/lovable-uploads/d1e3de22-092b-4a29-ae96-63f6717da2f4.png"
    },
    {
      id: "8",
      name: "Tiger Nuts",
      description: "Small, sweet tubers used for snacking or making tiger nut milk",
      category: "Nuts & Seeds",
      price: 8.49,
      image: "/lovable-uploads/7d207088-29c0-40d0-8e84-b1c2f16806b5.png"
    },
    {
      id: "9",
      name: "Acha Grain",
      description: "Ancient African grain with a nutty flavor, also known as fonio",
      category: "Grains",
      price: 11.99,
      image: "/lovable-uploads/be9ec05d-bf4e-45ac-8c90-5b366c5a57f8.png"
    },
    {
      id: "10",
      name: "Palm Oil",
      description: "Traditional red oil used in African cooking",
      category: "Oils",
      price: 14.99,
      image: "/lovable-uploads/72b36f68-4014-47c5-96e1-3995b4edcd9c.png"
    },
    {
      id: "11",
      name: "Jollof Rice Mix",
      description: "Premixed spices for making the perfect jollof rice",
      category: "Spices",
      price: 8.99,
      image: "/lovable-uploads/859ab634-b5b1-479c-8b09-5eb329e1700e.png"
    },
    {
      id: "12",
      name: "Shea Butter",
      description: "Pure African shea butter for cooking and skin care",
      category: "Butter",
      price: 15.99,
      image: "/lovable-uploads/886cd2bb-3e33-46b7-af02-952c2938e6fd.png"
    }
  ];
  
  // Improved search algorithm - normalize query and search terms
  // Remove special characters, normalize spaces, and convert to lowercase
  const normalizedQuery = query.toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  const searchTerms = normalizedQuery.split(' ').filter(term => term.length > 1);
  
  if (searchTerms.length === 0) {
    return results.slice(0, 4); // Return a few default results if query is too short
  }
  
  // Score-based matching algorithm
  return results
    .map(item => {
      let score = 0;
      const itemName = item.name.toLowerCase();
      const itemDesc = item.description.toLowerCase();
      const itemCat = item.category.toLowerCase();
      
      searchTerms.forEach(term => {
        // Exact match in name is highest priority
        if (itemName === term) score += 10;
        // Partial match in name
        else if (itemName.includes(term)) score += 5;
        // Word match in description
        if (itemDesc.includes(term)) score += 3;
        // Category match
        if (itemCat.includes(term)) score += 4;
      });
      
      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ score, ...item }) => item); // Remove the score before returning
};

export const performVoiceSearch = async (audioBlob: Blob, language = 'en-US'): Promise<string> => {
  console.log(`Processing voice input with language: ${language}...`);
  
  // In a real app, this would send the audio to a speech-to-text service with language support
  // For now, we'll simulate a successful transcription after a delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return a mock transcription result related to African food ingredients
  const mockTranscriptions: Record<string, string[]> = {
    'en-US': [
      "african spices",
      "crayfish",
      "kali-kuli",
      "beans",
      "koko-yam",
      "plantain",
      "palm oil",
      "jollof rice",
      "shea butter",
      "tiger nuts"
    ],
    'fr-FR': [
      "épices africaines",
      "écrevisses",
      "kali-kuli",
      "haricots",
      "koko-yam",
      "plantain",
      "huile de palme",
      "riz jollof",
      "beurre de karité",
      "noix tigrées"
    ],
    'es-ES': [
      "especias africanas",
      "cangrejos de río",
      "kali-kuli",
      "frijoles",
      "koko-yam",
      "plátano",
      "aceite de palma",
      "arroz jollof",
      "manteca de karité",
      "nueces tigre"
    ],
    'sw-KE': [
      "viungo vya afrika",
      "kamba",
      "kali-kuli",
      "maharagwe",
      "koko-yam",
      "ndizi",
      "mafuta ya mawese",
      "wali wa jollof",
      "siagi ya shea",
      "karanga za chui"
    ],
    'yo-NG': [
      "ẹyọ ilẹ̀ Áfíríkà",
      "ọ̀dọ́",
      "kali-kuli",
      "ẹ̀wà",
      "koko-yam",
      "ọ̀gẹ̀dẹ̀",
      "epo pupa",
      "jollof iresi",
      "òróró shea",
      "ẹyin ẹkun"
    ],
    'ha-NG': [
      "kayan yaji na Afrika",
      "kifi",
      "kali-kuli",
      "wake",
      "koko-yam",
      "ayaba",
      "man ja",
      "shinkafan jollof",
      "man shea",
      "gujiya"
    ],
  };
  
  // Get transcriptions for the specified language or fall back to English
  const transcriptions = mockTranscriptions[language] || mockTranscriptions['en-US'];
  
  return transcriptions[Math.floor(Math.random() * transcriptions.length)];
};
