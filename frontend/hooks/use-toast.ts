"use client"

// Simple toast implementation for the prototype
import { useState } from "react"

type ToastType = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

// Create a simple toast function that logs to console
// In a real app, this would show a visual notification
export function useToast() {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const toast = (props: ToastType) => {
    // Log to console for development
    console.log("Toast:", props)

    // Add toast to state (could be used to render actual toasts)
    setToasts((prev) => [...prev, props])

    // In a real app, we would show a visual notification
    // For now, we'll just return the toast data
    return props
  }

  return {
    toast,
    toasts,
  }
}

// Export a standalone toast function for convenience
export const toast = (props: ToastType) => {
  console.log("Toast:", props)
  return props
}
