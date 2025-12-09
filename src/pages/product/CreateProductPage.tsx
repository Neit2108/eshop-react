// import { useReducer, useEffect, useState } from "react";
// import { ProgressBar } from "@/components/features/products/steps/ProgressBar";
// import { Step1CreateDraft } from "@/components/features/products/steps/Step1CreateDraft";
// import { Step2AddCategories } from "@/components/features/products/steps/Step2AddCategories";
// import { Step3AddOptions } from "@/components/features/products/steps/Step3AddOptions";
// import { Step4AddVariants } from "@/components/features/products/steps/Step4AddVariants";
// import { Step5AddImages } from "@/components/features/products/steps/Step5AddImages";
// import { Step6Publish } from "@/components/features/products/steps/Step6Publish";
// import type { ProductWizardState, Shop, Category } from "@/types/product.types";
// import { mockApi } from "@/components/features/products/steps/mockApi";
// import { toast } from "sonner";
// import { motion, AnimatePresence } from "framer-motion";

// const STEPS = [
//   "Create Draft",
//   "Categories",
//   "Options",
//   "Variants",
//   "Images",
//   "Publish",
// ];

// type WizardAction =
//   | { type: "SET_STEP"; payload: number }
//   | { type: "SET_LOADING"; payload: boolean }
//   | { type: "SET_ERROR"; payload: string | null }
//   | { type: "UPDATE_DRAFT"; payload: any }
//   | { type: "UPDATE_CATEGORIES"; payload: any }
//   | { type: "UPDATE_OPTIONS"; payload: any }
//   | { type: "UPDATE_VARIANTS"; payload: any }
//   | { type: "UPDATE_IMAGES"; payload: any }
//   | { type: "SET_PRODUCT_ID"; payload: string }
//   | { type: "SET_STATUS"; payload: string };

// const initialState: ProductWizardState = {
//   productId: null,
//   step: 0,
//   draft: { name: "", shopId: "", description: "" },
//   categories: { categoryIds: [] },
//   options: { options: [] },
//   variants: { variants: [] },
//   images: { images: [] },
//   status: "draft",
//   loading: false,
//   error: null,
// };

// function wizardReducer(
//   state: ProductWizardState,
//   action: WizardAction,
// ): ProductWizardState {
//   switch (action.type) {
//     case "SET_STEP":
//       return { ...state, step: action.payload };
//     case "SET_LOADING":
//       return { ...state, loading: action.payload };
//     case "SET_ERROR":
//       return { ...state, error: action.payload };
//     case "UPDATE_DRAFT":
//       return { ...state, draft: action.payload };
//     case "UPDATE_CATEGORIES":
//       return { ...state, categories: action.payload };
//     case "UPDATE_OPTIONS":
//       return { ...state, options: action.payload };
//     case "UPDATE_VARIANTS":
//       return { ...state, variants: action.payload };
//     case "UPDATE_IMAGES":
//       return { ...state, images: action.payload };
//     case "SET_PRODUCT_ID":
//       return { ...state, productId: action.payload };
//     case "SET_STATUS":
//       return { ...state, status: action.payload };
//     default:
//       return state;
//   }
// }

// export default function CreateProductPage() {
//   const [state, dispatch] = useReducer(wizardReducer, initialState);
//   const [shops, setShops] = useState<Shop[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);

//   // Load mock data
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const [shopsData, categoriesData] = await Promise.all([
//           mockApi.getShops(),
//           mockApi.getCategories(),
//         ]);
//         setShops(shopsData);
//         setCategories(categoriesData);
//       } catch {
//         dispatch({ type: "SET_ERROR", payload: "Failed to load data" });
//       }
//     };
//     loadData();
//   }, []);

//   const handleStep1Next = async (data: any) => {
//     dispatch({ type: "SET_LOADING", payload: true });
//     try {
//       const result = await mockApi.createDraftProduct(data);
//       dispatch({ type: "UPDATE_DRAFT", payload: data });
//       dispatch({ type: "SET_PRODUCT_ID", payload: result.productId });
//       dispatch({ type: "SET_STEP", payload: 1 });
//       toast.success("Draft product created successfully");
//     } catch {
//       dispatch({ type: "SET_ERROR", payload: "Failed to create draft" });
//       toast.error("Failed to create draft product");
//     } finally {
//       dispatch({ type: "SET_LOADING", payload: false });
//     }
//   };

//   const handleStep2Next = async (data: any) => {
//     dispatch({ type: "SET_LOADING", payload: true });
//     try {
//       await mockApi.addCategories(state.productId!, data);
//       dispatch({ type: "UPDATE_CATEGORIES", payload: data });
//       dispatch({ type: "SET_STEP", payload: 2 });
//       toast.success("Categories added successfully");
//     } catch {
//       toast.error("Failed to add categories");
//     } finally {
//       dispatch({ type: "SET_LOADING", payload: false });
//     }
//   };

//   const handleStep3Next = async (data: any) => {
//     dispatch({ type: "SET_LOADING", payload: true });
//     try {
//       await mockApi.addOptions(state.productId!, data);
//       dispatch({ type: "UPDATE_OPTIONS", payload: data });
//       dispatch({ type: "SET_STEP", payload: 3 });
//       toast.success("Options added successfully");
//     } catch {
//       toast.error("Failed to add options");
//     } finally {
//       dispatch({ type: "SET_LOADING", payload: false });
//     }
//   };

//   const handleStep4Next = async (data: any) => {
//     dispatch({ type: "SET_LOADING", payload: true });
//     try {
//       await mockApi.addVariants(state.productId!, data);
//       dispatch({ type: "UPDATE_VARIANTS", payload: data });
//       dispatch({ type: "SET_STEP", payload: 4 });
//       toast.success("Variants added successfully");
//     } catch {
//       toast.error("Failed to add variants");
//     } finally {
//       dispatch({ type: "SET_LOADING", payload: false });
//     }
//   };

//   const handleStep5Next = async (data: any) => {
//     dispatch({ type: "SET_LOADING", payload: true });
//     try {
//       await mockApi.addImages(state.productId!, data);
//       dispatch({ type: "UPDATE_IMAGES", payload: data });
//       dispatch({ type: "SET_STEP", payload: 5 });
//       toast.success("Images added successfully");
//     } catch {
//       toast.error("Failed to add images");
//     } finally {
//       dispatch({ type: "SET_LOADING", payload: false });
//     }
//   };

//   const handleStep6Finish = async (status: string) => {
//     dispatch({ type: "SET_LOADING", payload: true });
//     try {
//       await mockApi.updateProductStatus(state.productId!, status);
//       dispatch({ type: "SET_STATUS", payload: status });
//       toast.success(`Product published as ${status}`);
//     } catch {
//       toast.error("Failed to publish product");
//     } finally {
//       dispatch({ type: "SET_LOADING", payload: false });
//     }
//   };

//   const handleBack = () => {
//     dispatch({ type: "SET_STEP", payload: Math.max(0, state.step - 1) });
//   };

//   const renderStep = () => {
//     switch (state.step) {
//       case 0:
//         return (
//           <Step1CreateDraft
//             data={state.draft}
//             shops={shops}
//             loading={state.loading}
//             onNext={handleStep1Next}
//           />
//         );
//       case 1:
//         return (
//           <Step2AddCategories
//             data={state.categories}
//             categories={categories}
//             loading={state.loading}
//             onBack={handleBack}
//             onNext={handleStep2Next}
//           />
//         );
//       case 2:
//         return (
//           <Step3AddOptions
//             data={state.options}
//             loading={state.loading}
//             onBack={handleBack}
//             onNext={handleStep3Next}
//           />
//         );
//       case 3:
//         return (
//           <Step4AddVariants
//             data={state.variants}
//             options={state.options.options}
//             loading={state.loading}
//             onBack={handleBack}
//             onNext={handleStep4Next}
//           />
//         );
//       case 4:
//         return (
//           <Step5AddImages
//             data={state.images}
//             loading={state.loading}
//             onBack={handleBack}
//             onNext={handleStep5Next}
//           />
//         );
//       case 5:
//         return (
//           <Step6Publish
//             productId={state.productId || ""}
//             loading={state.loading}
//             onBack={handleBack}
//             onFinish={handleStep6Finish}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="mx-auto w-full max-w-4xl p-6">
//       <ProgressBar
//         currentStep={state.step}
//         totalSteps={STEPS.length}
//         steps={STEPS}
//       />

//       {state.error && (
//         <div className="bg-destructive/10 border-destructive text-destructive mb-6 rounded-lg border p-4">
//           {state.error}
//         </div>
//       )}

//       {/* {state.step === 0 && (
//           <Step1CreateDraft
//             data={state.draft}
//             shops={shops}
//             loading={state.loading}
//             onNext={handleStep1Next}
//           />
//         )}

//         {state.step === 1 && (
//           <Step2AddCategories
//             data={state.categories}
//             categories={categories}
//             loading={state.loading}
//             onBack={handleBack}
//             onNext={handleStep2Next}
//           />
//         )}

//         {state.step === 2 && (
//           <Step3AddOptions
//             data={state.options}
//             loading={state.loading}
//             onBack={handleBack}
//             onNext={handleStep3Next}
//           />
//         )}

//         {state.step === 3 && (
//           <Step4AddVariants
//             data={state.variants}
//             options={state.options.options}
//             loading={state.loading}
//             onBack={handleBack}
//             onNext={handleStep4Next}
//           />
//         )}

//         {state.step === 4 && (
//           <Step5AddImages
//             data={state.images}
//             loading={state.loading}
//             onBack={handleBack}
//             onNext={handleStep5Next}
//           />
//         )}

//         {state.step === 5 && (
//           <Step6Publish
//             productId={state.productId || ""}
//             loading={state.loading}
//             onBack={handleBack}
//             onFinish={handleStep6Finish}
//           />
//         )} */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={state.step}
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -20 }}
//           transition={{ duration: 0.3 }}
//         >
//           {renderStep()}
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { ProgressBar } from "@/components/features/products/steps/ProgressBar";
import { Step1CreateDraft } from "@/components/features/products/steps/Step1CreateDraft";
import { Step2AddCategories } from "@/components/features/products/steps/Step2AddCategories";
import { Step4AddVariants } from "@/components/features/products/steps/Step4AddVariants";
import { Step5AddImages } from "@/components/features/products/steps/Step5AddImages";
import { Step6Publish } from "@/components/features/products/steps/Step6Publish";
import { motion, AnimatePresence } from "framer-motion";
import { useProductCreation } from "@/hooks/useProductCreation";
import { useCategory } from "@/hooks/useCategory";
import { useAuth } from "@/hooks/useAuth";
import { useShop } from "@/hooks/useShop";
import { toast } from "sonner";

const STEPS = ["Tạo nháp", "Thêm danh mục", "Thêm lựa chọn", "Thêm ảnh", "Đăng bán"];

export default function CreateProductPage() {
  const {
    productId,
    currentStep,
    isLoading,
    error,
    draft,
    categoriesData,
    options,
    variants,
    images,
    goBack,
    setError,
    createDraftProduct,
    addCategories,
    addVariants,
    addImages,
    publishProduct,
  } = useProductCreation();
  const { categories, fetchAllCategories } = useCategory();
  const { hasRoles } = useAuth();
  const { shops } = useShop();

  const [completed, setCompleted] = useState(false);
  const [isAdmin] = useState(hasRoles('admin'));

  // Load data khi component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        fetchAllCategories();
      } catch {
        setError("Failed to load data");
      }
    };
    loadData();
  }, []);

  // Lấy danh sách shop khi user là admin
  useEffect(() => {
    if (isAdmin) {
      // TODO: Implement API call to fetch all shops for admin
      // fetchAllShops();
    }
  }, [isAdmin]);

  const handleStep1Next = async (data: any) => {
    createDraftProduct(data);
  };

  const handleStep2Next = async (data: any) => {
    addCategories(productId!, data);
  };

  const handleStep4Next = async (data: any) => {
    // validate data
    if(data.variants.some((variant: any) => variant.stock < 0)){
      toast.error("Số lượng không được nhỏ hơn 0");
      return;
    }
    if(data.variants.some((variant: any) => variant.price < 0)){
      toast.error("Giá không được nhỏ hơn 0");
      return;
    }
    if(data.variants.some((variant: any) => variant.name.trim() === "")){
      toast.error("Tên lựa chọn không được để trống");
      return;
    }
    if(data.variants.some((variant: any) => variant.value.trim() === "")){
      toast.error("Giá trị lựa chọn không được để trống");
      return;
    }
    addVariants(productId!, data);
  };

  const handleStep5Next = async (data: any) => {
    addImages(productId!, data);
  };

  const handleStep6Finish = async (status: any) => {
    publishProduct(productId!, { status });
    setCompleted(true);
  };

  const handleBack = () => {
    goBack();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1CreateDraft
            data={draft}
            shops={shops || []}
            loading={isLoading}
            onNext={handleStep1Next}
          />
        );
      case 1:
        return (
          <Step2AddCategories
            data={categoriesData}
            categories={categories}
            loading={isLoading}
            onBack={handleBack}
            onNext={handleStep2Next}
          />
        );
      case 2:
        return (
          <Step4AddVariants
            data={variants}
            options={options}
            loading={isLoading}
            onBack={handleBack}
            onNext={handleStep4Next}
          />
        );
      case 3:
        return (
          <Step5AddImages
            data={images}
            loading={isLoading}
            onBack={handleBack}
            onNext={handleStep5Next}
          />
        );
      case 4:
        return (
          <Step6Publish
            completed={completed}
            productId={productId || ""}
            loading={isLoading}
            onBack={handleBack}
            onFinish={handleStep6Finish}
          />
        );
      default:
        return null;
    }
  };

  if(error){
    toast.error(error);
  }

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <ProgressBar
        currentStep={currentStep}
        totalSteps={STEPS.length}
        steps={STEPS}
      />
      
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
  );
}
