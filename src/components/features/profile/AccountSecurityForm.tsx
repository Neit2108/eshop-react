import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { apiService } from "@/services/apiService"
import type { ChangePasswordInput } from "@/types"
import { toast } from "sonner"

export function AccountSecurityForm() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError(null)
    setSuccessMessage(null)
  }

  const handleSavePassword = async () => {
    try {
      // Validation
      if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        setError("Vui lòng điền đầy đủ tất cả các trường")
        return
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setError("Mật khẩu mới và xác nhận mật khẩu không khớp")
        return
      }

      if (passwordData.newPassword.length < 6) {
        setError("Mật khẩu mới phải có ít nhất 6 ký tự")
        return
      }

      setIsSaving(true)

      const payload: ChangePasswordInput = {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }

      const response = await apiService.post("/auth/change-password", payload)

      if (response.success) {
        toast.success(successMessage)
      } else {
        toast.error(error)
      }
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Có lỗi xảy ra khi cập nhật mật khẩu"
      toast.error(errorMessage)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cập nhật mật khẩu</CardTitle>
          <CardDescription>Cập nhật mật khẩu của bạn để giữ cho tài khoản của bạn an toàn</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handleChange}
                placeholder="Nhập mật khẩu hiện tại"
                className="border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handleChange}
                placeholder="Nhập mật khẩu mới"
                className="border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handleChange}
                placeholder="Xác nhận mật khẩu mới"
                className="border-border"
              />
            </div>

            <Button onClick={handleSavePassword} disabled={isSaving} className="w-full">
              {isSaving ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Separator />

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Two-Factor Authentication</CardTitle>
          <CardDescription>Thêm một lớp bảo mật thêm vào tài khoản của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Xác thực hai yếu tố hiện tại <span className="font-medium text-foreground">đã bị vô hiệu hóa</span>
            </p>
            <Button variant="outline" className="w-full bg-transparent">
              Kích hoạt Xác thực hai yếu tố
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
