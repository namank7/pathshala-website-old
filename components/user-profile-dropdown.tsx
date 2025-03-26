"use client"

import { User, LogOut, Settings, BookOpen, Calendar, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function UserProfileDropdown() {
  const { isAuthenticated, user, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = () => {
    signOut()
  }

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full border border-yellow-900/20 hover:bg-[#CE8C2C]/10">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.picture || ""} alt="User" />
            <AvatarFallback className="bg-zinc-800 text-[#CE8C2C]">
              {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {isAuthenticated && user ? (
          <>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user.name || "User"}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleNavigate("/dashboard/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate("/dashboard/courses")}>
                <BookOpen className="mr-2 h-4 w-4" />
                <span>My Courses</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate("/dashboard/appointments")}>
                <Calendar className="mr-2 h-4 w-4" />
                <span>My Appointments</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate("/dashboard/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleNavigate("/auth/login")}>
              <LogIn className="mr-2 h-4 w-4" />
              <span>Login</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/auth/register")}>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Register</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

