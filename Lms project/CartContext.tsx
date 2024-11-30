'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useUser } from './UserContext'

type CartItem = {
  id: string
  title: string
  price: number
  quantity: number
}

type UserCart = {
  [userId: string]: CartItem[]
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [carts, setCarts] = useState<UserCart>({})
  const { user } = useUser()

  const userId = user?.email || 'guest'

  useEffect(() => {
    // Load cart from localStorage on component mount
    const savedCarts = localStorage.getItem('userCarts')
    if (savedCarts) {
      setCarts(JSON.parse(savedCarts))
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('userCarts', JSON.stringify(carts))
  }, [carts])

  const items = carts[userId] || []

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setCarts(prevCarts => {
      const userCart = prevCarts[userId] || []
      const existingItem = userCart.find(item => item.id === newItem.id)
      const updatedUserCart = existingItem
        ? userCart.map(item =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...userCart, { ...newItem, quantity: 1 }]
      return { ...prevCarts, [userId]: updatedUserCart }
    })
  }

  const removeItem = (id: string) => {
    setCarts(prevCarts => {
      const userCart = prevCarts[userId] || []
      const updatedUserCart = userCart.filter(item => item.id !== id)
      return { ...prevCarts, [userId]: updatedUserCart }
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    setCarts(prevCarts => {
      const userCart = prevCarts[userId] || []
      const updatedUserCart = userCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
      return { ...prevCarts, [userId]: updatedUserCart }
    })
  }

  const clearCart = () => {
    setCarts(prevCarts => ({ ...prevCarts, [userId]: [] }))
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}


