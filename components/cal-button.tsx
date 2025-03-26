"use client"

import { useEffect } from "react"
import { getCalApi } from "@calcom/embed-react"
import { Button } from "@/components/ui/button"

interface CalButtonProps {
  className?: string
  children: React.ReactNode
  variant?: "default" | "outline"
}

export default function CalButton({ className, children, variant = "default" }: CalButtonProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "45min" })
      cal("ui", {
        "cssVarsPerTheme": {
          "light": { "cal-brand": "#292929" },
          "dark": { "cal-brand": "#ce8c2c" }
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      })
    })()
  }, [])

  return (
    <Button
      data-cal-namespace="45min"
      data-cal-link="namankhandelwal/45min"
      data-cal-config='{"layout":"month_view"}'
      className={className}
      variant={variant}
    >
      {children}
    </Button>
  )
} 