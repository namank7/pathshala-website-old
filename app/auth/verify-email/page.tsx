'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import Link from 'next/link'
import Image from "next/image"

export default function VerifyEmailPage() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const { confirmSignUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (!email) {
        throw new Error('Email not found. Please try signing up again.')
      }
      await confirmSignUp(email, code)
      router.push('/auth/login?verified=true')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (!email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black p-4">
        <Card className="w-full max-w-md bg-zinc-900 border-yellow-900/20">
          <CardContent className="pt-6">
            <Alert variant="destructive" className="bg-red-900/20 border-red-900/20 text-red-300">
              <AlertDescription>Email not found. Please try signing up again.</AlertDescription>
            </Alert>
            <div className="mt-4 text-center">
              <Link href="/auth/register" className="text-[#CE8C2C] hover:underline">
                Back to Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
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
          <CardTitle className="text-2xl">Verify your email</CardTitle>
          <CardDescription className="text-gray-400">
            Enter the verification code sent to {email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-900/20 text-red-300">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <p className="text-xs text-gray-400">
                Check your email for the verification code
              </p>
            </div>
            <Button type="submit" className="w-full bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "Verify Email"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-400">
            Already verified?{" "}
            <Link href="/auth/login" className="text-[#CE8C2C] hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
} 