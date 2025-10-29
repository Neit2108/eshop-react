import  { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus } from 'lucide-react';
import type { AddProductVariantsInput, CreateProductVariantInput, CreateProductOptionInput } from '@/types/product.types';

interface Step4Props {
  data: AddProductVariantsInput;
  options: CreateProductOptionInput[];
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
    currency: 'USD',
    description: '',
    optionCombination: {},
  });

  const addVariant = () => {
    if (newVariant.name.trim() && newVariant.price > 0) {
      setVariants([...variants, { ...newVariant }]);
      setNewVariant({
        name: '',
        value: '',
        price: 0,
        currency: 'USD',
        description: '',
        optionCombination: {},
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
        <CardTitle>Add Product Variants</CardTitle>
        <CardDescription>
          Create different variants with pricing and descriptions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add new variant */}
        <div className="border rounded-lg p-4 bg-muted/30">
          <h3 className="font-semibold mb-4">Add New Variant</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="variant-name" className="text-sm">
                Variant Name
              </Label>
              <Input
                id="variant-name"
                placeholder="e.g., Red - Large"
                value={newVariant.name}
                onChange={(e) => setNewVariant({ ...newVariant, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="variant-value" className="text-sm">
                Value
              </Label>
              <Input
                id="variant-value"
                placeholder="e.g., SKU-001"
                value={newVariant.value}
                onChange={(e) => setNewVariant({ ...newVariant, value: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="variant-price" className="text-sm">
                Price
              </Label>
              <Input
                id="variant-price"
                type="number"
                placeholder="0.00"
                value={newVariant.price}
                onChange={(e) => setNewVariant({ ...newVariant, price: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="variant-currency" className="text-sm">
                Currency
              </Label>
              <Input
                id="variant-currency"
                placeholder="USD"
                value={newVariant.currency}
                onChange={(e) => setNewVariant({ ...newVariant, currency: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="variant-description" className="text-sm">
              Description
            </Label>
            <Textarea
              id="variant-description"
              placeholder="Variant description (optional)"
              value={newVariant.description}
              onChange={(e) => setNewVariant({ ...newVariant, description: e.target.value })}
              rows={2}
            />
          </div>
          <Button onClick={addVariant} size="sm" className="w-full mt-4">
            <Plus className="w-4 h-4 mr-2" />
            Add Variant
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
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Price:</span>
                  <p className="font-semibold">
                    {variant.price} {variant.currency}
                  </p>
                </div>
                {variant.description && (
                  <div>
                    <span className="text-muted-foreground">Description:</span>
                    <p className="text-sm">{variant.description}</p>
                  </div>
                )}
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