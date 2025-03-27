'use server'

import { 
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  GetUserCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
  GlobalSignOutCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  UpdateUserAttributesCommand,
  AuthFlowType,
  type InitiateAuthCommandOutput,
  type GetUserCommandOutput,
  type SignUpCommandOutput,
  type ConfirmSignUpCommandOutput,
  type GlobalSignOutCommandOutput,
  type ForgotPasswordCommandOutput,
  type ConfirmForgotPasswordCommandOutput,
  type UpdateUserAttributesCommandOutput
} from '@aws-sdk/client-cognito-identity-provider'
import { cognitoConfig, region } from '@/lib/aws-config'

function logError(action: string, error: any) {
  console.error(`[${action}] Error Details:`, {
    message: error.message,
    code: error.code,
    time: new Date().toISOString(),
    requestId: error.$metadata?.requestId,
    cfId: error.$metadata?.cfId,
    statusCode: error.$metadata?.httpStatusCode,
    region: process.env.CUSTOM_AWS_REGION || region,
    hasCredentials: !!(process.env.CUSTOM_AWS_ACCESS_KEY && process.env.CUSTOM_AWS_SECRET_KEY),
  })
}

// Initialize Cognito client for server-side operations
const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.CUSTOM_AWS_REGION || region,
  ...(process.env.CUSTOM_AWS_ACCESS_KEY && process.env.CUSTOM_AWS_SECRET_KEY
    ? {
        credentials: {
          accessKeyId: process.env.CUSTOM_AWS_ACCESS_KEY,
          secretAccessKey: process.env.CUSTOM_AWS_SECRET_KEY,
        },
      }
    : {}),
})

// Log initial configuration
console.log('[AWS Config] Initialization:', {
  region: process.env.CUSTOM_AWS_REGION || region,
  hasCredentials: !!(process.env.CUSTOM_AWS_ACCESS_KEY && process.env.CUSTOM_AWS_SECRET_KEY),
  userPoolId: cognitoConfig.userPoolId,
  clientId: cognitoConfig.clientId,
  timestamp: new Date().toISOString(),
})

export async function initiateAuth(email: string, password: string): Promise<InitiateAuthCommandOutput> {
  try {
    console.log('[initiateAuth] Starting authentication:', {
      email,
      clientId: cognitoConfig.clientId,
      timestamp: new Date().toISOString(),
    })
    
    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: cognitoConfig.clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    })

    const result = await cognitoClient.send(command)
    console.log('[initiateAuth] Authentication successful:', {
      email,
      timestamp: new Date().toISOString(),
    })
    return result
  } catch (error) {
    logError('initiateAuth', error)
    throw new Error(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function getUserAttributes(accessToken: string): Promise<GetUserCommandOutput> {
  try {
    console.log('[getUserAttributes] Fetching user attributes')
    const command = new GetUserCommand({
      AccessToken: accessToken
    })
    
    const result = await cognitoClient.send(command)
    console.log('[getUserAttributes] Successfully retrieved user attributes')
    return result
  } catch (error) {
    logError('getUserAttributes', error)
    throw new Error(`Failed to get user attributes: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function signUp(
  email: string,
  password: string,
  userType: string,
  name: string
): Promise<SignUpCommandOutput> {
  try {
    console.log('[signUp] Attempting signup for:', email)
    const command = new SignUpCommand({
      ClientId: cognitoConfig.clientId,
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'name', Value: name },
        { Name: 'custom:userType', Value: userType }
      ]
    })

    const result = await cognitoClient.send(command)
    console.log('[signUp] Signup successful')
    return result
  } catch (error) {
    logError('signUp', error)
    throw new Error(`Signup failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function confirmSignUp(
  email: string,
  code: string
): Promise<ConfirmSignUpCommandOutput> {
  const command = new ConfirmSignUpCommand({
    ClientId: cognitoConfig.clientId,
    Username: email,
    ConfirmationCode: code
  })

  return await cognitoClient.send(command)
}

export async function globalSignOut(
  accessToken: string
): Promise<GlobalSignOutCommandOutput> {
  const command = new GlobalSignOutCommand({
    AccessToken: accessToken
  })

  return await cognitoClient.send(command)
}

export async function forgotPassword(
  email: string
): Promise<ForgotPasswordCommandOutput> {
  const command = new ForgotPasswordCommand({
    ClientId: cognitoConfig.clientId,
    Username: email
  })

  return await cognitoClient.send(command)
}

export async function confirmForgotPassword(
  email: string,
  code: string,
  newPassword: string
): Promise<ConfirmForgotPasswordCommandOutput> {
  const command = new ConfirmForgotPasswordCommand({
    ClientId: cognitoConfig.clientId,
    Username: email,
    ConfirmationCode: code,
    Password: newPassword
  })

  return await cognitoClient.send(command)
}

export async function updateAttributes(
  accessToken: string,
  attributes: { Name: string; Value: string }[]
): Promise<UpdateUserAttributesCommandOutput> {
  try {
    console.log('[updateAttributes] Starting update:', {
      attributes: attributes.map(attr => ({ name: attr.Name })),
      timestamp: new Date().toISOString(),
    })

    const command = new UpdateUserAttributesCommand({
      AccessToken: accessToken,
      UserAttributes: attributes
    })

    const result = await cognitoClient.send(command)
    console.log('[updateAttributes] Update successful')
    return result
  } catch (error) {
    logError('updateAttributes', error)
    throw new Error(`Failed to update attributes: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
} 