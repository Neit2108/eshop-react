import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, X } from 'lucide-react';
import type { ProductState } from './CreateProductPage';
import { toast } from 'sonner';

interface Step3Props {
  data: Partial<ProductState>;
  onUpdate: (updates: Partial<ProductState>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface Option {
  id: string;
  name: string;
  values: Array<{ id: string; value: string; sortOrder?: number }>;
}

const Step3AddOptions: React.FC<Step3Props> = ({ data, onUpdate, onNext, onBack }) => {
  const [options, setOptions] = useState<Option[]>(() => {
    if (data.options && data.options.length > 0) {
      return data.options.map((opt, idx) => ({
        id: `opt-${idx}`,
        name: opt.name,
        values: opt.values.map((val, vidx) => ({
          id: `val-${idx}-${vidx}`,
          value: val.value,
          sortOrder: val.sortOrder,
        })),
      }));
    }
    return [];
  });
  const [loading, setLoading] = useState(false);

  const addOption = () => {
    const newOption: Option = {
      id: `opt-${Date.now()}`,
      name: '',
      values: [{ id: `val-${Date.now()}`, value: '' }],
    };
    setOptions([...options, newOption]);
  };

  const removeOption = (optionId: string) => {
    setOptions(options.filter((opt) => opt.id !== optionId));
  };

  const updateOptionName = (optionId: string, name: string) => {
    setOptions(
      options.map((opt) =>
        opt.id === optionId ? { ...opt, name } : opt
      )
    );
  };

  const addValue = (optionId: string) => {
    setOptions(
      options.map((opt) =>
        opt.id === optionId
          ? {
              ...opt,
              values: [
                ...opt.values,
                { id: `val-${Date.now()}`, value: '' },
              ],
            }
          : opt
      )
    );
  };

  const removeValue = (optionId: string, valueId: string) => {
    setOptions(
      options.map((opt) =>
        opt.id === optionId
          ? {
              ...opt,
              values: opt.values.filter((val) => val.id !== valueId),
            }
          : opt
      )
    );
  };

  const updateValue = (optionId: string, valueId: string, value: string) => {
    setOptions(
      options.map((opt) =>
        opt.id === optionId
          ? {
              ...opt,
              values: opt.values.map((val) =>
                val.id === valueId ? { ...val, value } : val
              ),
            }
          : opt
      )
    );
  };

  const handleSubmit = async () => {
    // Validate
    for (const option of options) {
      if (!option.name.trim()) {
        toast.error('Vui lòng nhập tên cho tất cả các tùy chọn');
        return;
      }
      if (option.values.length === 0 || option.values.some((v) => !v.value.trim())) {
        toast.error('Mỗi tùy chọn phải có ít nhất một giá trị');

        return;
      }
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    onUpdate({
      options: options.map((opt) => ({
        name: opt.name,
        values: opt.values.map((val, idx) => ({
          value: val.value,
          sortOrder: idx,
        })),
      })),
    });

    toast.success('Tùy chọn sản phẩm đã được cập nhật.');

    setLoading(false);
    onNext();
  };

  const handleSkip = () => {
    onUpdate({ options: [] });
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thêm tùy chọn sản phẩm</CardTitle>
        <CardDescription>
          Thêm các tùy chọn như màu sắc, kích thước, chất liệu... (có thể bỏ qua)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {options.map((option) => (
            <div key={option.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <Label>Tên tùy chọn</Label>
                  <Input
                    placeholder="VD: Màu sắc, Kích thước..."
                    value={option.name}
                    onChange={(e) => updateOptionName(option.id, e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOption(option.id)}
                  className="mt-6"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Giá trị</Label>
                {option.values.map((value) => (
                  <div key={value.id} className="flex gap-2">
                    <Input
                      placeholder="Nhập giá trị..."
                      value={value.value}
                      onChange={(e) =>
                        updateValue(option.id, value.id, e.target.value)
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeValue(option.id, value.id)}
                      disabled={option.values.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addValue(option.id)}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm giá trị
                </Button>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addOption}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm tùy chọn mới
          </Button>

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
              <Button onClick={handleSubmit} disabled={loading || options.length === 0}>
                {loading ? 'Đang xử lý...' : 'Tiếp tục'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step3AddOptions;