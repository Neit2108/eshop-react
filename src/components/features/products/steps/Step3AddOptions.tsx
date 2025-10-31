import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Plus } from 'lucide-react';
import type { AddProductOptionsInput, CreateProductOptionInput, ProductOptionsResponse } from '@/types/product.types';
import { toast } from 'sonner';

interface Step3Props {
  data: ProductOptionsResponse;
  loading: boolean;
  onBack: () => void;
  onNext: (data: AddProductOptionsInput) => void;
}

export function Step3AddOptions({ data, loading, onBack, onNext }: Step3Props) {
  const [options, setOptions] = useState<CreateProductOptionInput[]>(data.options);
  const [newOptionName, setNewOptionName] = useState('');
  const [newOptionValue, setNewOptionValue] = useState('');
  const [editingOptionIndex, setEditingOptionIndex] = useState<number | null>(null);

  const addOption = () => {
    if (newOptionName.trim()) {
      setOptions([
        ...options,
        {
          name: newOptionName,
          values: newOptionValue.trim() ? [{ value: newOptionValue, sortOrder: 0 }] : [],
        },
      ]);
      setNewOptionName('');
      setNewOptionValue('');
    }
  };

  const addValueToOption = (optionIndex: number, value: string) => {
    if (value.trim()) {
      const updatedOptions = [...options];
      updatedOptions[optionIndex].values.push({
        value: value.trim(),
        sortOrder: updatedOptions[optionIndex].values.length,
      });
      setOptions(updatedOptions);
    }
  };

  const removeValue = (optionIndex: number, valueIndex: number) => {
    const updatedOptions = [...options];
    updatedOptions[optionIndex].values.splice(valueIndex, 1);
    setOptions(updatedOptions);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    onNext({ options });
    toast.success('Thêm tùy chọn thành công');
  };

  return (
    <Card className="animate-in fade-in duration-300">
      <CardHeader>
        <CardTitle>Add Product Options</CardTitle>
        <CardDescription>
          Define product options like Color, Size, etc.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add new option */}
        <div className="border rounded-lg p-4 bg-muted/30">
          <h3 className="font-semibold mb-4">Add New Option</h3>
          <div className="space-y-3">
            <div>
              <Label htmlFor="option-name" className="text-sm">
                Option Name (e.g., Color, Size)
              </Label>
              <Input
                id="option-name"
                placeholder="Enter option name"
                value={newOptionName}
                onChange={(e) => setNewOptionName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="option-value" className="text-sm">
                First Value (optional)
              </Label>
              <Input
                id="option-value"
                placeholder="Enter first value"
                value={newOptionValue}
                onChange={(e) => setNewOptionValue(e.target.value)}
              />
            </div>
            <Button onClick={addOption} size="sm" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Option
            </Button>
          </div>
        </div>

        {/* Display options */}
        <div className="space-y-4">
          {options.map((option, optionIndex) => (
            <div key={optionIndex} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">{option.name}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOption(optionIndex)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {option.values.map((val, valIndex) => (
                  <div key={valIndex} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                    <span className="text-sm">{val.value}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeValue(optionIndex, valIndex)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2 pt-2">
                  <Input
                    placeholder="Add value"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addValueToOption(optionIndex, e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    size={1}
                  />
                </div>
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