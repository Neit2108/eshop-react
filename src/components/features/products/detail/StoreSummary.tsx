"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Store, Star, Package, Clock, Calendar, Users, Send, X, AlertCircle, Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useQuickMessage } from "@/hooks/useQuickMessage"
import { useAuth } from "@/hooks/useAuth"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"

interface StoreSummaryProps {
  storeLogo?: string
  storeName: string
  storeId: string
  productId?: string
  onViewStore?: () => void
  reviews?: number
  products?: number
  responseRate?: string
  responseTime?: string
  createdTime?: string
  followers?: number
}

export function StoreSummary({
  storeLogo,
  storeName,
  storeId,
  productId,
  onViewStore,
  reviews = 0,
  products = 0,
  responseRate = "95%",
  responseTime = "2 giờ",
  createdTime = "2020",
  followers = 0,
}: StoreSummaryProps) {
  const { user } = useAuth()
  const token = localStorage.getItem("accessToken")
  const apiUrl = "http://localhost:5000"
  
  const [showQuickMessage, setShowQuickMessage] = useState(false)
  const [messageText, setMessageText] = useState("")
  const { loading, error, sendQuickMessage, clearError } = useQuickMessage({
    token: token || "",
    apiUrl,
    shopId: storeId,
    productId,
  })

  const storeInitials = storeName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const handleMessageClick = () => {
    if (!user) {
      // Redirect to login if not authenticated
      alert("Please login to send messages")
      return
    }
    setShowQuickMessage(!showQuickMessage)
    clearError()
  }

  const handleSendMessage = async () => {
    if (!messageText.trim()) return

    try {
      await sendQuickMessage(messageText)
      setMessageText("")
      setShowQuickMessage(false)
      alert("Message sent successfully!")
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to send message'
      console.error("Error sending message:", err)
      
      // Show retry hint if connection error
      if (errorMsg.includes('not connected')) {
        const retryMsg = `${errorMsg} Please wait a moment and try again.`
        alert(retryMsg)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="w-full p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-6">
          {/* Left Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-2">
                <Avatar className="h-16 w-16 flex-shrink-0">
                  <AvatarImage src={storeLogo || "/placeholder.svg"} alt={storeName} />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                    {storeInitials}
                  </AvatarFallback>
                </Avatar>
                <Badge variant="secondary" className="flex items-center gap-1 bg-green-500 text-white">
                  <Star className="h-3 w-3 fill-current" />
                  Đã xác minh
                </Badge>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-semibold text-foreground">{storeName}</h2>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex items-center gap-2" 
                    onClick={handleMessageClick}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Nhắn tin
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 bg-transparent"
                    onClick={onViewStore}
                  >
                    <Store className="h-4 w-4" />
                    Xem cửa hàng
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          {/* <div className="w-px bg-border" /> */}
          <Separator orientation="vertical" className="h-full w-px bg-red-900"/>

          {/* Right Section - Store Stats */}
          <div className="flex flex-1 flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {/* Reviews */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <Star className="h-4 w-4" />
                Đánh giá
              </div>
              <p className="text-lg font-semibold text-foreground">{reviews}</p>
            </div>

            {/* Products */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <Package className="h-4 w-4" />
                Sản phẩm
              </div>
              <p className="text-lg font-semibold text-foreground">{products}</p>
            </div>

            {/* Response Rate */}
            <div className="flex flex-col gap-1">
              <div className="text-xs font-medium text-muted-foreground">Tỉ lệ phản hồi</div>
              <Badge variant="secondary" className="w-fit text-xs font-semibold">
                {responseRate}
              </Badge>
            </div>

            {/* Response Time */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <Clock className="h-4 w-4" />
                Thời gian phản hồi
              </div>
              <p className="text-sm font-medium text-foreground">{responseTime}</p>
            </div>

            {/* Created Time */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Tham gia
              </div>
              <p className="text-sm font-medium text-foreground">{createdTime}</p>
            </div>

            {/* Followers */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <Users className="h-4 w-4" />
                Người theo dõi
              </div>
              <p className="text-lg font-semibold text-foreground">{followers}</p>
            </div>
            </div>
          </div>
        </div>

        {/* Quick Message Input - Dropdown */}
        {showQuickMessage && (
          <div className="border-t pt-4 space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nhắn tin cho shop</label>
              {productId && (
                <p className="text-xs text-muted-foreground">
                  Tin nhắn này sẽ kèm theo sản phẩm
                </p>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập tin nhắn của bạn..."
              disabled={loading}
              className="resize-none min-h-24"
              maxLength={1000}
            />

            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground">
                {messageText.length} / 1000
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowQuickMessage(false)
                    setMessageText("")
                    clearError()
                  }}
                  disabled={loading}
                >
                  <X className="h-4 w-4 mr-2" />
                  Hủy
                </Button>
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={loading || !messageText.trim()}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Gửi
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
