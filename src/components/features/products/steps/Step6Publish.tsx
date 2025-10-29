import  { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Step6Props {
  productId: string;
  loading: boolean;
  onBack: () => void;
  onFinish: (status: string) => void;
}

export function Step6Publish({ productId, loading, onBack, onFinish }: Step6Props) {
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('published');
  const [completed, setCompleted] = useState(false);

  const handleFinish = async () => {
    onFinish(status);
    setCompleted(true);
  };

  if (completed) {
    return (
      <Card className="animate-in fade-in duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Product Created Successfully
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Your product has been created and is now {status}.
            </AlertDescription>
          </Alert>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Product ID</p>
            <p className="font-mono font-semibold break-all">{productId}</p>
          </div>
          <Button className="w-full" onClick={() => window.location.href = '/products'}>
            Go to Products
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-in fade-in duration-300">
      <CardHeader>
        <CardTitle>Publish Product</CardTitle>
        <CardDescription>
          Choose the status for your product
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="status">Product Status *</Label>
          <Select value={status} onValueChange={(value: any) => setStatus(value)}>
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {status === 'published'
              ? 'Your product will be visible to customers.'
              : status === 'draft'
              ? 'Your product will remain in draft mode.'
              : 'Your product will be archived and hidden from customers.'}
          </AlertDescription>
        </Alert>

        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">Product ID</p>
          <p className="font-mono font-semibold break-all">{productId}</p>
        </div>

        <div className="flex justify-between gap-3 pt-4">
          <Button variant="outline" onClick={onBack} disabled={loading}>
            Back
          </Button>
          <Button onClick={handleFinish} disabled={loading}>
            {loading ? 'Publishing...' : 'Finish'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}