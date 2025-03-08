
// This service will handle AI search functionality
// In a production app, this would connect to a real AI service
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
  
  // Mock data - in a real app, this would be coming from an AI service
  const results: SearchResult[] = [
    {
      id: "1",
      name: "Organic Jollof Rice Spice Mix",
      description: "Authentic blend of spices for perfect Jollof Rice every time",
      category: "Spices & Seasonings",
      price: 9.99,
      image: "https://source.unsplash.com/random/100x100/?spice"
    },
    {
      id: "2",
      name: "Premium Shea Butter",
      description: "100% pure and unrefined shea butter from Ghana",
      category: "Beauty & Wellness",
      price: 12.50,
      image: "https://source.unsplash.com/random/100x100/?shea"
    },
    {
      id: "3",
      name: "Red Palm Oil",
      description: "Traditional West African palm oil for authentic cooking",
      category: "Oils & Sauces",
      price: 14.99,
      image: "/lovable-uploads/72b36f68-4014-47c5-96e1-3995b4edcd9c.png"
    },
    {
      id: "4",
      name: "African Snails",
      description: "Traditional African snails for authentic soups and stews",
      category: "Proteins",
      price: 19.99,
      image: "/lovable-uploads/c10a65bf-dcd6-44d2-af29-84eb412554a9.png"
    },
    {
      id: "5",
      name: "Ogbono Seeds",
      description: "Premium quality ogbono seeds for authentic soups",
      category: "Spices & Seasonings",
      price: 11.99,
      image: "/lovable-uploads/40638a92-9f47-4e7b-86ac-37f9a06ab091.png"
    },
    {
      id: "6",
      name: "Dried Fish",
      description: "Sustainably sourced dried fish for your traditional recipes",
      category: "Proteins",
      price: 16.99,
      image: "/lovable-uploads/a2bae456-bf4b-488a-a766-8bb8117a55ee.png"
    },
    {
      id: "7",
      name: "Premium Garri",
      description: "High-quality fermented and roasted cassava flour",
      category: "Flours & Grains",
      price: 8.99,
      image: "/lovable-uploads/06d81f7b-34d0-434d-a060-a20f213032bb.png"
    },
    {
      id: "8",
      name: "Egusi Seeds",
      description: "Ground melon seeds for authentic Nigerian soups",
      category: "Spices & Seasonings",
      price: 13.50,
      image: "/lovable-uploads/46c1e7ab-95cf-400d-b45d-0a5764572031.png"
    },
    {
      id: "9",
      name: "Ofada Rice",
      description: "Traditional Nigerian rice variety with natural aroma",
      category: "Flours & Grains",
      price: 9.99,
      image: "/lovable-uploads/19fdb9d5-c004-4ac2-bf5e-1741ec7e2544.png"
    },
    {
      id: "10",
      name: "Yam Tubers",
      description: "Fresh yam tubers imported directly from West Africa",
      category: "Roots & Tubers",
      price: 22.99,
      image: "/lovable-uploads/b7a26887-c963-4ad3-aeb2-e681b27a056a.png"
    },
    {
      id: "11",
      name: "African Beans & Grains Set",
      description: "Assortment of beans and grains for authentic African dishes",
      category: "Flours & Grains",
      price: 18.99,
      image: "/lovable-uploads/859ab634-b5b1-479c-8b09-5eb329e1700e.png"
    }
  ];
  
  // Filter results based on query (case insensitive)
  return results.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) || 
    item.description.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );
};

export const performVoiceSearch = async (audioBlob: Blob): Promise<string> => {
  console.log("Processing voice input...");
  
  // In a real app, this would send the audio to a speech-to-text service
  // For now, we'll simulate a successful transcription after a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return a mock transcription result
  const mockTranscriptions = [
    "jollof rice",
    "shea butter",
    "palm oil",
    "african spices",
    "fufu powder"
  ];
  
  return mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
};
