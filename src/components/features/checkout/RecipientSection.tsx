import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { AddressCard } from "./AddressCard"
import { AddressModal, type AddressFormData } from "./AddressModal"

interface Address extends AddressFormData {
  id: string
}

interface RecipientSectionProps {
  onAddressSelect?: (address: Address) => void
}

export function RecipientSection({ onAddressSelect }: RecipientSectionProps) {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "John Doe",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street, New York, NY 10001",
    },
    {
      id: "2",
      name: "Jane Smith",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Avenue, Los Angeles, CA 90001",
    },
  ])

  const [selectedAddressId, setSelectedAddressId] = useState<string>("1")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAddAddress = (data: AddressFormData) => {
    const newAddress: Address = {
      id: Date.now().toString(),
      ...data,
    }
    setAddresses([...addresses, newAddress])
    setSelectedAddressId(newAddress.id)
    onAddressSelect?.(newAddress)
  }

  const handleEditAddress = (data: AddressFormData) => {
    if (editingId) {
      setAddresses(addresses.map((addr) => (addr.id === editingId ? { ...addr, ...data } : addr)))
      setEditingId(null)
    }
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
    const selected = addresses.find((addr) => addr.id === id)
    if (selected) {
      onAddressSelect?.(selected)
    }
  }

  const editingAddress = editingId ? addresses.find((addr) => addr.id === editingId) : undefined

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
