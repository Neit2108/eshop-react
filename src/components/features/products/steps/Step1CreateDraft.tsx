import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { CreateDraftProductInput, DraftProductResponse, Shop } from '@/types/product.types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Step1Props {
  data: DraftProductResponse;
  shops: Shop[];
  loading: boolean;
  onNext: (data: CreateDraftProductInput) => void;
}

export function Step1CreateDraft({ data, shops, loading, onNext }: Step1Props) {
  const [formData, setFormData] = useState<CreateDraftProductInput>({
    name: data.name || '',
    shopId: 'b059c23f-c595-4167-b9de-71aece84ad6b',
    description: data.description || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if(data){
      setFormData({
        name: data.name,
        shopId: 'b059c23f-c595-4167-b9de-71aece84ad6b',
        description: data.description || '',
      });
      console.log("Step1CreateDraft data:", data);
    }
  }, [data]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập tên sản phẩm';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext(formData);
    }
  };

  return (
    <Card className="animate-in fade-in duration-300">
      <CardHeader>
        <CardTitle>Tạo sản phẩm</CardTitle>
        <CardDescription>
          Bắt đầu bằng cách nhập thông tin cơ bản về sản phẩm
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Tên sản phẩm *</Label>
          <Input
            id="name"
            placeholder="Nhập tên sản phẩm"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="shop">Select Shop *</Label>
          <Select value={formData.shopId} onValueChange={(value) => setFormData({ ...formData, shopId: value })}>
            <SelectTrigger id="shop" className={errors.shopId ? 'border-destructive' : ''}>
              <SelectValue placeholder="Choose a shop" />
            </SelectTrigger>
            <SelectContent>
              {shops.map((shop) => (
                <SelectItem key={shop.id} value={shop.id}>
                  {shop.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.shopId && <p className="text-sm text-destructive">{errors.shopId}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Mô tả</Label>
          <Textarea
            id="description"
            placeholder="Nhập mô tả sản phẩm (tùy chọn)"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" disabled={loading}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Đang tạo...' : 'Tiếp theo'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}