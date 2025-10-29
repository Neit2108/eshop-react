import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ProductState } from './CreateProductPage';
import { toast } from 'sonner';

interface Step1Props {
  data: Partial<ProductState>;
  onUpdate: (updates: Partial<ProductState>) => void;
  onNext: () => void;
}

// Mock shops data
const mockShops = [
  { id: 'shop-1', name: 'Cửa hàng chính' },
  { id: 'shop-2', name: 'Chi nhánh Hà Nội' },
  { id: 'shop-3', name: 'Chi nhánh HCM' },
];

const Step1CreateDraft: React.FC<Step1Props> = ({ data, onUpdate, onNext }) => {
  const [name, setName] = useState(data.name || '');
  const [description, setDescription] = useState(data.description || '');
  const [shopId, setShopId] = useState(data.shopId || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Vui lòng nhập tên sản phẩm');
      return;
    }

    if (!shopId) {
     toast.error('Vui lòng chọn cửa hàng');
      return;
    }

    setLoading(true);

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const productId = `prod-${Date.now()}`;

    onUpdate({
      productId,
      name,
      description,
      shopId,
    });

    toast.success('Bản nháp sản phẩm đã được tạo');
    setLoading(false);
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tạo sản phẩm mới</CardTitle>
        <CardDescription>
          Nhập thông tin cơ bản cho sản phẩm của bạn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              Tên sản phẩm <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Nhập tên sản phẩm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shopId">
              Cửa hàng <span className="text-red-500">*</span>
            </Label>
            <Select value={shopId} onValueChange={setShopId} required>
              <SelectTrigger>
                <SelectValue placeholder="Chọn cửa hàng" />
              </SelectTrigger>
              <SelectContent>
                {mockShops.map((shop) => (
                  <SelectItem key={shop.id} value={shop.id}>
                    {shop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả sản phẩm</Label>
            <Textarea
              id="description"
              placeholder="Nhập mô tả chi tiết về sản phẩm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Tiếp tục'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Step1CreateDraft;