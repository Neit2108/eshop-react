import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit2 } from "lucide-react"

interface AddressCardProps {
  id: string
  name: string
  phone: string
  address: string
  isSelected?: boolean
  onEdit: (id: string) => void
  onSelect?: (id: string) => void
}

export function AddressCard({ id, name, phone, address, isSelected, onEdit, onSelect }: AddressCardProps) {
  return (
    <Card
      className={`p-4 cursor-pointer transition-all ${
        isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
      }`}
      onClick={() => onSelect?.(id)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{phone}</p>
          <p className="mt-2 text-sm text-foreground">{address}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onEdit(id)
          }}
          className="flex-shrink-0"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
