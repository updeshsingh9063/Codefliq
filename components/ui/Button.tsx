import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-accent-blue text-white hover:bg-accent-blue/90 shadow-glow-blue",
        destructive:
          "bg-red-500 text-white hover:bg-red-500/90",
        outline:
          "border border-border hover:border-accent-blue bg-transparent hover:bg-accent-blue/10 text-text-primary",
        secondary:
          "bg-bg-elevated text-text-primary hover:bg-bg-elevated/80 border border-border",
        ghost: "hover:bg-bg-elevated hover:text-white text-text-muted",
        link: "text-accent-blue underline-offset-4 hover:underline",
        gradient: "bg-gradient-accent text-white shadow-glow-purple hover:opacity-90 transition-opacity",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-14 rounded-full px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
