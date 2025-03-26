"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { User, BookOpen, Calendar, Settings } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    {
      title: "My Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      title: "My Courses",
      href: "/dashboard/courses",
      icon: BookOpen,
    },
    {
      title: "My Appointments",
      href: "/dashboard/appointments",
      icon: Calendar,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="container py-8 grid grid-cols-12 gap-8">
      <aside className="col-span-3">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "bg-[#CE8C2C] text-black"
                    : "hover:bg-[#CE8C2C]/10 text-gray-400 hover:text-[#CE8C2C]"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </aside>
      <main className="col-span-9">{children}</main>
    </div>
  )
} 