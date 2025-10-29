import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle2, FileText, Archive, Eye } from 'lucide-react';
import type { ProductState } from './CreateProductPage';
import { toast } from 'sonner';

interface Step6Props {
  data: Partial<ProductState>;
  onUpdate: (updates: Partial<ProductState>) => void;
  onComplete: () => void;
  onBack: () => void;
}

const statusOptions = [
  {
    value: 'draft',
    label: 'Bản nháp',
    description: 'Sản phẩm sẽ được lưu dưới dạng nháp, chưa hiển thị công khai',
    icon: FileText,
    color: 'text-gray-500',
  },
  {
    value: 'published',
    label: 'Xuất bản',
    description: 'Sản phẩm sẽ được hiển thị công khai trên cửa hàng',
    icon: Eye,
    color: 'text-green-500',
  },
  {
    value: 'archived',
    label: 'Lưu trữ',
    description: 'Sản phẩm sẽ bị ẩn khỏi cửa hàng nhưng vẫn được lưu trữ',
    icon: Archive,
    color: 'text-orange-500',
  },
];

const Step6UpdateStatus: React.FC<Step6Props> = ({
  data,
  onUpdate,
  onComplete,
  onBack,
}) => {
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>(
    data.status || 'draft'
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onUpdate({ status });

    toast.success('Trạng thái sản phẩm đã được cập nhật');
    setLoading(false);
    onComplete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hoàn tất tạo sản phẩm</CardTitle>
        <CardDescription>
          Chọn trạng thái cho sản phẩm của bạn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Tóm tắt sản phẩm
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Tên sản phẩm:</span>
                <span className="font-medium">{data.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Danh mục:</span>
                <span className="font-medium">
                  {data.categoryIds?.length || 0} danh mục
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tùy chọn:</span>
                <span className="font-medium">
                  {data.options?.length || 0} tùy chọn
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Biến thể:</span>
                <span className="font-medium">
                  {data.variants?.length || 0} biến thể
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hình ảnh:</span>
                <span className="font-medium">
                  {data.images?.length || 0} hình ảnh
                </span>
              </div>
            </div>
          </div>

          {/* Status Selection */}
          <div className="space-y-4">
            <Label className="text-base">Chọn trạng thái sản phẩm</Label>
            <RadioGroup
              value={status}
              onValueChange={(value: any) => setStatus(value)}
              className="space-y-3"
            >
              {statusOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div
                    key={option.value}
                    className={`flex items-start space-x-3 border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      status === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setStatus(option.value as any)}
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-5 h-5 ${option.color}`} />
                        <Label
                          htmlFor={option.value}
                          className="font-medium cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {option.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Quay lại
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Hoàn tất'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step6UpdateStatus;