import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import type { ProductState } from './CreateProductPage';
import { toast } from 'sonner';

interface Step4Props {
  data: Partial<ProductState>;
  onUpdate: (updates: Partial<ProductState>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface Variant {
  id: string;
  name: string;
  value: string;
  price: number;
  currency: string;
  description: string;
  optionCombination: Record<string, string>;
}

const currencies = ['VND', 'USD', 'EUR'];

const Step4AddVariants: React.FC<Step4Props> = ({ data, onUpdate, onNext, onBack }) => {
  const [variants, setVariants] = useState<Variant[]>(() => {
    if (data.variants && data.variants.length > 0) {
      return data.variants.map((v, idx) => ({
        id: `var-${idx}`,
        name: v.name,
        value: v.value,
        price: v.price,
        currency: v.currency || 'VND',
        description: v.description || '',
        optionCombination: v.optionCombination || {},
      }));
    }
    return [
      {
        id: `var-${Date.now()}`,
        name: '',
        value: '',
        price: 0,
        currency: 'VND',
        description: '',
        optionCombination: {},
      },
    ];
  });
  const [loading, setLoading] = useState(false);

  const options = data.options || [];

  const addVariant = () => {
    const newVariant: Variant = {
      id: `var-${Date.now()}`,
      name: '',
      value: '',
      price: 0,
      currency: 'VND',
      description: '',
      optionCombination: {},
    };
    setVariants([...variants, newVariant]);
  };

  const removeVariant = (variantId: string) => {
    if (variants.length === 1) {
      toast.error('Phải có ít nhất một biến thể');
      return;
    }
    setVariants(variants.filter((v) => v.id !== variantId));
  };

  const updateVariant = (variantId: string, field: keyof Variant, value: any) => {
    setVariants(
      variants.map((v) =>
        v.id === variantId ? { ...v, [field]: value } : v
      )
    );
  };

  const updateOptionCombination = (
    variantId: string,
    optionName: string,
    optionValue: string
  ) => {
    setVariants(
      variants.map((v) =>
        v.id === variantId
          ? {
              ...v,
              optionCombination: {
                ...v.optionCombination,
                [optionName]: optionValue,
              },
            }
          : v
      )
    );
  };

  const handleSubmit = async () => {
    // Validate
    for (const variant of variants) {
      if (!variant.name.trim() || !variant.value.trim()) {
        toast.error('Vui lòng nhập đầy đủ tên và giá trị cho tất cả biến thể');
        return;
      }
      if (variant.price <= 0) {
        toast.error('Giá sản phẩm phải lớn hơn 0');     

        return;
      }
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    onUpdate({
      variants: variants.map((v) => ({
        name: v.name,
        value: v.value,
        price: v.price,
        currency: v.currency,
        description: v.description,
        optionCombination: v.optionCombination,
      })),
    });

    toast.success(`Đã thêm ${variants.length} biến thể`);

    setLoading(false);
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thêm biến thể sản phẩm</CardTitle>
        <CardDescription>
          Nhập thông tin chi tiết về giá và tùy chọn cho từng biến thể
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {variants.map((variant, index) => (
            <div key={variant.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Biến thể {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeVariant(variant.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tên biến thể *</Label>
                  <Input
                    placeholder="VD: iPhone 15 Pro Max"
                    value={variant.name}
                    onChange={(e) =>
                      updateVariant(variant.id, 'name', e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Giá trị *</Label>
                  <Input
                    placeholder="VD: 256GB"
                    value={variant.value}
                    onChange={(e) =>
                      updateVariant(variant.id, 'value', e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Giá *</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={variant.price}
                    onChange={(e) =>
                      updateVariant(variant.id, 'price', Number(e.target.value))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Đơn vị tiền tệ</Label>
                  <Select
                    value={variant.currency}
                    onValueChange={(value) =>
                      updateVariant(variant.id, 'currency', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {options.length > 0 && (
                <div className="space-y-2">
                  <Label>Tổ hợp tùy chọn</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {options.map((option) => (
                      <div key={option.name} className="space-y-2">
                        <Label className="text-sm">{option.name}</Label>
                        <Select
                          value={variant.optionCombination[option.name] || ''}
                          onValueChange={(value) =>
                            updateOptionCombination(variant.id, option.name, value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={`Chọn ${option.name}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {option.values.map((val) => (
                              <SelectItem key={val.value} value={val.value}>
                                {val.value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Mô tả</Label>
                <Textarea
                  placeholder="Mô tả chi tiết về biến thể này"
                  value={variant.description}
                  onChange={(e) =>
                    updateVariant(variant.id, 'description', e.target.value)
                  }
                  rows={3}
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addVariant}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm biến thể mới
          </Button>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Quay lại
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Tiếp tục'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step4AddVariants;