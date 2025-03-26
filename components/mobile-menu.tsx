"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Calendar, MapPin, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-black border-r border-yellow-900/20">
        <div className="flex items-center gap-2 mb-8">
          <Image
            src="/images/logo.png"
            alt="Pathshala Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold">Pathshala</span>
        </div>
        <nav className="flex flex-col gap-4">
          <Link
            href="/study-abroad"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              isActive("/study-abroad") ? "text-[#CE8C2C]" : "hover:text-[#CE8C2C]"
            }`}
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/logo.png"
              alt="Pathshala Logo"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            Study Abroad
          </Link>
          <Link
            href="/career-counseling"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              isActive("/career-counseling") ? "text-[#CE8C2C]" : "hover:text-[#CE8C2C]"
            }`}
            onClick={() => setOpen(false)}
          >
            <Calendar className="h-5 w-5" />
            Career Counseling
          </Link>
          <Link
            href="/coaching-connect"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              isActive("/coaching-connect") ? "text-[#CE8C2C]" : "hover:text-[#CE8C2C]"
            }`}
            onClick={() => setOpen(false)}
          >
            <MapPin className="h-5 w-5" />
            Coaching Connect
          </Link>
          <Link
            href="/e-learning"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              isActive("/e-learning") ? "text-[#CE8C2C]" : "hover:text-[#CE8C2C]"
            }`}
            onClick={() => setOpen(false)}
          >
            <Video className="h-5 w-5" />
            E-Learning
          </Link>
        </nav>
        <div className="mt-8">
          <Button className="w-full bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black">Get Started</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

