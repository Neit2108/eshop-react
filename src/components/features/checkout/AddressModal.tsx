import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/useAuth"
import { MapPin } from "lucide-react"

interface AddressModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: AddressFormData) => void
  initialData?: AddressFormData
  title?: string
}

export interface AddressFormData {
  name: string
  phone: string
  address: string
}

export function AddressModal({
  open,
  onOpenChange,
  onSave,
  initialData,
  title = "Thêm địa chỉ",
}: AddressModalProps) {
  const { user } = useAuth()
  const [formData, setFormData] = useState<AddressFormData>({
    name: "",
    phone: "",
    address: "",
  })
  const [activeTab, setActiveTab] = useState<"manual" | "map">("manual")
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else if (user) {
      // Khởi tạo từ thông tin user
      setFormData({
        name: `${user.firstName} ${user.lastName}`.trim(),
        phone: "",
        address: "",
      })
    } else {
      setFormData({ name: "", phone: "", address: "" })
    }
    setErrors({})
    setActiveTab("manual")
  }, [initialData, open, user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Xóa lỗi khi user bắt đầu nhập
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) {
      newErrors.name = "Vui lòng nhập họ tên"
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại"
    } else {
      const phoneRegex = /^(\+84|0)[0-9]{9,10}$/
      const cleanPhone = formData.phone.replace(/\s/g, "")
      if (!phoneRegex.test(cleanPhone)) {
        newErrors.phone = "Số điện thoại không hợp lệ (VD: 0901234567 hoặc +84901234567)"
      }
    }

    if (!formData.address?.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ giao hàng"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData)
      onOpenChange(false)
    }
  }

  const handleMapSelect = () => {
    // Khi chọn từ map, có thể mở Google Maps hoặc dùng Geolocation API
    // Tạm thời hiển thị placeholder
    const mockAddress = "123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh"
    setFormData((prev) => ({ ...prev, address: mockAddress }))
    setActiveTab("manual")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "manual" | "map")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Nhập thủ công</TabsTrigger>
            <TabsTrigger value="map">Chọn từ bản đồ</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên</Label>
              <Input
                id="name"
                name="name"
                placeholder="Nguyễn Văn A"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="0901234567 hoặc +84901234567"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Địa chỉ giao hàng</Label>
              <Input
                id="address"
                name="address"
                placeholder="VD: 123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-4 py-4">
            <div className="rounded-lg bg-gray-100 h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-medium mb-2">Chọn địa chỉ từ bản đồ</p>
                <p className="text-sm text-gray-500 mb-4">
                  Nhấp vào bản đồ hoặc tìm kiếm địa chỉ bạn muốn
                </p>
                <Button onClick={handleMapSelect} size="sm">
                  Chọn vị trí hiện tại
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              💡 Chức năng bản đồ sẽ sử dụng Google Maps hoặc tọa độ GPS của bạn
            </p>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={handleSave}>Lưu địa chỉ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
