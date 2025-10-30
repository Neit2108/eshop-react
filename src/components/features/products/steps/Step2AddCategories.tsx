// import { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Label } from '@/components/ui/label';
// import type { AddProductCategoriesInput, Category } from '@/types/product.types';

// interface Step2Props {
//   data: AddProductCategoriesInput;
//   categories: Category[];
//   loading: boolean;
//   onBack: () => void;
//   onNext: (data: AddProductCategoriesInput) => void;
// }

// export function Step2AddCategories({ data, categories, loading, onBack, onNext }: Step2Props) {
//   const [selectedCategories, setSelectedCategories] = useState<string[]>(data.categoryIds);

//   const toggleCategory = (categoryId: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(categoryId)
//         ? prev.filter((id) => id !== categoryId)
//         : [...prev, categoryId]
//     );
//   };

//   const handleNext = () => {
//     onNext({ categoryIds: selectedCategories });
//   };

//   return (
//     <Card className="animate-in fade-in duration-300">
//       <CardHeader>
//         <CardTitle>Add Categories</CardTitle>
//         <CardDescription>
//           Select one or more categories for your product
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {categories.map((category) => (
//             <div key={category.id} className="flex items-center space-x-2">
//               <Checkbox
//                 id={category.id}
//                 checked={selectedCategories.includes(category.id)}
//                 onCheckedChange={() => toggleCategory(category.id)}
//               />
//               <Label htmlFor={category.id} className="cursor-pointer font-normal">
//                 {category.name}
//               </Label>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-between gap-3 pt-4">
//           <Button variant="outline" onClick={onBack} disabled={loading}>
//             Back
//           </Button>
//           <Button onClick={handleNext} disabled={loading}>
//             {loading ? 'Saving...' : 'Next'}
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { AddProductCategoriesInput, Category, ProductCategoriesResponse } from '@/types/product.types';

interface Step2Props {
  data: ProductCategoriesResponse;
  categories: Category[];
  loading: boolean;
  onBack: () => void;
  onNext: (data: AddProductCategoriesInput) => void;
}

export function Step2AddCategories({ data, categories, loading, onBack, onNext }: Step2Props) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(data.categories.map(cat => cat.id));

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleNext = () => {
    onNext({ categoryIds: selectedCategories });
  };

  return (
    <Card className="animate-in fade-in duration-300">
      <CardHeader>
        <CardTitle>Add Categories</CardTitle>
        <CardDescription>
          Select one or more categories for your product
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <Label htmlFor={category.id} className="cursor-pointer font-normal">
                {category.name}
              </Label>
            </div>
          ))}
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedCategories.includes(category.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => toggleCategory(category.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() => toggleCategory(category.id)}
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