import { NextResponse } from "next/server"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb"
import { DescribeTableCommand } from '@aws-sdk/client-dynamodb'

export async function GET() {
  try {
    // Get environment variables
    const region = process.env.NEXT_PUBLIC_AWS_REGION || ""
    const tableName = process.env.NEXT_PUBLIC_AWS_DYNAMODB_TABLE || ""
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID || ""
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || ""

    // Validate required environment variables
    if (!region || !tableName || !accessKeyId || !secretAccessKey) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required environment variables",
          environmentVariables: {
            region: region ? "Set" : "Not set",
            tableName: tableName ? "Set" : "Not set",
            accessKeyId: accessKeyId ? "Set" : "Not set",
            secretAccessKey: secretAccessKey ? "Set" : "Not set",
          },
        },
        { status: 400 },
      )
    }

    // Initialize DynamoDB client with explicit credentials
    const dynamoClient = new DynamoDBClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      // Disable loading credentials from shared ini file
      credentialDefaultProvider: () => async () => {
        return { accessKeyId, secretAccessKey }
      },
    })

    const docClient = DynamoDBDocumentClient.from(dynamoClient)

    // Step 1: Check if we can describe the table
    const describeParams = {
      TableName: tableName,
    }

    const tableDescription = await docClient.send(new DescribeTableCommand(describeParams))

    // Step 2: Try to scan the table (limited to 5 items for testing)
    const scanParams = {
      TableName: tableName,
      Limit: 5,
    }

    const scanResult = await docClient.send(new ScanCommand(scanParams))

    // Return success with table info and sample data
    return NextResponse.json({
      success: true,
      message: "DynamoDB table is linked correctly",
      tableInfo: {
        name: tableName,
        itemCount: tableDescription.Table?.ItemCount || 0,
        tableSizeBytes: tableDescription.Table?.TableSizeBytes || 0,
        tableStatus: tableDescription.Table?.TableStatus || "",
      },
      sampleData: {
        count: scanResult.Count || 0,
        items: scanResult.Items || [],
      },
    })
  } catch (error: any) {
    console.error("DynamoDB test error:", error)

    // Return detailed error information
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to DynamoDB table",
        error: {
          name: error.name,
          message: error.message,
          code: error.code,
          requestId: error.$metadata?.requestId,
          cfId: error.$metadata?.cfId,
          statusCode: error.$metadata?.httpStatusCode,
        },
        environmentVariables: {
          region: process.env.NEXT_PUBLIC_AWS_REGION ? "Set" : "Not set",
          tableName: process.env.NEXT_PUBLIC_AWS_DYNAMODB_TABLE ? "Set" : "Not set",
          // Don't expose if credentials are set or not
          credentials: "Redacted for security",
        },
      },
      { status: 500 },
    )
  }
}

