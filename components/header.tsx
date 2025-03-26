"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import UserProfileDropdown from "@/components/user-profile-dropdown"
import MobileMenu from "@/components/mobile-menu"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-yellow-900/20 bg-black/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <MobileMenu />
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Pathshala Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold">Pathshala</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/study-abroad"
            className={`text-sm font-medium transition-colors ${
              isActive("/study-abroad") ? "text-[#CE8C2C]" : "hover:text-[#CE8C2C]"
            }`}
          >
            Study Abroad
          </Link>
          <Link
            href="/career-counseling"
            className={`text-sm font-medium transition-colors ${
              isActive("/career-counseling") ? "text-[#CE8C2C]" : "hover:text-[#CE8C2C]"
            }`}
          >
            Career Counseling
          </Link>
          <Link
            href="/coaching-connect"
            className={`text-sm font-medium transition-colors ${
              isActive("/coaching-connect") ? "text-[#CE8C2C]" : "hover:text-[#CE8C2C]"
            }`}
          >
            Coaching Connect
          </Link>
          <Link
            href="/e-learning"
            className={`text-sm font-medium transition-colors ${
              isActive("/e-learning") ? "text-[#CE8C2C]" : "hover:text-[#CE8C2C]"
            }`}
          >
            E-Learning
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button className="hidden md:inline-flex bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black">Get Started</Button>
          <UserProfileDropdown />
        </div>
      </div>
    </header>
  )
}

