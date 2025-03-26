"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn, isLoading, error, clearError } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isVerified = searchParams.get('verified') === 'true'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    try {
      await signIn(email, password)
      router.push("/dashboard")
    } catch (error) {
      // Error is handled by the auth context
      console.error("Login error:", error)
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
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription className="text-gray-400">Enter your credentials to sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-900/20 text-red-300">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {isVerified && (
            <Alert className="mb-4 bg-green-900/20 border-green-900/20 text-green-300">
              <AlertDescription>Email verified successfully! You can now sign in.</AlertDescription>
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
                className="bg-zinc-800 border-yellow-900/20"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/auth/forgot-password" className="text-sm text-[#CE8C2C] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-zinc-800 border-yellow-900/20"
              />
            </div>
            <Button type="submit" className="w-full bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-[#CE8C2C] hover:underline">
              Sign up
            </Link>
          </div>
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

