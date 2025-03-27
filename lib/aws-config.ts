import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider"

// Debug environment variables (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('Environment Variables Check:', {
    hasRegion: !!process.env.CUSTOM_AWS_REGION,
    hasAccessKey: !!process.env.CUSTOM_AWS_ACCESS_KEY,
    hasSecretKey: !!process.env.CUSTOM_AWS_SECRET_KEY,
    hasPublicRegion: !!process.env.NEXT_PUBLIC_AWS_REGION,
    hasUserPoolId: !!process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
    hasClientId: !!process.env.NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID,
    hasS3Bucket: !!process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
  })
}

// Validate environment variables
function validateEnvVar(name: string, value: string | undefined, isPublic = false): string {
  if (!value) {
    const prefix = isPublic ? 'NEXT_PUBLIC_' : 'CUSTOM_'
    throw new Error(
      `${prefix}${name} not configured. Please add it to your environment variables. If you've already added it, try restarting the server.`
    )
  }
  return value
}

// Public AWS Configuration (safe to expose to client)
export const region = process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1'

export const userPoolId = validateEnvVar(
  "AWS_USER_POOL_ID",
  process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
  true
)

export const clientId = validateEnvVar(
  "AWS_USER_POOL_CLIENT_ID",
  process.env.NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID,
  true
)

// Initialize AWS clients (server-side only)
let cognitoClientInstance: CognitoIdentityProviderClient | null = null
let dynamoDbInstance: DynamoDBDocumentClient | null = null

if (typeof window === 'undefined') {
  // Server-side AWS configuration
  const serverRegion = process.env.CUSTOM_AWS_REGION || region
  const credentials = process.env.CUSTOM_AWS_ACCESS_KEY && process.env.CUSTOM_AWS_SECRET_KEY
    ? {
        accessKeyId: process.env.CUSTOM_AWS_ACCESS_KEY,
        secretAccessKey: process.env.CUSTOM_AWS_SECRET_KEY,
      }
    : undefined

  if (!credentials) {
    console.warn('AWS credentials not found. Some functionality may be limited.')
  }

  // Initialize Cognito client
  cognitoClientInstance = new CognitoIdentityProviderClient({
    region: serverRegion,
    credentials,
  })

  // Initialize DynamoDB client
  const ddbClient = new DynamoDBClient({
    region: serverRegion,
    credentials,
  })

  dynamoDbInstance = DynamoDBDocumentClient.from(ddbClient)
}

// Export the instances
export const cognitoClient = cognitoClientInstance
export const dynamoDb = dynamoDbInstance

// Cognito User Pool Configuration (public)
export const cognitoConfig = {
  userPoolId,
  clientId,
}

// DynamoDB table names (server-side only)
export const dynamoDbTables = {
  users: process.env.DYNAMODB_USERS_TABLE,
  bookings: process.env.DYNAMODB_BOOKINGS_TABLE,
  courses: process.env.DYNAMODB_COURSES_TABLE,
}

