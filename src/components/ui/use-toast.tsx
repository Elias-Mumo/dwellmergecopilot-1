import * as React from "react"

import { cn } from "@/lib/utils"

const Toaster = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className)}
    {...props}
  />
))
Toaster.displayName = "Toaster"

export { Toaster }

// Toast hook
interface ToastProps {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

const toasts: ToastProps[] = []

export function useToast() {
  const toast = React.useCallback((props: ToastProps) => {
    // Simple console log for now - this would typically show a toast notification
    console.log("Toast:", props)
    toasts.push(props)
  }, [])

  return { toast }
}
