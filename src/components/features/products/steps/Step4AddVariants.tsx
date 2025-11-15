// import  { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { X, Plus } from 'lucide-react';
// import type { AddProductVariantsInput, CreateProductVariantInput, ProductVariantsResponse, ProductOptionsResponse } from '@/types/product.types';
// import { formatCurrency } from '@/lib/utils';

// interface Step4Props {
//   data: ProductVariantsResponse;
//   options: ProductOptionsResponse;
//   loading: boolean;
//   onBack: () => void;
//   onNext: (data: AddProductVariantsInput) => void;
// }

// export function Step4AddVariants({ data, options, loading, onBack, onNext }: Step4Props) {
//   const [variants, setVariants] = useState<CreateProductVariantInput[]>(data.variants);
//   const [newVariant, setNewVariant] = useState<CreateProductVariantInput>({
//     name: '',
//     value: '',
//     price: 0,
//     currency: 'USD',
//     description: '',
//     optionCombination: {},
//   });

//   const addVariant = () => {
//     if (newVariant.name.trim() && newVariant.price > 0) {
//       setVariants([...variants, { ...newVariant }]);
//       setNewVariant({
//         name: '',
//         value: '',
//         price: 0,
//         currency: 'USD',
//         description: '',
//         optionCombination: {},
//       });
//     }
//   };

//   const removeVariant = (index: number) => {
//     setVariants(variants.filter((_, i) => i !== index));
//   };

//   const handleNext = () => {
//     onNext({ variants });
//   };

//   return (
//     <Card className="animate-in fade-in duration-300">
//       <CardHeader>
//         <CardTitle>Thêm lựa chọn cho sản phẩm</CardTitle>
//         <CardDescription>
//           Tạo các lựa chọn khác nhau với giá cả và mô tả
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         {/* Add new variant */}
//         <div className="border rounded-lg p-4 bg-muted/30">
//           <h3 className="font-semibold mb-4">Thêm lựa chọn</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="variant-name" className="text-sm">
//                 Tên lựa chọn
//               </Label>
//               <Input
//                 id="variant-name"
//                 placeholder="Ví dụ: Áo 1"
//                 value={newVariant.name}
//                 onChange={(e) => setNewVariant({ ...newVariant, name: e.target.value })}
//               />
//             </div>
//             <div>
//               <Label htmlFor="variant-value" className="text-sm">
//                 Giá trị
//               </Label>
//               <Input
//                 id="variant-value"
//                 placeholder="Ví dụ: Đỏ - M"
//                 value={newVariant.value}
//                 onChange={(e) => setNewVariant({ ...newVariant, value: e.target.value })}
//               />
//             </div>
//             <div>
//               <Label htmlFor="variant-price" className="text-sm">
//                 Giá
//               </Label>
//               <Input
//                 id="variant-price"
//                 type="number"
//                 placeholder="0.00"
//                 value={newVariant.price}
//                 onChange={(e) => setNewVariant({ ...newVariant, price: parseFloat(e.target.value) || 0 })}
//               />
//             </div>
//           </div>
          
//           <div className="mt-4">
//             <Label htmlFor="variant-description" className="text-sm">
//               Mô tả
//             </Label>
//             <Textarea
//               id="variant-description"
//               placeholder="Mô tả lựa chọn (tùy chọn)"
//               value={newVariant.description}
//               onChange={(e) => setNewVariant({ ...newVariant, description: e.target.value })}
//               rows={2}
//             />
//           </div>
//           <Button onClick={addVariant} size="sm" className="w-full mt-4">
//             <Plus className="w-4 h-4 mr-2" />
//             Thêm lựa chọn
//           </Button>
//         </div>

//         {/* Display variants */}
//         <div className="space-y-3">
//           {variants.map((variant, index) => (
//             <div key={index} className="border rounded-lg p-4 bg-card">
//               <div className="flex items-start justify-between mb-2">
//                 <div>
//                   <h4 className="font-semibold">{variant.name}</h4>
//                   <p className="text-sm text-muted-foreground">{variant.value}</p>
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => removeVariant(index)}
//                 >
//                   <X className="w-4 h-4" />
//                 </Button>
//               </div>
//               <div className="grid grid-cols-2 gap-2 text-sm">
//                 <div>
//                   <span className="text-muted-foreground">Giá:</span>
//                   <p className="font-semibold">
//                     {formatCurrency(variant.price)}
//                   </p>
//                 </div>
//                 {variant.description && (
//                   <div>
//                     <span className="text-muted-foreground">Mô tả:</span>
//                     <p className="text-sm">{variant.description}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-end gap-3 pt-4">
//           {/* <Button variant="outline" onClick={onBack} disabled={loading}>
//             Back
//           </Button> */}
//           <Button className='cursor-pointer' onClick={handleNext} disabled={loading}>
//             {loading ? 'Đang lưu...' : 'Tiếp theo'}
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import  { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus, Upload, Image as ImageIcon } from 'lucide-react';
import type { AddProductVariantsInput, CreateProductVariantInput, ProductVariantsResponse, ProductOptionsResponse } from '@/types/product.types';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

interface Step4Props {
  data: ProductVariantsResponse;
  options: ProductOptionsResponse;
  loading: boolean;
  onBack: () => void;
  onNext: (data: AddProductVariantsInput) => void;
}

export function Step4AddVariants({ data, options, loading, onBack, onNext }: Step4Props) {
  const [variants, setVariants] = useState<CreateProductVariantInput[]>(data.variants);
  const [newVariant, setNewVariant] = useState<CreateProductVariantInput>({
    name: '',
    value: '',
    price: 0,
    currency: 'VNĐ',
    description: '',
    optionCombination: {},
    imageUrls: [], // Thêm mảng ảnh
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageData = event.target?.result as string;
          setNewVariant((prev) => ({
            ...prev,
            imageUrls: [...(prev.imageUrls || []), imageData],
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (imageIndex: number) => {
    setNewVariant((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls?.filter((_, i) => i !== imageIndex) || [],
    }));
  };

  const removeVariantImage = (variantIndex: number, imageIndex: number) => {
    const updatedVariants = [...variants];
    if (updatedVariants[variantIndex].imageUrls) {
      updatedVariants[variantIndex].imageUrls = updatedVariants[variantIndex].imageUrls?.filter(
        (_, i) => i !== imageIndex
      ) || [];
    }
    setVariants(updatedVariants);
  };

  const addVariant = () => {
    if (newVariant.name.trim() && newVariant.price > 0) {
      setVariants([...variants, { ...newVariant }]);
      setNewVariant({
        name: '',
        value: '',
        price: 0,
        currency: 'VNĐ',
        description: '',
        optionCombination: {},
        imageUrls: [],
      });
    }
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    onNext({ variants });
  };

  return (
    <Card className="animate-in fade-in duration-300">
      <CardHeader>
        <CardTitle>Thêm lựa chọn cho sản phẩm</CardTitle>
        <CardDescription>
          Tạo các lựa chọn khác nhau với giá cả, mô tả và ảnh
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add new variant */}
        <div className="border rounded-lg p-4 bg-muted/30">
          <h3 className="font-semibold mb-4">Thêm lựa chọn</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="variant-name" className="text-sm">
                Tên lựa chọn
              </Label>
              <Input
                id="variant-name"
                placeholder="Ví dụ: Áo 1"
                value={newVariant.name}
                onChange={(e) => setNewVariant({ ...newVariant, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="variant-value" className="text-sm">
                Giá trị
              </Label>
              <Input
                id="variant-value"
                placeholder="Ví dụ: Đỏ - M"
                value={newVariant.value}
                onChange={(e) => setNewVariant({ ...newVariant, value: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="variant-price" className="text-sm">
                Giá
              </Label>
              <Input
                id="variant-price"
                type="number"
                placeholder="0.00"
                value={newVariant.price}
                onChange={(e) => setNewVariant({ ...newVariant, price: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="variant-description" className="text-sm">
              Mô tả
            </Label>
            <Textarea
              id="variant-description"
              placeholder="Mô tả lựa chọn (tùy chọn)"
              value={newVariant.description}
              onChange={(e) => setNewVariant({ ...newVariant, description: e.target.value })}
              rows={2}
            />
          </div>

          {/* Image Upload Section */}
          <div className="mt-4">
            <Label className="text-sm mb-2 block">
              Ảnh lựa chọn
            </Label>
            <div className="border-2 border-dashed rounded-lg p-4 bg-background hover:bg-muted/50 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="variant-images"
              />
              <label htmlFor="variant-images" className="flex flex-col items-center justify-center cursor-pointer">
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  Nhấp để upload ảnh hoặc kéo thả ảnh vào đây
                </span>
              </label>
            </div>

            {/* Display uploaded images */}
            {newVariant.imageUrls && newVariant.imageUrls.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {newVariant.imageUrls.map((image, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={image}
                      alt={`Variant preview ${idx + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button onClick={addVariant} size="sm" className="w-full mt-4">
            <Plus className="w-4 h-4 mr-2" />
            Thêm lựa chọn
          </Button>
        </div>

        {/* Display variants */}
        <div className="space-y-3">
          {variants.map((variant, index) => (
            <div key={index} className="border rounded-lg p-4 bg-card">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold">{variant.name}</h4>
                  <p className="text-sm text-muted-foreground">{variant.value}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeVariant(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <span className="text-muted-foreground">Giá:</span>
                  <p className="font-semibold">
                    {formatCurrency(variant.price)}
                  </p>
                </div>
                {variant.description && (
                  <div>
                    <span className="text-muted-foreground">Mô tả:</span>
                    <p className="text-sm">{variant.description}</p>
                  </div>
                )}
              </div>

              {/* Display variant images */}
              {variant.imageUrls && variant.imageUrls.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Ảnh:</p>
                  <div className="grid grid-cols-4 gap-2">
                    {variant.imageUrls.map((image, imgIdx) => (
                      <div key={imgIdx} className="relative group">
                        <img
                          src={image}
                          alt={`Variant ${index} image ${imgIdx + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                        <button
                          onClick={() => removeVariantImage(index, imgIdx)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          {/* <Button variant="outline" onClick={onBack} disabled={loading}>
            Back
          </Button> */}
          <Button className='cursor-pointer' onClick={handleNext} disabled={loading}>
            {loading ? 'Đang lưu...' : 'Tiếp theo'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}