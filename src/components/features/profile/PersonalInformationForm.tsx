import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Upload } from "lucide-react"
import type { User } from "@/types"

// props
interface PersonalInformationFormProps {
  user: User
}

export function PersonalInformationForm({ user }: PersonalInformationFormProps) {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    birthday: "",
    address: "",
  })

  // Load user data when component mounts or user changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        birthday: user.birthday || "",
        address: user.address || "",
      })
    }
  }, [user])

  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const handleChangePicture = () => {
    const fileInput = document.createElement("input") as HTMLInputElement
    fileInput.type = "file"
    fileInput.accept = "image/*"
    fileInput.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        console.log(file.name)
      }
    }
    fileInput.click()
    console.log(fileInput.files)
  }

  return (
    <div className="space-y-6">
      {/* Avatar Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ảnh đại diện</CardTitle>
          <CardDescription>Tải lên ảnh đại diện để cá nhân hóa tài khoản của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=John"} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="gap-2 bg-transparent" onClick={handleChangePicture}>
              <Upload className="h-4 w-4" />
              Thay đổi ảnh đại diện
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Personal Information Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Thông tin cá nhân</CardTitle>
          <CardDescription>Cập nhật thông tin cá nhân của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Row 1: First Name and Last Name */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Tên</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Nhập tên của bạn"
                  className="border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Họ</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Nhập họ của bạn"
                  className="border-border"
                />
              </div>
            </div>

            {/* Row 2: Birthday and Address */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="birthday">Ngày sinh</Label>
                <Input
                  id="birthday"
                  name="birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={handleChange}
                  className="border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ của bạn"
                  className="border-border"
                />
              </div>
            </div>

            {/* Row 3: Email and Phone */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Nhập email của bạn"
                  className="border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Số điện thoại</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại của bạn"
                  className="border-border"
                />
              </div>
            </div>

            <Button onClick={handleSave} disabled={isSaving} className="w-full gap-2">
              {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
