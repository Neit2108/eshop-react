import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, ImageIcon, Star, Trash2 } from "lucide-react";
import type {
  AddProductImagesInput,
  AddProductImageInput,
  ProductImagesResponse,
} from "@/types/product.types";

interface Step5Props {
  data: ProductImagesResponse;
  loading: boolean;
  onBack: () => void;
  onNext: (data: AddProductImagesInput) => void;
}

export function Step5AddImages({ data, loading, onBack, onNext }: Step5Props) {
  const [images, setImages] = useState<AddProductImageInput[]>(data.images);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageDescription, setNewImageDescription] = useState("");

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
      setNewImageUrl("");
      setNewImageDescription("");
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    // Ensure at least one primary image
    if (
      updatedImages.length > 0 &&
      !updatedImages.some((img) => img.isPrimary)
    ) {
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

  const updateDescription = (index: number, description: string) => {
    const updatedImages = images.map((img, i) =>
      i === index ? { ...img, description } : img,
    );
    setImages(updatedImages);
  };

  const handleNext = () => {
    onNext({ images });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const isPrimary = images.length === 0; // First image is primary by default
          setImages([
            ...images,
            {
              imageUrl: reader.result as string,
              isPrimary,
              sortOrder: images.length,
              description: newImageDescription,
            },
          ]);
          setNewImageUrl("");
          setNewImageDescription("");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="animate-in fade-in duration-300">
      <CardHeader>
        <CardTitle>Thêm hình ảnh sản phẩm</CardTitle>
        <CardDescription>
          Tải lên hình ảnh và chọn hình ảnh chính
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add new image */}
        <div className="bg-muted/30 rounded-lg border p-4">
          <h3 className="mb-4 font-semibold">Thêm hình ảnh mới</h3>
          <div className="space-y-3">
            {/* File Upload Option */}
            <div>
              <Label htmlFor="image-file" className="text-sm mb-2 block">
                Tải lên hình ảnh từ máy tính
              </Label>
              <div className="relative">
                <input
                  id="image-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e)}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => document.getElementById('image-file')?.click()}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Chọn tệp hình ảnh
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-muted/30 px-2 text-gray-500">Hoặc</span>
              </div>
            </div>

            {/* URL Input Option */}
            <div>
              <Label htmlFor="image-url" className="text-sm">
                URL hình ảnh
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
                Mô tả (tùy chọn)
              </Label>
              <Input
                id="image-description"
                placeholder="Mô tả hình ảnh (tùy chọn)"
                value={newImageDescription}
                onChange={(e) => setNewImageDescription(e.target.value)}
              />
            </div>
            <Button onClick={addImage} size="sm" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Thêm hình ảnh
            </Button>
          </div>
        </div>

        {/* Images Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-lg border-2 ${
                  image.isPrimary ? "border-yellow-500" : "border-gray-200"
                }`}
              >
                <div className="flex aspect-square items-center justify-center bg-gray-100">
                  {image.imageUrl.startsWith("data:") ||
                  image.imageUrl.startsWith("http") ? (
                    <img
                      src={image.imageUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  )}
                </div>

                {image.isPrimary && (
                  <div className="absolute top-2 left-2 flex items-center gap-1 rounded bg-yellow-500 px-2 py-1 text-xs font-medium text-white">
                    <Star className="h-3 w-3" />
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
                      onClick={() => setPrimaryImage(index)}
                      title="Đặt làm ảnh chính"
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="h-8 w-8"
                    onClick={() => removeImage(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="p-2">
                  <Input
                    placeholder="Mô tả hình ảnh (tùy chọn)"
                    value={image.description}
                    onChange={(e) => updateDescription(index, e.target.value)}
                    className="text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {images.length === 0 && (
          <div className="py-8 text-center text-gray-400">
            <ImageIcon className="mx-auto mb-2 h-16 w-16 opacity-50" />
            <p>Chưa có hình ảnh nào</p>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
              {/* <Button variant="outline" onClick={onBack} disabled={loading}>
                Back
              </Button> */}
          <Button className='cursor-pointer' onClick={handleNext} disabled={loading}>
            {loading ? "Đang lưu..." : "Tiếp theo"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
