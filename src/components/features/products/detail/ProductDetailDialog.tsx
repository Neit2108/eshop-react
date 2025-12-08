import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive" | "draft";
  image: string;
  description?: string;
  variants?: ProductVariant[];
}

interface ProductDetailDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockVariants: ProductVariant[] = [
  {
    id: "v1",
    name: "Black - 64GB",
    sku: "WHP-001-BK-64",
    price: 199.99,
    stock: 25,
  },
  {
    id: "v2",
    name: "Silver - 64GB",
    sku: "WHP-001-SL-64",
    price: 199.99,
    stock: 20,
  },
  {
    id: "v3",
    name: "Black - 128GB",
    sku: "WHP-001-BK-128",
    price: 249.99,
    stock: 0,
  },
  {
    id: "v4",
    name: "Silver - 128GB",
    sku: "WHP-001-SL-128",
    price: 249.99,
    stock: 15,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-red-100 text-red-800";
    case "draft":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
};

export function ProductDetailDialog({
  product,
  open,
  onOpenChange,
}: ProductDetailDialogProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        style={{ scrollbarWidth: "none" }}
        className="max-h-[90vh] max-w-2xl overflow-y-auto"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
          <DialogDescription>{product.sku}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Header with Image */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-64 w-full rounded-lg border border-slate-200 object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-4 md:col-span-2">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {product.name}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {product.category}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-1 text-xs font-medium text-slate-600">SKU</p>
                  <p className="text-sm font-medium text-slate-900">
                    {product.sku}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-slate-600">
                    Price
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-slate-600">
                    Stock
                  </p>
                  <span
                    className={cn(
                      "inline-block rounded px-3 py-1 text-sm font-medium",
                      product.stock === 0
                        ? "bg-red-100 text-red-800"
                        : product.stock < 20
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800",
                    )}
                  >
                    {product.stock} units
                  </span>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-slate-600">
                    Status
                  </p>
                  <Badge className={getStatusColor(product.status)}>
                    {product.status}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-slate-600">
                  Description
                </p>
                <p className="text-sm text-slate-700">
                  {product.description ||
                    "High-quality product with premium features and excellent durability. Perfect for professional use."}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs for Additional Info */}
          <Tabs defaultValue="variants" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-100">
              <TabsTrigger value="variants">Variants</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>

            {/* Variants Tab */}
            <TabsContent value="variants" className="space-y-4">
              <div className="mb-4 text-sm text-slate-600">
                <p>Total variants: {mockVariants.length}</p>
              </div>
              <div className="space-y-3">
                {mockVariants.map((variant) => (
                  <Card key={variant.id} className="border-slate-200">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">
                            {variant.name}
                          </p>
                          <p className="text-sm text-slate-600">
                            {variant.sku}
                          </p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-sm font-semibold text-slate-900">
                              ${variant.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-right">
                            <span
                              className={cn(
                                "inline-block rounded px-2 py-1 text-xs font-medium",
                                variant.stock === 0
                                  ? "bg-red-100 text-red-800"
                                  : variant.stock < 20
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800",
                              )}
                            >
                              {variant.stock} units
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-slate-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Weight</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-slate-900">250g</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Dimensions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-900">20x15x10 cm</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Material</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-900">Premium Aluminum</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Warranty</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-900">2 Years</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Shipping Tab */}
            <TabsContent value="shipping" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-slate-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Shipping Weight</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-slate-900">300g</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Shipping Class</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-900">Standard</p>
                  </CardContent>
                </Card>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-700">
                  Free shipping on orders over $50. Standard delivery takes 3-5
                  business days.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-slate-200"
            >
              Close
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Edit Product
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
