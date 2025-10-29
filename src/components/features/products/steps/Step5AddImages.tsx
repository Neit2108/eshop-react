import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Plus } from 'lucide-react';
import type { AddProductImagesInput, AddProductImageInput } from '@/types/product.types';

interface Step5Props {
  data: AddProductImagesInput;
  loading: boolean;
  onBack: () => void;
  onNext: (data: AddProductImagesInput) => void;
}

export function Step5AddImages({ data, loading, onBack, onNext }: Step5Props) {
  const [images, setImages] = useState<AddProductImageInput[]>(data.images);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageDescription, setNewImageDescription] = useState('');

  const addImage = () => {
    if (newImageUrl.trim()) {
      const isPrimary = images.length === 0; // First image is primary by default
      setImages([
        ...images,
        {
          imageUrl: newImageUrl,
          isPrimary,
          sortOrder: images.length,
          description: newImageDescription,
        },
      ]);
      setNewImageUrl('');
      setNewImageDescription('');
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    // Ensure at least one primary image
    if (updatedImages.length > 0 && !updatedImages.some((img) => img.isPrimary)) {
      updatedImages[0].isPrimary = true;
    }
    setImages(updatedImages);
  };

  const setPrimaryImage = (index: number) => {
    const updatedImages = images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    setImages(updatedImages);
  };

  const handleNext = () => {
    onNext({ images });
  };

  return (
    <Card className="animate-in fade-in duration-300">
      <CardHeader>
        <CardTitle>Add Product Images</CardTitle>
        <CardDescription>
          Upload images and select the primary image
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add new image */}
        <div className="border rounded-lg p-4 bg-muted/30">
          <h3 className="font-semibold mb-4">Add New Image</h3>
          <div className="space-y-3">
            <div>
              <Label htmlFor="image-url" className="text-sm">
                Image URL
              </Label>
              <Input
                id="image-url"
                placeholder="https://example.com/image.jpg"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="image-description" className="text-sm">
                Description (optional)
              </Label>
              <Input
                id="image-description"
                placeholder="Image description"
                value={newImageDescription}
                onChange={(e) => setNewImageDescription(e.target.value)}
              />
            </div>
            <Button onClick={addImage} size="sm" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Image
            </Button>
          </div>
        </div>

        {/* Display images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div key={index} className="border rounded-lg overflow-hidden bg-card">
              <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                <img
                  src={image.imageUrl || "/placeholder.svg"}
                  alt={image.description || `Product image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg?height=200&width=200';
                  }}
                />
              </div>
              <div className="p-3 space-y-2">
                {image.description && (
                  <p className="text-sm text-muted-foreground">{image.description}</p>
                )}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`primary-${index}`}
                    checked={image.isPrimary || false}
                    onCheckedChange={() => setPrimaryImage(index)}
                  />
                  <Label htmlFor={`primary-${index}`} className="text-sm cursor-pointer">
                    Primary Image
                  </Label>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeImage(index)}
                  className="w-full"
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-3 pt-4">
          <Button variant="outline" onClick={onBack} disabled={loading}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={loading}>
            {loading ? 'Saving...' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}