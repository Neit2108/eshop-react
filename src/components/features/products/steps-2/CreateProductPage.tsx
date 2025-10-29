import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Step1CreateDraft from './Step1CreateDraft';
import Step2AddCategory from './Step2AddCategory';
import Step3AddOptions from './Step3AddOptions';
import Step4AddVariants from './Step4AddVariants';
import Step5AddImages from './Step5AddImage';
import Step6UpdateStatus from './Step6UpdateStatus';
import { toast } from 'sonner';

export interface ProductState {
  productId: string;
  name: string;
  shopId: string;
  description?: string;
  categoryIds: string[];
  options: Array<{
    name: string;
    values: Array<{ value: string; sortOrder?: number }>;
  }>;
  variants: Array<{
    name: string;
    value: string;
    price: number;
    currency?: string;
    description?: string;
    optionCombination?: Record<string, string>;
  }>;
  images: Array<{
    imageUrl: string;
    isPrimary?: boolean;
    sortOrder?: number;
    description?: string;
  }>;
  status: 'draft' | 'published' | 'archived';
}

const steps = [
  { id: 1, name: 'Sản phẩm', description: 'Thông tin' },
  { id: 2, name: 'Danh mục', description: 'Chọn danh mục' },
  { id: 3, name: 'Tùy chọn', description: 'Màu sắc, kích thước...' },
  { id: 4, name: 'Biến thể', description: 'Giá và tồn kho' },
  { id: 5, name: 'Hình ảnh', description: 'Upload ảnh' },
  { id: 6, name: 'Hoàn tất', description: 'Trạng thái sản phẩm' },
];

const CreateProductPage2: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [productState, setProductState] = useState<Partial<ProductState>>({
    categoryIds: [],
    options: [],
    variants: [],
    images: [],
  });

  const updateProductState = (updates: Partial<ProductState>) => {
    setProductState((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    toast.success('Sản phẩm đã được tạo thành công.');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1CreateDraft
            data={productState}
            onUpdate={updateProductState}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <Step2AddCategory
            data={productState}
            onUpdate={updateProductState}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <Step3AddOptions
            data={productState}
            onUpdate={updateProductState}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <Step4AddVariants
            data={productState}
            onUpdate={updateProductState}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <Step5AddImages
            data={productState}
            onUpdate={updateProductState}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <Step6UpdateStatus
            data={productState}
            onUpdate={updateProductState}
            onComplete={handleComplete}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Step Progress Bar */}
        <Card className="mb-8 p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center flex-1">
                  <div className="flex items-center justify-center w-full">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                        currentStep > step.id
                          ? 'bg-green-500 border-green-500 text-white'
                          : currentStep === step.id
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <span className="font-semibold">{step.id}</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <div
                      className={`text-sm font-medium ${
                        currentStep >= step.id
                          ? 'text-gray-900'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.name}
                    </div>
                    {/* <div className="text-xs text-gray-500">
                      {step.description}
                    </div> */}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </Card>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CreateProductPage2;