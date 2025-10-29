import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { ProductState } from './CreateProductPage';
import { toast } from 'sonner';

interface Step2Props {
  data: Partial<ProductState>;
  onUpdate: (updates: Partial<ProductState>) => void;
  onNext: () => void;
  onBack: () => void;
}

// Mock categories data
const mockCategories = [
  { id: 'cat-1', name: 'Thời trang nam', description: 'Quần áo và phụ kiện nam' },
  { id: 'cat-2', name: 'Thời trang nữ', description: 'Quần áo và phụ kiện nữ' },
  { id: 'cat-3', name: 'Điện tử', description: 'Thiết bị điện tử và công nghệ' },
  { id: 'cat-4', name: 'Gia dụng', description: 'Đồ dùng gia đình' },
  { id: 'cat-5', name: 'Thể thao', description: 'Dụng cụ và trang phục thể thao' },
  { id: 'cat-6', name: 'Sách', description: 'Sách và văn phòng phẩm' },
];

const Step2AddCategory: React.FC<Step2Props> = ({ data, onUpdate, onNext, onBack }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    data.categoryIds || []
  );
  const [loading, setLoading] = useState(false);
  
  const handleToggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async () => {
    if (selectedCategories.length === 0) {
        toast.error('Vui lòng chọn ít nhất một danh mục');
      return;
    }

    setLoading(true);

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 600));

    onUpdate({
      categoryIds: selectedCategories,
    });

    toast.success(`Đã thêm ${selectedCategories.length} danh mục`);
    setLoading(false);
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chọn danh mục sản phẩm</CardTitle>
        <CardDescription>
          Chọn một hoặc nhiều danh mục phù hợp với sản phẩm của bạn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockCategories.map((category) => (
              <div
                key={category.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedCategories.includes(category.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleToggleCategory(category.id)}
              >
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleToggleCategory(category.id)}
                  />
                  <div className="flex-1">
                    <Label className="font-medium cursor-pointer">
                      {category.name}
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedCategories.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Đã chọn {selectedCategories.length} danh mục
              </p>
            </div>
          )}

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

export default Step2AddCategory;