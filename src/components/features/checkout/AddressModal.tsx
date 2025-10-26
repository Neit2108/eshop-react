import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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

export function AddressModal({ open, onOpenChange, onSave, initialData, title = "Thêm địa chỉ" }: AddressModalProps) {
  const [formData, setFormData] = useState<AddressFormData>({
    name: "",
    phone: "",
    address: "",
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({ name: "", phone: "", address: "" })
    }
  }, [initialData, open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (formData.name && formData.phone && formData.address) {
      onSave(formData)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Họ và tên</Label>
            <Input id="name" name="name" placeholder="Nguyen Van A" value={formData.name} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ</Label>
            <Input
              id="address"
              name="address"
              placeholder="123 Main St, City, State 12345"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Lưu địa chỉ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
