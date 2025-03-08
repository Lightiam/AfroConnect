
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
  
  // Return a mock transcription result related to African food ingredients
  const mockTranscriptions = [
    "african spices",
    "crayfish",
    "kali-kuli",
    "beans",
    "koko-yam"
  ];
  
  return mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
};
