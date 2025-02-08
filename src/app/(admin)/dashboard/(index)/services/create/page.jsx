'use client'

import { useState, useEffect } from "react";
import { Plus, X, Upload } from "lucide-react";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../../components/ui/card";
import { Input } from "../../../../../../components/ui/input";
import { Button } from "../../../../../../components/ui/button";
import { Textarea } from "../../../../../../components/ui/textarea";
import { Label } from "../../../../../../components/ui/label";
import { Checkbox } from "../../../../../../components/ui/checkbox";
import DashboardLayout from "../../dashboardLayout";

const CreateService = () => {
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    benefits: [],
    image: []
  });

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/benefits");
      const data = await response.json();
      setBenefits(data.data);
    } catch (error) {
      console.error("Error fetching benefits:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // Convert price and duration to numbers
    if (name === "price" || name === "duration") {
      processedValue = Number(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleBenefitChange = (benefitId) => {
    setFormData(prev => {
      const currentBenefits = prev.benefits;
      if (currentBenefits.includes(benefitId)) {
        return {
          ...prev,
          benefits: currentBenefits.filter(id => id !== benefitId)
        };
      } else {
        return {
          ...prev,
          benefits: [...currentBenefits, benefitId]
        };
      }
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Update file list for form submission
    setSelectedImages(prev => [...prev, ...files]);
    
    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formDataToSend = new FormData();
      
      // Append basic fields
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("duration", formData.duration);
      formDataToSend.append("benefits", formData.benefits.join(","));
      
      // Append images
      selectedImages.forEach(image => {
        formDataToSend.append("image", image);
      });
  
      const response = await fetch("http://localhost:4000/api/services", {
        method: "POST",
        body: formDataToSend,
      });
  
      const data = await response.json();
  
      if (data.success) {
        // Success alert
        await Swal.fire({
          title: 'Success!',
          text: 'Service created successfully',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#4F46E5', // Warna indigo-600
        });
  
        // Reset form
        setFormData({
          name: "",
          description: "",
          price: "",
          duration: "",
          benefits: [],
          image: []
        });
        setSelectedImages([]);
        setPreviewImages([]);
  
        // Redirect to services page
        router.push('/dashboard/services');
  
      } else {
        // Error alert
        Swal.fire({
          title: 'Error!',
          text: data.message || 'Failed to create service. Please check the form data.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#4F46E5',
        });
      }
    } catch (error) {
      console.error("Error creating service:", error);
      // Error alert for exceptions
      Swal.fire({
        title: 'Error!',
        text: 'Error creating service. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#4F46E5',
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <DashboardLayout>
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Service</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter service name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Enter service description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (Rp)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  placeholder="Enter price"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (Hours)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  min="1"
                  placeholder="Enter duration"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Benefits</Label>
              <div className="grid grid-cols-1 gap-2 border rounded-lg p-4">
                {benefits.map((benefit) => (
                  <div key={benefit._id} className="flex items-start space-x-2">
                    <Checkbox
                      id={benefit._id}
                      checked={formData.benefits.includes(benefit._id)}
                      onCheckedChange={() => handleBenefitChange(benefit._id)}
                    />
                    <Label htmlFor={benefit._id} className="text-sm leading-tight">
                      {benefit.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Images</Label>
              <div className="border rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {previewImages.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center w-full">
                  <label className="w-full flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Click to upload images</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </div>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Service
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </DashboardLayout>
  );
};

export default CreateService;