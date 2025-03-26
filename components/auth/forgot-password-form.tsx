"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isResetStep, setIsResetStep] = useState(false)
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [formError, setFormError] = useState("")
  const [success, setSuccess] = useState("")

  const { forgotPassword, confirmForgotPassword, isLoading, error } = useAuth()
  const router = useRouter()

  const validatePassword = (password: string) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/
    return regex.test(password)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")
    setSuccess("")

    if (!isResetStep) {
      // Request password reset
      try {
        await forgotPassword(email)
        setSuccess("Verification code sent to your email")
        setIsResetStep(true)
      } catch (error) {
        // Error is handled by the auth context
        console.error("Forgot password error:", error)
      }
    } else {
      // Reset password
      if (newPassword !== confirmPassword) {
        setFormError("Passwords do not match")
        return
      }

      if (!validatePassword(newPassword)) {
        setFormError("Password must be at least 8 characters and include uppercase, lowercase, and numbers")
        return
      }

      try {
        await confirmForgotPassword(email, code, newPassword)
        setSuccess("Password reset successful")
        setTimeout(() => {
          router.push("/auth/login?reset=true")
        }, 2000)
      } catch (error) {
        // Error is handled by the auth context
        console.error("Reset password error:", error)
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-yellow-900/20">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Image
              src="/images/logo.png"
              alt="Pathshala Logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
          </div>
          <CardTitle className="text-2xl">{isResetStep ? "Reset your password" : "Forgot your password?"}</CardTitle>
          <CardDescription className="text-gray-400">
            {isResetStep
              ? "Enter the verification code and your new password"
              : "Enter your email and we'll send you a verification code"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {(error || formError) && (
            <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-900/20 text-red-300">
              <AlertDescription>{error || formError}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-4 bg-green-900/20 border-green-900/20 text-green-300">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isResetStep}
                className="bg-zinc-800 border-yellow-900/20"
              />
            </div>
            {isResetStep && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="code">Verification Code</Label>
                  <Input
                    id="code"
                    placeholder="123456"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    className="bg-zinc-800 border-yellow-900/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="bg-zinc-800 border-yellow-900/20"
                  />
                  <p className="text-xs text-gray-400">
                    Must be at least 8 characters with uppercase, lowercase, numbers, and special characters
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-zinc-800 border-yellow-900/20"
                  />
                </div>
              </>
            )}
            <Button type="submit" className="w-full bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : isResetStep ? (
                "Reset Password"
              ) : (
                "Send Reset Code"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-400">
            Remember your password?{" "}
            <Link href="/auth/login" className="text-[#CE8C2C] hover:underline">
              Sign in
            </Link>
          </div>
          {isResetStep && (
            <Button
              variant="ghost"
              className="text-[#CE8C2C] hover:bg-[#CE8C2C]/10"
              onClick={() => setIsResetStep(false)}
              disabled={isLoading}
            >
              Back to forgot password
            </Button>
          )}
          <Button
            variant="outline"
            className="w-full border-yellow-900/20 text-white hover:bg-[#CE8C2C]/10"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

