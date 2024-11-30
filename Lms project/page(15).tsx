'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { useUser } from '@/contexts/UserContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, Minus, Plus, QrCode } from 'lucide-react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart()
  const { user } = useUser()
  const [paymentMethod, setPaymentMethod] = useState('')
  const [showQR, setShowQR] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)

    if (paymentMethod === 'upi') {
      setShowQR(true)
    } else if (paymentMethod === 'paypal') {
      // Redirect to PayPal
      window.location.href = 'https://www.paypal.com'
    } else if (paymentMethod === 'netbanking') {
      // Handle net banking logic
      alert('Redirecting to net banking...')
    }
  }

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
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => removeItem(item.id)}
                  >
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
              <span>Total:</span>
              <span className="font-bold">₹{total.toFixed(2)}</span>
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
          </CardContent>
        </Card>
      </div>

      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan QR Code to Pay</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-64 h-64">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GooglePay_QR-56Xj59tSQXZeeZWWyxq2eSDP7Kv4X1.png"
                alt="UPI QR Code"
                layout="fill"
                className="rounded-lg"
              />
            </div>
            <p className="text-sm text-center text-gray-500">
              UPI ID: yadagirisiddu308@oksbi
            </p>
            <p className="text-sm text-center text-gray-500">
              Scan with any UPI app to pay
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

