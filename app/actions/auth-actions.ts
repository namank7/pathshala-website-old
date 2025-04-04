"use server"

import { cookies } from "next/headers"
import {
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
  AdminGetUserCommand,
  AdminUpdateUserAttributesCommand,
} from "@aws-sdk/client-cognito-identity-provider"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb"

// AWS Configuration
const region = process.env.CUSTOM_AWS_REGION || process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1"
const userPoolId = process.env.NEXT_PUBLIC_AWS_USER_POOL_ID || ""
const clientId = process.env.NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID || ""
const tableName = process.env.DYNAMODB_USERS_TABLE || ""

// Initialize AWS credentials
const credentials = process.env.CUSTOM_AWS_ACCESS_KEY && process.env.CUSTOM_AWS_SECRET_KEY
  ? {
      accessKeyId: process.env.CUSTOM_AWS_ACCESS_KEY,
      secretAccessKey: process.env.CUSTOM_AWS_SECRET_KEY,
    }
  : undefined

// Initialize Cognito client
const cognitoClient = new CognitoIdentityProviderClient({
  region,
  credentials,
})

// Initialize DynamoDB client
const dynamoClient = new DynamoDBClient({
  region,
  credentials,
})

// Log configuration on startup
console.log('[AWS Config] Service initialization:', {
  region,
  hasCredentials: !!credentials,
  hasUserPoolId: !!userPoolId,
  hasClientId: !!clientId,
  hasTableName: !!tableName,
  timestamp: new Date().toISOString(),
})

const docClient = DynamoDBDocumentClient.from(dynamoClient)

// Types
export type UserAttributes = {
  email: string
  name?: string
  phone_number?: string
  picture?: string
  preferred_username?: string
  [key: string]: string | undefined
}

export type UserData = {
  userId: string
  email: string
  name?: string
  phone_number?: string
  picture?: string
  preferred_username?: string
  role?: string
  createdAt?: string
  lastLogin?: string
  preferences?: Record<string, any>
  // Additional profile fields
  dateOfBirth?: string
  gender?: string
  address?: {
    street?: string
    city?: string
    state?: string
    country?: string
    postalCode?: string
  }
  education?: {
    currentLevel?: string
    school?: string
    graduationYear?: string
    major?: string
    gpa?: string
  }
  interests?: string[]
  bio?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    github?: string
  }
  [key: string]: any
}

// Get user from DynamoDB
export async function getUserFromDynamoDB(userId: string): Promise<UserData | null> {
  try {
    const params = {
      TableName: tableName,
      Key: { userId: userId },
    }

    const { Item } = await docClient.send(new GetCommand(params))

    if (Item) {
      return Item as UserData
    }

    return null
  } catch (error) {
    console.error("Error getting user from DynamoDB:", error)
    return null
  }
}

// Update user in DynamoDB
export async function updateUserInDynamoDB(userData: UserData): Promise<boolean> {
  try {
    console.log('[DynamoDB] Starting user update:', {
      userId: userData.userId,
      tableName,
      timestamp: new Date().toISOString(),
    })

    if (!tableName) {
      throw new Error('DynamoDB table name not configured')
    }

    // First get existing data to ensure we don't lose any fields
    const existingData = await getUserFromDynamoDB(userData.userId)
    if (!existingData) {
      console.error('[DynamoDB] User not found:', userData.userId)
      return false
    }

    // Merge existing data with new data, ensuring we keep the userId
    const mergedData = {
      ...existingData,
      ...userData,
      userId: existingData.userId, // Always keep the original userId
      updatedAt: new Date().toISOString(),
    }

    // Log the data being updated
    console.log('[DynamoDB] Updating user with data:', {
      userId: mergedData.userId,
      fields: Object.keys(userData),
      timestamp: new Date().toISOString(),
    })

    await docClient.send(
      new PutCommand({
        TableName: tableName,
        Item: mergedData,
        // Add condition to ensure userId exists
        ConditionExpression: 'attribute_exists(userId)',
      }),
    )

    console.log('[DynamoDB] User update successful:', {
      userId: userData.userId,
      timestamp: new Date().toISOString(),
    })

    return true
  } catch (error) {
    console.error('[DynamoDB] Error updating user:', {
      userId: userData.userId,
      error: error instanceof Error ? error.message : 'Unknown error',
      tableName,
      region,
      hasCredentials: !!(process.env.CUSTOM_AWS_ACCESS_KEY && process.env.CUSTOM_AWS_SECRET_KEY),
      timestamp: new Date().toISOString(),
    })
    return false
  }
}

// Create user in DynamoDB if not exists
export async function createUserInDynamoDB(userId: string, email: string): Promise<UserData> {
  try {
    // Check if user exists
    const existingUser = await getUserFromDynamoDB(userId)

    if (existingUser) {
      // Update last login time
      const updatedUser = {
        ...existingUser,
        lastLogin: new Date().toISOString(),
      }

      await updateUserInDynamoDB(updatedUser)
      return updatedUser
    }

    // Create new user
    const newUser: UserData = {
      userId: userId,
      email,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      role: "user",
    }

    await updateUserInDynamoDB(newUser)
    return newUser
  } catch (error) {
    console.error("Error creating user in DynamoDB:", error)
    throw error
  }
}

// Get Cognito user attributes
export async function getCognitoUserAttributes(username: string): Promise<UserAttributes | null> {
  try {
    const command = new AdminGetUserCommand({
      UserPoolId: userPoolId,
      Username: username,
    })

    const response = await cognitoClient.send(command)

    if (!response.UserAttributes) {
      return null
    }

    const attributes: UserAttributes = {
      email: "",
    }

    response.UserAttributes.forEach((attr) => {
      if (attr.Name && attr.Value) {
        attributes[attr.Name] = attr.Value
      }
    })

    return attributes
  } catch (error) {
    console.error("Error getting Cognito user attributes:", error)
    return null
  }
}

// Authenticate user with Cognito
export async function authenticateUser(username: string, password: string) {
  try {
    const command = new AdminInitiateAuthCommand({
      UserPoolId: userPoolId,
      ClientId: clientId,
      AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    })

    const response = await cognitoClient.send(command)

    if (!response.AuthenticationResult) {
      throw new Error("Authentication failed")
    }

    const { IdToken, AccessToken, RefreshToken, ExpiresIn } = response.AuthenticationResult

    // Get user attributes
    const attributes = await getCognitoUserAttributes(username)

    if (!attributes) {
      throw new Error("Failed to get user attributes")
    }

    // Get or create user in DynamoDB
    const userData = await createUserInDynamoDB(username, attributes.email)

    return {
      tokens: {
        idToken: IdToken,
        accessToken: AccessToken,
        refreshToken: RefreshToken,
        expiresIn: ExpiresIn,
      },
      user: {
        ...userData,
        ...attributes,
      },
    }
  } catch (error) {
    console.error("Authentication error:", error)
    throw error
  }
}

// Update user attributes
export async function updateUserAttributes(username: string, attributes: Partial<UserAttributes>) {
  try {
    console.log('[updateUserAttributes] Starting update:', {
      username,
      attributes: Object.keys(attributes),
      timestamp: new Date().toISOString(),
    })

    // First, get the user's Cognito attributes to get the sub (userId)
    const command = new AdminGetUserCommand({
      UserPoolId: userPoolId,
      Username: username,
    })

    const response = await cognitoClient.send(command)
    if (!response.UserAttributes) {
      throw new Error('Failed to get user details from Cognito')
    }

    // Find the sub attribute which is our userId
    const sub = response.UserAttributes.find(attr => attr.Name === 'sub')?.Value
    if (!sub) {
      throw new Error('User sub not found in Cognito')
    }

    console.log('[updateUserAttributes] Found user sub:', sub)

    // Update Cognito attributes
    const userAttributes = Object.entries(attributes).map(([key, value]) => ({
      Name: key,
      Value: value || "",
    }))

    const updateCommand = new AdminUpdateUserAttributesCommand({
      UserPoolId: userPoolId,
      Username: username,
      UserAttributes: userAttributes,
    })

    await cognitoClient.send(updateCommand)
    console.log('[updateUserAttributes] Cognito update successful')

    // Get the current user from DynamoDB using the sub as userId
    const userData = await getUserFromDynamoDB(sub)
    if (!userData) {
      console.error('[updateUserAttributes] User not found in DynamoDB:', sub)
      return null
    }

    // Update DynamoDB with new attributes
    const updatedUser = {
      ...userData,
      ...attributes,
      updatedAt: new Date().toISOString(),
    }

    const success = await updateUserInDynamoDB(updatedUser)
    if (!success) {
      throw new Error('Failed to update user in DynamoDB')
    }

    console.log('[updateUserAttributes] DynamoDB update successful')
    return updatedUser
  } catch (error) {
    console.error('[updateUserAttributes] Error:', {
      username,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    })
    throw error
  }
}

