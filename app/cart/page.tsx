"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/contexts/UserContext"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Minus, Plus, QrCode } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"

type CartItem = {
  id: string
  title: string
  price: number
  quantity: number
  type: "course" | "resource"
}

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const { user, setUser } = useUser()
  const [paymentMethod, setPaymentMethod] = useState("")
  const [showQR, setShowQR] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const [blazecreditsToRedeem, setBlazeCreditsToRedeem] = useState(0)
  //const [paymentStatus, setPaymentStatus] = useState<'pending' | 'waiting_confirmation' | 'confirmed'>('pending')

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)

    if (paymentMethod === "upi") {
      setShowQR(true)
    } else if (paymentMethod === "paypal") {
      // Redirect to PayPal
      window.location.href = "https://www.paypal.com"
    } else if (paymentMethod === "netbanking") {
      // Handle net banking logic
      alert("Redirecting to net banking...")
    }
  }

  const handlePaymentDone = () => {
    const purchasedItems = items.map((item) => ({ id: item.id, type: item.type }))

    // Formatted WhatsApp message
    const message = `Hello ${user?.fullName},

I have completed the payment for the following items:
${items.map((item) => `- ${item.title} (₹${item.price.toFixed(2)})`).join("\n")}

Total: ₹${total.toFixed(2)}

User Details:
- Name: ${user?.fullName}
- Email: ${user?.email}
- ID: ${user?.id}
- Phone: ${user?.phone}

Please confirm my payment and provide access. Thank you!`

    const whatsappUrl = `https://wa.me/919390291870?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    setShowQR(false)

    // Update user's purchased courses and clear cart
    if (user) {
      const updatedUser = {
        ...user,
        purchasedCourses: [
          ...(user.purchasedCourses || []),
          ...purchasedItems.filter((item) => item.type === "course").map((item) => item.id),
        ],
        purchasedResources: [
          ...(user.purchasedResources || []),
          ...purchasedItems.filter((item) => item.type === "resource").map((item) => item.id),
        ],
      }
      setUser(updatedUser)

      // Update localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const updatedUsers = users.map((u: any) => {
        if (u.id === user.id) {
          return updatedUser
        }
        return u
      })
      localStorage.setItem("users", JSON.stringify(updatedUsers))
    }

    clearCart() // Clear the cart after successful purchase

    toast({
      title: "Payment Completed",
      description:
        "Thank you for your purchase! You can now access your purchased courses/resources from the dashboard.",
    })
  }

  const maxRedeemableBlazeCredits = Math.min(user?.blazecredits?.remaining || 0, total * 10)

  const handleBlazecreditRedemption = (value: string) => {
    const credits = Number.parseInt(value)
    if (!isNaN(credits) && credits >= 0 && credits <= maxRedeemableBlazeCredits) {
      setBlazeCreditsToRedeem(credits)
    }
  }

  const totalAfterBlazecreditRedemption = Math.max(0, total - blazecreditsToRedeem / 10)

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Please log in to view your cart</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {items.map((item) => (
            <Card key={item.id} className="mb-4">
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{item.type === "resource" ? "Resource Access" : "Course"}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" onClick={() => removeItem(item.id)}>
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-bold">₹{total.toFixed(2)}</span>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Redeem Blazecredits 🪙</label>
              <Input
                type="number"
                value={blazecreditsToRedeem}
                onChange={(e) => handleBlazecreditRedemption(e.target.value)}
                max={maxRedeemableBlazeCredits}
                min={0}
              />
              <p className="text-sm text-gray-500">Available Blazecredits: {user.blazecredits?.remaining || 0}</p>
            </div>

            <div className="flex justify-between">
              <span>Discount:</span>
              <span className="font-bold">-₹{(blazecreditsToRedeem / 10).toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Total:</span>
              <span className="font-bold">₹{totalAfterBlazecreditRedemption.toFixed(2)}</span>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Payment Method</label>
              <Select onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="netbanking">Net Banking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* {paymentStatus === 'pending' && (
             <>
               <Button
                 className="w-full"
                 onClick={handlePayment}
                 disabled={!paymentMethod || isProcessing}
               >
                 {isProcessing ? (
                   <>
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     Processing
                   </>
                 ) : (
                   'Pay Now'
                 )}
               </Button>
               <p className="text-center text-sm text-red-600">
                 Note: Click "Pay Now" only after selecting your preferred payment method.
               </p>
             </>
           )} */}

            {/* {paymentStatus === 'waiting_confirmation' && (
             <div className="text-center p-4 bg-yellow-100 rounded-md">
               <p className="font-semibold text-yellow-800">Waiting for payment confirmation</p>
               <p className="text-sm text-yellow-600">We'll update your access once the payment is confirmed.</p>
             </div>
           )} */}
            <Button className="w-full" onClick={handlePayment} disabled={!paymentMethod || isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                "Pay Now"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan QR Code to Pay</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <Card className="w-full">
              <CardContent className="flex flex-col items-center p-6">
                <div className="relative w-64 h-64 mb-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2024-12-20-23-32-04-41_ba41e9a642e6e0e2b03656bfbbffd6e4.jpg-XG2l7Yv7DCRjMADfWpHsNllTm1s1rH.jpeg"
                    alt="UPI QR Code"
                    layout="fill"
                    className="rounded-lg"
                  />
                </div>
                <p className="text-sm text-center text-gray-500 mb-4">UPI ID: 9390291870@fam</p>
                <p className="text-sm text-center text-yellow-500 font-semibold mb-4">
                  ⚠️ Warning: Click 'DONE' only after your payment is successfully completed ✅
                </p>
                <Button onClick={handlePaymentDone} className="w-full flame-button">
                  DONE
                </Button>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
