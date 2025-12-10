import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, MapPin, Lock, ShoppingBag, CreditCard, Settings, Home } from "lucide-react"
import type { User as UserType } from "@/types"

interface ProfileSidebarProps {
  activeTab: string
  user: UserType
  onTabChange: (tab: any) => void
  onLogout: () => void
}

const menuItems = [
  {
    id: "dashboard",
    label: "Trang chủ",
    icon: Home,
  },
  {
    id: "personal-info",
    label: "Thông tin cá nhân",
    icon: User,
  },
  {
    id: "my-orders",
    label: "Đơn hàng của tôi",
    icon: ShoppingBag,
  },
  {
    id: "address",
    label: "Địa chỉ",
    icon: MapPin,
  },
  {
    id: "account-security",
    label: "Bảo mật tài khoản",
    icon: Lock,
  },
  {
    id: "payment-wallet",
    label: "Thanh toán / Ví",
    icon: CreditCard,
  },
  {
    id: "other-settings",
    label: "Cài đặt khác",
    icon: Settings,
  },
]

export function ProfileSidebar({ activeTab, user, onTabChange, onLogout }: ProfileSidebarProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.firstName + " " + user.lastName} />
            <AvatarFallback>{user.firstName.charAt(0) + user.lastName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-sm truncate">{user.firstName + " " + user.lastName}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
      </div>

      <Separator />

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 px-4 py-2 h-auto",
                isActive && "bg-primary text-primary-foreground",
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </Button>
          )
        })}
      </nav>

      <Separator />

      <div className="p-4">
        <Button variant="outline" className="w-full bg-transparent" onClick={onLogout}>
          Đăng xuất
        </Button>
      </div>
    </div>
  )
}
