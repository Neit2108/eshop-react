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
  completed?: boolean;
  onBack: () => void;
  onFinish: (status: string) => void;
}

export function Step6Publish({ productId, loading, completed, onBack, onFinish }: Step6Props) {
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED" | "ARCHIVED" | "OUT_OF_STOCK" | "DISCONTINUED">('PUBLISHED');

  const handleBack = () => {
    onBack();
  };

  const handleFinish = async () => {
    onFinish(status);
  };

  if (completed) {
    return (
      <Card className="animate-in fade-in duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Sản phẩm đã được tạo thành công
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Sản phẩm của bạn đã được tạo và hiện đang {status}.
            </AlertDescription>
          </Alert>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">ID sản phẩm</p>
            <p className="font-mono font-semibold break-all">{productId}</p>
          </div>
          <Button className="w-full" onClick={() => window.location.href = '/products'}>
            Đi đến Sản phẩm
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-in fade-in duration-300">
      <CardHeader>
        <CardTitle>Đăng bán sản phẩm</CardTitle>
        <CardDescription>
          Chọn trạng thái cho sản phẩm của bạn
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="status">Trạng thái sản phẩm *</Label>
          <Select value={status} onValueChange={(value: any) => setStatus(value)}>
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DRAFT">Nháp</SelectItem>
              <SelectItem value="PUBLISHED">Công khai</SelectItem>
              <SelectItem value="ARCHIVED">Lưu trữ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {status === 'PUBLISHED'
              ? 'Sản phẩm của bạn sẽ được hiển thị cho khách hàng.'
              : status === 'DRAFT'
              ? 'Sản phẩm của bạn sẽ vẫn ở chế độ nháp.'
              : 'Sản phẩm của bạn sẽ được lưu trữ và ẩn khỏi khách hàng.'}
          </AlertDescription>
        </Alert>

        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">ID sản phẩm</p>
          <p className="font-mono font-semibold break-all">{productId}</p>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" hidden={true} onClick={handleBack} disabled={loading}>
            Back
          </Button>
          <Button className='cursor-pointer' onClick={handleFinish} disabled={loading}>
            {loading ? 'Đang đăng...' : 'Hoàn tất'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}