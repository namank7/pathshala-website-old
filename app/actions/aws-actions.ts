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

// Initialize Cognito client for server-side operations
const cognitoClient = new CognitoIdentityProviderClient({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
})

export async function initiateAuth(email: string, password: string): Promise<InitiateAuthCommandOutput> {
  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    ClientId: cognitoConfig.clientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  })

  return await cognitoClient.send(command)
}

export async function getUserAttributes(accessToken: string): Promise<GetUserCommandOutput> {
  const command = new GetUserCommand({
    AccessToken: accessToken
  })
  
  return await cognitoClient.send(command)
}

export async function signUp(
  email: string,
  password: string,
  userType: string,
  name: string
): Promise<SignUpCommandOutput> {
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

  return await cognitoClient.send(command)
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
  const command = new UpdateUserAttributesCommand({
    AccessToken: accessToken,
    UserAttributes: attributes
  })

  return await cognitoClient.send(command)
} 