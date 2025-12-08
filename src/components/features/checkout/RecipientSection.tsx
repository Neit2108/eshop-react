import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertTriangle, Plus } from "lucide-react"
import { AddressCard } from "./AddressCard"
import { AddressModal, type AddressFormData } from "./AddressModal"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"

interface Address extends AddressFormData {
  id: string
}

interface RecipientSectionProps {
  onAddressSelect?: (address: Address) => void
}

export function RecipientSection({ onAddressSelect }: RecipientSectionProps) {
  const { user } = useAuth()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)

  // Khởi tạo dữ liệu địa chỉ từ user hiện tại
  useEffect(() => {
    initializeAddresses()
  }, [user])

  // Gọi onAddressSelect khi selectedAddressId thay đổi
  useEffect(() => {
    if (selectedAddressId && isInitializing === false) {
      const selected = addresses.find((addr) => addr.id === selectedAddressId)
      if (selected) {
        onAddressSelect?.(selected)
      }
    }
  }, [selectedAddressId, addresses, onAddressSelect, isInitializing])

  const initializeAddresses = () => {
    if (!user) {
      setAddresses([])
      setSelectedAddressId(null)
      setIsInitializing(false)
      return
    }

    // Lấy địa chỉ từ localStorage nếu có
    const savedAddresses = localStorage.getItem(`addresses_${user.id}`)
    let initialAddresses: Address[] = []

    if (savedAddresses) {
      try {
        initialAddresses = JSON.parse(savedAddresses)
      } catch {
        initialAddresses = []
      }
    } else {
      // Tạo địa chỉ mặc định từ thông tin user
      const defaultAddress: Address = {
        id: "default",
        name: `${user.firstName} ${user.lastName}`.trim(),
        phone: "", // User chưa có số điện thoại, cần nhập
        address: "", // User chưa có địa chỉ, cần nhập
      }
      initialAddresses = [defaultAddress]
    }

    setAddresses(initialAddresses)
    // Chọn địa chỉ đầu tiên
    if (initialAddresses.length > 0) {
      setSelectedAddressId(initialAddresses[0].id)
    }
    setIsInitializing(false)
  }

  const saveAddresses = (updatedAddresses: Address[]) => {
    if (user) {
      localStorage.setItem(`addresses_${user.id}`, JSON.stringify(updatedAddresses))
    }
  }

  const validateAddress = (data: AddressFormData): boolean => {
    if (!data.name?.trim()) {
      toast.error("Vui lòng nhập họ tên")
      return false
    }
    if (!data.phone?.trim()) {
      toast.error("Vui lòng nhập số điện thoại")
      return false
    }
    // Kiểm tra format số điện thoại Việt Nam
    const phoneRegex = /^(\+84|0)[0-9]{9,10}$/
    if (!phoneRegex.test(data.phone.replace(/\s/g, ""))) {
      toast.error("Số điện thoại không hợp lệ (định dạng: +84xxx hoặc 0xxx)")
      return false
    }
    if (!data.address?.trim()) {
      toast.error("Vui lòng nhập địa chỉ giao hàng")
      return false
    }
    return true
  }

  const handleAddAddress = (data: AddressFormData) => {
    if (!validateAddress(data)) {
      return
    }

    const newAddress: Address = {
      id: Date.now().toString(),
      ...data,
    }
    const updatedAddresses = [...addresses, newAddress]
    setAddresses(updatedAddresses)
    saveAddresses(updatedAddresses)
    setSelectedAddressId(newAddress.id)
    setModalOpen(false)
    toast.success("Thêm địa chỉ thành công")
  }

  const handleEditAddress = (data: AddressFormData) => {
    if (!editingId || !validateAddress(data)) {
      return
    }

    const updatedAddresses = addresses.map((addr) =>
      addr.id === editingId ? { ...addr, ...data } : addr
    )
    setAddresses(updatedAddresses)
    saveAddresses(updatedAddresses)
    setEditingId(null)
    setModalOpen(false)
    toast.success("Cập nhật địa chỉ thành công")
  }

  const handleSaveModal = (data: AddressFormData) => {
    if (editingId) {
      handleEditAddress(data)
    } else {
      handleAddAddress(data)
    }
  }

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id)
  }

  const handleDeleteAddress = (id: string) => {
    if (addresses.length === 1) {
      toast.error("Phải có ít nhất một địa chỉ giao hàng")
      return
    }

    const updatedAddresses = addresses.filter((addr) => addr.id !== id)
    setAddresses(updatedAddresses)
    saveAddresses(updatedAddresses)

    if (selectedAddressId === id) {
      setSelectedAddressId(updatedAddresses[0].id)
    }
    toast.success("Xóa địa chỉ thành công")
  }

  const editingAddress = editingId ? addresses.find((addr) => addr.id === editingId) : undefined

  // Hiển thị thông báo nếu địa chỉ mặc định chưa hoàn chỉnh
  const defaultAddress = addresses.find((addr) => addr.id === "default")
  const hasIncompleteDefault =
    selectedAddressId === "default" &&
    defaultAddress &&
    (!defaultAddress.phone || !defaultAddress.address)

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Thông tin người nhận</h2>
          <Button
            onClick={() => {
              setEditingId(null)
              setModalOpen(true)
            }}
            size="sm"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Thêm địa chỉ
          </Button>
        </div>

        {hasIncompleteDefault && (
          <div className="mb-4 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" /> Địa chỉ mặc định của bạn chưa hoàn chỉnh. Vui lòng cập nhật trước khi thanh toán.
          </div>
        )}

        <div className="space-y-3">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              {...address}
              isSelected={selectedAddressId === address.id}
              onSelect={handleSelectAddress}
              onEdit={(id) => {
                setEditingId(id)
                setModalOpen(true)
              }}
              onDelete={handleDeleteAddress}
            />
          ))}
        </div>
      </Card>

      <AddressModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleSaveModal}
        initialData={editingAddress}
        title={editingId ? "Sửa địa chỉ" : "Thêm địa chỉ"}
      />
    </div>
  )
}
