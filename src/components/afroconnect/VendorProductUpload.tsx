
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { APIService } from "@/services/APIService";

interface ProductFormData {
  name: string;
  price: string;
  description: string;
  category: string;
  country: string;
  quantity: string;
}

const VendorProductUpload: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>();
  
  const categories = [
    { id: "spices", name: "Spices" },
    { id: "crayfish", name: "Crayfishes" },
    { id: "kuli-kuli", name: "Kuli-kuli" },
    { id: "beans", name: "Beans" },
    { id: "koko-yam", name: "Koko-Yam" },
    { id: "plantain", name: "Plantain" },
    { id: "amala", name: "Amala Powder" },
    { id: "tiger-nuts", name: "Tiger Nuts" },
    { id: "acha", name: "Acha" },
    { id: "kilishi", name: "Kilishi" },
  ];
  
  const countries = [
    "Nigeria", "Ghana", "Kenya", "Cameroon", "Mali", "Senegal", "Ethiopia", "South Africa", "Tanzania", "Other"
  ];
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = async (data: ProductFormData) => {
    if (!selectedImage) {
      toast({
        title: "Image Required",
        description: "Please upload a product image",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // In a real app, this would use the API service to upload both data and image
      // For now we'll simulate the API call
      
      const formData = {
        ...data,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity)
      };
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Product Added",
        description: `${data.name} has been successfully added to your store.`,
      });
      
      // Reset form
      reset();
      setSelectedImage(null);
      setImagePreview(null);
      
    } catch (error) {
      console.error("Error uploading product:", error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Add New Product</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Image Upload */}
        <div className="space-y-2">
          <Label htmlFor="product-image">Product Image</Label>
          <div className="flex items-center space-x-4">
            <div 
              className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden relative"
            >
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Product preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <i className="ti ti-upload text-xl" aria-hidden="true" />
                  <span className="text-xs mt-1">Upload</span>
                </div>
              )}
              <input
                id="product-image"
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">
                Upload a high-quality image of your product
              </p>
              <p className="text-xs text-gray-400">
                JPG, PNG or WEBP, max 5MB
              </p>
            </div>
          </div>
        </div>
        
        {/* Product Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            placeholder="e.g. Premium Jollof Rice Spice Mix"
            {...register("name", { required: "Product name is required" })}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>
        
        {/* Price */}
        <div className="space-y-2">
          <Label htmlFor="price">Price (USD)</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">$</span>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              className="pl-7"
              placeholder="0.00"
              {...register("price", { 
                required: "Price is required",
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: "Please enter a valid price"
                }
              })}
            />
          </div>
          {errors.price && (
            <p className="text-xs text-red-500">{errors.price.message}</p>
          )}
        </div>
        
        {/* Category and Country - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select defaultValue="" onValueChange={(value) => register("category").onChange({ target: { value } })}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-xs text-red-500">{errors.category.message}</p>
            )}
          </div>
          
          {/* Country of Origin */}
          <div className="space-y-2">
            <Label htmlFor="country">Country of Origin</Label>
            <Select defaultValue="" onValueChange={(value) => register("country").onChange({ target: { value } })}>
              <SelectTrigger id="country">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-xs text-red-500">{errors.country.message}</p>
            )}
          </div>
        </div>
        
        {/* Quantity */}
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity Available</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            placeholder="e.g. 50"
            {...register("quantity", { 
              required: "Quantity is required",
              min: {
                value: 1,
                message: "Quantity must be at least 1"
              }
            })}
          />
          {errors.quantity && (
            <p className="text-xs text-red-500">{errors.quantity.message}</p>
          )}
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Product Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your product in detail..."
            rows={4}
            {...register("description", { 
              required: "Product description is required",
              minLength: {
                value: 20,
                message: "Description should be at least 20 characters"
              }
            })}
          />
          {errors.description && (
            <p className="text-xs text-red-500">{errors.description.message}</p>
          )}
        </div>
        
        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full bg-[#355E3B] hover:bg-[#2E5133] text-white"
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <i className="ti ti-loader animate-spin mr-2" aria-hidden="true" />
              Uploading...
            </>
          ) : (
            <>
              <i className="ti ti-plus mr-2" aria-hidden="true" />
              Add Product
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default VendorProductUpload;
