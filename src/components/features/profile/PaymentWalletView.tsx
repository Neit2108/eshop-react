import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Trash2 } from "lucide-react"

const paymentMethods = [
  {
    id: "1",
    type: "Visa",
    last4: "4242",
    expiry: "12/26",
    isDefault: true,
  },
  {
    id: "2",
    type: "Mastercard",
    last4: "5555",
    expiry: "08/25",
    isDefault: false,
  },
]

export function PaymentWalletView() {
  return (
    <div className="space-y-6">
      {/* Saved Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Saved Payment Methods</CardTitle>
          <CardDescription>Manage your payment cards and methods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method, index) => (
              <div key={method.id}>
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {method.type} •••• {method.last4}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Expires {method.expiry}
                        {method.isDefault && " • Default"}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {index < paymentMethods.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Wallet Balance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Wallet Balance</CardTitle>
          <CardDescription>Add funds to your wallet for faster checkout</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
              <p className="text-3xl font-bold text-foreground">$25.00</p>
            </div>
            <Button className="w-full">Add Funds</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
