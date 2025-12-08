import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit2, Trash2 } from "lucide-react"

interface AddressCardProps {
  id: string
  name: string
  phone: string
  address: string
  isSelected?: boolean
  onEdit: (id: string) => void
  onSelect?: (id: string) => void
  onDelete?: (id: string) => void
}

export function AddressCard({
  id,
  name,
  phone,
  address,
  isSelected,
  onEdit,
  onSelect,
  onDelete,
}: AddressCardProps) {
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
        <div className="flex gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onEdit(id)
            }}
            title="Sửa"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(id)
              }}
              title="Xóa"
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
