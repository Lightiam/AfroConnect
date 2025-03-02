
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
      image: "https://source.unsplash.com/random/100x100/?oil"
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
