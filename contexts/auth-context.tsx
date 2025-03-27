"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import {
  authenticateUser,
  updateUserAttributes,
  updateUserInDynamoDB,
  getUserFromDynamoDB,
  createUserInDynamoDB,
  type UserData,
  type UserAttributes,
} from "@/app/actions/auth-actions"
import { jwtDecode } from "jwt-decode"
import {
  type GetUserCommandOutput,
  type InitiateAuthCommandOutput,
  type AttributeType,
  SignUpCommand,
  ConfirmSignUpCommand,
  GlobalSignOutCommand,
  UpdateUserAttributesCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import { cognitoConfig } from '@/lib/aws-config'
import { 
  initiateAuth,
  getUserAttributes,
  signUp,
  confirmSignUp,
  globalSignOut,
  forgotPassword,
  confirmForgotPassword,
  updateAttributes
} from '@/app/actions/aws-actions'

// Cookie helper functions
const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/'
}

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(';').shift() || '')
  }
  return null
}

const removeCookie = (name: string) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/'
}

// Types
export type { UserData, UserAttributes } from "@/app/actions/auth-actions"
export type UserType = 'student' | 'coach' | 'admin'

export type AuthContextType = {
  isAuthenticated: boolean
  isLoading: boolean
  user: UserData | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, userType: 'student' | 'coach', name: string) => Promise<void>
  confirmSignUp: (email: string, code: string) => Promise<void>
  signOut: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  confirmForgotPassword: (email: string, code: string, newPassword: string) => Promise<void>
  updateUserAttributes: (attributes: Partial<UserAttributes>) => Promise<void>
  updateUserData: (data: Partial<UserData>) => Promise<void>
  error: string | null
  clearError: () => void
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper to get token
const getTokenFromCookie = () => {
  if (typeof window !== "undefined") {
    return getCookie("token")
  }
  return null
}

// Helper to get user
const getUserFromCookie = () => {
  if (typeof window !== "undefined") {
    const userStr = getCookie("user")
    if (userStr) {
      try {
        return JSON.parse(userStr)
      } catch (e) {
        return null
      }
    }
  }
  return null
}

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  // Check authentication status on mount
  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      setIsLoading(true)
      const accessToken = getTokenFromCookie()
      if (!accessToken) {
        throw new Error('No access token found')
      }

      const response = await getUserAttributes(accessToken)
      
      if (response.UserAttributes) {
        const userAttrs: Record<string, string> = {}
        response.UserAttributes.forEach((attr: AttributeType) => {
          if (attr.Name && attr.Value) {
            userAttrs[attr.Name] = attr.Value
          }
        })

        const userType = userAttrs['custom:userType'] as UserType
        if (!userType || !['student', 'coach', 'admin'].includes(userType)) {
          throw new Error('Invalid user type')
        }

        // Get user ID from token
        const decodedToken = jwtDecode(accessToken)
        const userId = decodedToken.sub as string

        // Get user data from DynamoDB
        const dynamoUser = await getUserFromDynamoDB(userId)
        console.log('Data from DynamoDB:', dynamoUser)

        // If user doesn't exist in DynamoDB, create them
        const userData = dynamoUser || await createUserInDynamoDB(userId, userAttrs.email || '')

        // Update user data with latest Cognito attributes
        const updatedUserData = {
          ...userData,
          email: userAttrs.email || userData.email,
          name: userAttrs.name || userData.name,
          phone_number: userAttrs.phone_number || userData.phone_number,
          picture: userAttrs.picture || userData.picture,
        }

        console.log('Updated user data:', updatedUserData)

        // Update DynamoDB if needed
        if (JSON.stringify(updatedUserData) !== JSON.stringify(userData)) {
          await updateUserInDynamoDB(updatedUserData)
        }

        setUser(updatedUserData)
        setIsAuthenticated(true)
        setCookie("user", JSON.stringify(updatedUserData))
      }
    } catch (err) {
      console.error('Auth check error:', err)
      setUser(null)
      setIsAuthenticated(false)
      removeCookie("token")
      removeCookie("user")
      router.push("/auth/login")
    } finally {
      setIsLoading(false)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setIsLoading(true)
      setError(null)

      const response = await initiateAuth(email, password)
      
      if (response.AuthenticationResult?.AccessToken) {
        setCookie("token", response.AuthenticationResult.AccessToken)
        
        // Get user attributes
        const userResponse = await getUserAttributes(response.AuthenticationResult.AccessToken)
        
        if (userResponse.UserAttributes) {
          const userAttrs: Record<string, string> = {}
          userResponse.UserAttributes.forEach((attr: AttributeType) => {
            if (attr.Name && attr.Value) {
              userAttrs[attr.Name] = attr.Value
            }
          })

          // Get user ID from token
          const decodedToken = jwtDecode(response.AuthenticationResult.AccessToken)
          const userId = decodedToken.sub as string

          // Get or create user in DynamoDB
          const dynamoUser = await getUserFromDynamoDB(userId)
          const userData = dynamoUser || await createUserInDynamoDB(userId, email)

          // Update user data with latest Cognito attributes
          const updatedUserData = {
            ...userData,
            email: userAttrs.email || userData.email,
            name: userAttrs.name || userData.name,
            phone_number: userAttrs.phone_number || userData.phone_number,
            picture: userAttrs.picture || userData.picture,
          }

          // Update DynamoDB if needed
          if (JSON.stringify(updatedUserData) !== JSON.stringify(userData)) {
            await updateUserInDynamoDB(updatedUserData)
          }

          setUser(updatedUserData)
          setIsAuthenticated(true)
          setCookie("user", JSON.stringify(updatedUserData))
          router.push("/dashboard")
        }
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSignUp(email: string, password: string, userType: 'student' | 'coach', name: string) {
    try {
      setIsLoading(true)
      setError(null)
      await signUp(email, password, userType, name)
      router.push(`/auth/verify?email=${encodeURIComponent(email)}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign up')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleConfirmSignUp(email: string, code: string) {
    try {
      setIsLoading(true)
      setError(null)
      await confirmSignUp(email, code)
      router.push('/auth/login?verified=true')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during confirmation')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSignOut() {
    try {
      setIsLoading(true)
      setError(null)
      const accessToken = getTokenFromCookie()
      if (accessToken) {
        await globalSignOut(accessToken)
      }
      setUser(null)
      setIsAuthenticated(false)
      removeCookie("token")
      removeCookie("user")
      router.push("/auth/login")
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign out')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleForgotPassword(email: string) {
    try {
      setIsLoading(true)
      setError(null)
      await forgotPassword(email)
      router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleConfirmForgotPassword(email: string, code: string, newPassword: string) {
    try {
      setIsLoading(true)
      setError(null)
      await confirmForgotPassword(email, code, newPassword)
      router.push('/auth/login?reset=true')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUpdateUserData(data: Partial<UserData>) {
    try {
      setIsLoading(true)
      setError(null)

      if (!user?.userId) {
        throw new Error('User not found')
      }

      // Get current user data
      const currentData = await getUserFromDynamoDB(user.userId)
      if (!currentData) {
        throw new Error('User data not found')
      }

      // Merge current data with new data
      const updatedData: UserData = {
        ...currentData,
        ...data,
        userId: user.userId, // Ensure we keep the correct userId
        updatedAt: new Date().toISOString()
      }

      // Update DynamoDB
      const success = await updateUserInDynamoDB(updatedData)
      if (!success) {
        throw new Error('Failed to update user data')
      }

      // Update local state
      setUser(updatedData)
      setCookie("user", JSON.stringify(updatedData))

      // Get the access token
      const accessToken = getTokenFromCookie()
      if (!accessToken) {
        throw new Error('No access token found')
      }

      try {
        // Try to update Cognito attributes if applicable
        if (data.name || data.phone_number || data.picture) {
          const cognitoAttributes = Object.entries({
            name: data.name,
            phone_number: data.phone_number,
            picture: data.picture
          })
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => ({
            Name: key,
            Value: value?.toString() || ''
          }))

          if (cognitoAttributes.length > 0) {
            await updateAttributes(accessToken, cognitoAttributes)
          }
        }
      } catch (error) {
        console.error('[handleUpdateUserData] Cognito update error:', error)
        if (error instanceof Error && error.message.includes('expired')) {
          // Token expired, refresh auth state
          await checkAuth()
        } else {
          throw error
        }
      }
    } catch (err) {
      console.error('[handleUpdateUserData] Error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred while updating user data')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUpdateUserAttributes(attributes: Partial<UserAttributes>) {
    try {
      setIsLoading(true)
      setError(null)

      if (!user?.userId) {
        throw new Error('User not found')
      }

      // Get the access token
      const accessToken = getTokenFromCookie()
      if (!accessToken) {
        throw new Error('No access token found')
      }

      // First update Cognito
      console.log('[handleUpdateUserAttributes] Updating Cognito:', attributes)
      const cognitoAttributes = Object.entries(attributes)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => ({
          Name: key,
          Value: value?.toString() || ''
        }))

      try {
        await updateAttributes(accessToken, cognitoAttributes)
        console.log('[handleUpdateUserAttributes] Cognito update successful')
      } catch (error) {
        if (error instanceof Error && error.message.includes('expired')) {
          // Token expired, refresh auth state and retry
          await checkAuth()
          const newToken = getTokenFromCookie()
          if (newToken) {
            await updateAttributes(newToken, cognitoAttributes)
          } else {
            throw new Error('Failed to refresh token')
          }
        } else {
          throw error
        }
      }

      // Then update DynamoDB
      console.log('[handleUpdateUserAttributes] Updating DynamoDB')
      const currentData = await getUserFromDynamoDB(user.userId)
      if (!currentData) {
        throw new Error('User data not found in DynamoDB')
      }

      const updatedData: UserData = {
        ...currentData,
        ...attributes,
        userId: user.userId,
        updatedAt: new Date().toISOString()
      }

      const success = await updateUserInDynamoDB(updatedData)
      if (!success) {
        throw new Error('Failed to update DynamoDB')
      }

      // Update local state
      console.log('[handleUpdateUserAttributes] Updating local state')
      setUser(updatedData)
      setCookie("user", JSON.stringify(updatedData))

      console.log('[handleUpdateUserAttributes] Update completed successfully')
    } catch (err) {
      console.error('[handleUpdateUserAttributes] Error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    isAuthenticated,
    isLoading,
    user,
    signIn,
    signUp: handleSignUp,
    confirmSignUp: handleConfirmSignUp,
    signOut: handleSignOut,
    forgotPassword: handleForgotPassword,
    confirmForgotPassword: handleConfirmForgotPassword,
    updateUserAttributes: handleUpdateUserAttributes,
    updateUserData: handleUpdateUserData,
    error,
    clearError: () => setError(null)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

