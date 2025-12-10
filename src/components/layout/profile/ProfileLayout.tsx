import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { ProfileSidebar } from "./ProfileSidebar"
import { PersonalInformationForm } from "@/components/features/profile/PersonalInformationForm"
import { AddressForm } from "@/components/features/profile/AddressForm"
import { AccountSecurityForm } from "@/components/features/profile/AccountSecurityForm"
import { MyOrdersView } from "@/components/features/profile/MyOrdersView"
import { PaymentWalletView } from "@/components/features/profile/PaymentWalletView"
import { OtherSettingsForm } from "@/components/features/profile/OtherSettingsForm"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { ROUTES } from "@/lib/constants"
import { useNavigate } from "react-router-dom"

type ActiveTab = "personal-info" | "address" | "account-security" | "my-orders" | "payment-wallet" | "other-settings" | "dashboard"

export function ProfileLayout() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<ActiveTab>("personal-info")
  const isMobile = useIsMobile()
  if (!user) return null;

  const renderContent = () => {
    switch (activeTab) {
      case "personal-info":
        return <PersonalInformationForm user={user} />
      case "address":
        return <AddressForm />
      case "account-security":
        return <AccountSecurityForm />
      case "my-orders":
        return <MyOrdersView />
      case "payment-wallet":
        return <PaymentWalletView />
      case "other-settings":
        return <OtherSettingsForm />
      default:
        return <PersonalInformationForm user={user} />
    }
  }

  const handleTabChange = (tab: ActiveTab) => {
    if (tab === "dashboard") {
      navigate(ROUTES.HOME)
    }
    setActiveTab(tab)
  }

  const handleLogout = () => {
    logout()
  }

  if (isMobile) {
    return (
      <div className="flex h-screen flex-col bg-background">
        <div className="border-b border-border p-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <ProfileSidebar activeTab={activeTab} user={user} onTabChange={handleTabChange} onLogout={handleLogout} />
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex-1 overflow-auto p-4">{renderContent()}</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border">
        <div className="sticky top-0 h-screen overflow-auto">
          <ProfileSidebar activeTab={activeTab} user={user} onTabChange={handleTabChange} onLogout={handleLogout} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{renderContent()}</div>
      </main>
    </div>
  )
}
