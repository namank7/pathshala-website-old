import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider"
import { fromSSO } from "@aws-sdk/credential-providers"

// Debug environment variables (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('Environment Variables Check:', {
    hasRegion: !!process.env.AWS_REGION,
    hasPublicRegion: !!process.env.NEXT_PUBLIC_AWS_REGION,
    hasUserPoolId: !!process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
    hasClientId: !!process.env.NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID,
    hasS3Bucket: !!process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
    hasProfile: !!process.env.AWS_PROFILE,
  })
}

// Validate environment variables
function validateEnvVar(name: string, value: string | undefined, isPublic = false): string {
  if (!value) {
    const prefix = isPublic ? 'NEXT_PUBLIC_' : ''
    throw new Error(
      `${prefix}${name} not configured. Please add it to your .env.local file. If you've already added it, try restarting the Next.js server.`
    )
  }
  return value
}

// Public AWS Configuration (safe to expose to client)
export const region = validateEnvVar(
  "AWS_REGION",
  process.env.NEXT_PUBLIC_AWS_REGION,
  true
)

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
  const serverRegion = validateEnvVar("AWS_REGION", process.env.AWS_REGION)
  const profile = validateEnvVar("AWS_PROFILE", process.env.AWS_PROFILE)

  // Create SSO credentials provider
  const credentials = fromSSO({
    profile
  })

  // Initialize Cognito client
  cognitoClientInstance = new CognitoIdentityProviderClient({
    region: serverRegion,
    credentials
  })

  // Initialize DynamoDB client
  const ddbClient = new DynamoDBClient({
    region: serverRegion,
    credentials
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

