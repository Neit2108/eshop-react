import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Trash2, Star, Image as ImageIcon } from 'lucide-react';
import type { ProductState } from './CreateProductPage';
import { toast } from 'sonner';

interface Step5Props {
  data: Partial<ProductState>;
  onUpdate: (updates: Partial<ProductState>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface ImageItem {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
  description: string;
}

const Step5AddImages: React.FC<Step5Props> = ({ data, onUpdate, onNext, onBack }) => {
  const [images, setImages] = useState<ImageItem[]>(() => {
    if (data.images && data.images.length > 0) {
      return data.images.map((img, idx) => ({
        id: `img-${idx}`,
        imageUrl: img.imageUrl,
        isPrimary: img.isPrimary || false,
        sortOrder: img.sortOrder || idx,
        description: img.description || '',
      }));
    }
    return [];
  });
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage: ImageItem = {
          id: `img-${Date.now()}-${Math.random()}`,
          imageUrl: event.target?.result as string,
          isPrimary: images.length === 0,
          sortOrder: images.length,
          description: '',
        };
        setImages((prev) => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
  };

  const addImageByUrl = () => {
    const url = prompt('Nhập URL hình ảnh:');
    if (!url) return;

    const newImage: ImageItem = {
      id: `img-${Date.now()}`,
      imageUrl: url,
      isPrimary: images.length === 0,
      sortOrder: images.length,
      description: '',
    };
    setImages([...images, newImage]);
  };

  const removeImage = (imageId: string) => {
    const removedImage = images.find((img) => img.id === imageId);
    const newImages = images.filter((img) => img.id !== imageId);
    
    // If removed image was primary, set first image as primary
    if (removedImage?.isPrimary && newImages.length > 0) {
      newImages[0].isPrimary = true;
    }
    
    setImages(newImages);
  };

  const setPrimaryImage = (imageId: string) => {
    setImages(
      images.map((img) => ({
        ...img,
        isPrimary: img.id === imageId,
      }))
    );
  };

  const updateDescription = (imageId: string, description: string) => {
    setImages(
      images.map((img) =>
        img.id === imageId ? { ...img, description } : img
      )
    );
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      toast.error('Bạn chưa thêm hình ảnh nào');
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    onUpdate({
      images: images.map((img) => ({
        imageUrl: img.imageUrl,
        isPrimary: img.isPrimary,
        sortOrder: img.sortOrder,
        description: img.description,
      })),
    });

    toast.success(`Đã thêm ${images.length} hình ảnh`);

    setLoading(false);
    onNext();
  };

  const handleSkip = () => {
    onUpdate({ images: [] });
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thêm hình ảnh sản phẩm</CardTitle>
        <CardDescription>
          Upload hoặc thêm URL hình ảnh cho sản phẩm của bạn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Upload Section */}
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Kéo thả hình ảnh vào đây hoặc click để chọn
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
            </label>
            <Button
              type="button"
              variant="outline"
              onClick={addImageByUrl}
              className="mt-4"
            >
              Hoặc thêm URL
            </Button>
          </div>

          {/* Images Grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className={`relative border-2 rounded-lg overflow-hidden ${
                    image.isPrimary ? 'border-yellow-500' : 'border-gray-200'
                  }`}
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    {image.imageUrl.startsWith('data:') || image.imageUrl.startsWith('http') ? (
                      <img
                        src={image.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  
                  {image.isPrimary && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Ảnh chính
                    </div>
                  )}

                  <div className="absolute top-2 right-2 flex gap-1">
                    {!image.isPrimary && (
                      <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8"
                        onClick={() => setPrimaryImage(image.id)}
                        title="Đặt làm ảnh chính"
                      >
                        <Star className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="h-8 w-8"
                      onClick={() => removeImage(image.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="p-2">
                    <Input
                      placeholder="Mô tả hình ảnh (tùy chọn)"
                      value={image.description}
                      onChange={(e) =>
                        updateDescription(image.id, e.target.value)
                      }
                      className="text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {images.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <ImageIcon className="w-16 h-16 mx-auto mb-2 opacity-50" />
              <p>Chưa có hình ảnh nào</p>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Quay lại
            </Button>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={handleSkip}
              >
                Bỏ qua
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Đang xử lý...' : 'Tiếp tục'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step5AddImages;