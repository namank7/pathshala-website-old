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

export default function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [formError, setFormError] = useState("")
  const [isConfirmStep, setIsConfirmStep] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState("")

  const { signUp, confirmSignUp, isLoading, error } = useAuth()
  const router = useRouter()

  const validatePassword = (password: string) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/
    return regex.test(password)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")

    if (!isConfirmStep) {
      // Registration step
      if (password !== confirmPassword) {
        setFormError("Passwords do not match")
        return
      }

      if (!validatePassword(password)) {
        setFormError("Password must be at least 8 characters and include uppercase, lowercase, and numbers")
        return
      }

      try {
        await signUp(email, password, 'student', name)
        setIsConfirmStep(true)
      } catch (error) {
        // Error is handled by the auth context
        console.error("Registration error:", error)
      }
    } else {
      // Confirmation step
      try {
        await confirmSignUp(email, confirmationCode)
        router.push("/auth/login?verified=true")
      } catch (error) {
        // Error is handled by the auth context
        console.error("Confirmation error:", error)
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
          <CardTitle className="text-2xl">{isConfirmStep ? "Verify your email" : "Create an account"}</CardTitle>
          <CardDescription className="text-gray-400">
            {isConfirmStep
              ? "Enter the verification code sent to your email"
              : "Enter your details to create your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {(error || formError) && (
            <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-900/20 text-red-300">
              <AlertDescription>{error || formError}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isConfirmStep ? (
              // Registration form
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-zinc-800 border-yellow-900/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-zinc-800 border-yellow-900/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-zinc-800 border-yellow-900/20"
                  />
                  <p className="text-xs text-gray-400">
                    Must be at least 8 characters with uppercase, lowercase, numbers, and special characters
                    Must be at least 8 characters with uppercase, lowercase, and numbers
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
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
            ) : (
              // Confirmation form
              <div className="space-y-2">
                <Label htmlFor="confirmationCode">Verification Code</Label>
                <Input
                  id="confirmationCode"
                  placeholder="123456"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  required
                  className="bg-zinc-800 border-yellow-900/20"
                />
                <p className="text-xs text-gray-400">Check your email for the verification code</p>
              </div>
            )}
            <Button type="submit" className="w-full bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : isConfirmStep ? (
                "Verify Email"
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#CE8C2C] hover:underline">
              Sign in
            </Link>
          </div>
          {isConfirmStep && (
            <Button
              variant="ghost"
              className="text-[#CE8C2C] hover:bg-[#CE8C2C]/10"
              onClick={() => setIsConfirmStep(false)}
              disabled={isLoading}
            >
              Back to registration
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

