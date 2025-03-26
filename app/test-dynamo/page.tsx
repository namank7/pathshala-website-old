"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"

export default function TestDynamoPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testConnection = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/test-dynamo")
      const data = await response.json()
      setResult(data)
    } catch (err: any) {
      setError(err.message || "An error occurred while testing the DynamoDB connection")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <Card className="w-full max-w-3xl bg-zinc-900 border-yellow-900/20">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl flex items-center">
            DynamoDB Connection Test
            {isLoading && <Loader2 className="ml-2 h-5 w-5 animate-spin text-[#CE8C2C]" />}
          </CardTitle>
          <CardDescription className="text-gray-400">
            Verify that your DynamoDB table is linked correctly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-900/20 text-red-300">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <>
              {result.success ? (
                <Alert className="bg-green-900/20 border-green-900/20 text-green-300">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>{result.message}</AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive" className="bg-red-900/20 border-red-900/20 text-red-300">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Connection Failed</AlertTitle>
                  <AlertDescription>{result.message}</AlertDescription>
                </Alert>
              )}

              <div className="mt-4 space-y-4">
                {result.success ? (
                  <>
                    <div className="rounded-md bg-zinc-800 p-4">
                      <h3 className="text-lg font-medium mb-2">Table Information</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-400">Table Name:</div>
                        <div>{result.tableInfo.name}</div>
                        <div className="text-gray-400">Item Count:</div>
                        <div>{result.tableInfo.itemCount}</div>
                        <div className="text-gray-400">Table Size:</div>
                        <div>{result.tableInfo.tableSizeBytes} bytes</div>
                        <div className="text-gray-400">Status:</div>
                        <div>{result.tableInfo.tableStatus}</div>
                      </div>
                    </div>

                    <div className="rounded-md bg-zinc-800 p-4">
                      <h3 className="text-lg font-medium mb-2">Sample Data ({result.sampleData.count} items)</h3>
                      {result.sampleData.count > 0 ? (
                        <pre className="text-xs overflow-auto max-h-60 p-2 bg-zinc-900 rounded">
                          {JSON.stringify(result.sampleData.items, null, 2)}
                        </pre>
                      ) : (
                        <p className="text-gray-400">No items found in the table.</p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-md bg-zinc-800 p-4">
                      <h3 className="text-lg font-medium mb-2">Error Details</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-400">Error Name:</div>
                        <div>{result.error.name}</div>
                        <div className="text-gray-400">Error Message:</div>
                        <div>{result.error.message}</div>
                        <div className="text-gray-400">Error Code:</div>
                        <div>{result.error.code}</div>
                        <div className="text-gray-400">Status Code:</div>
                        <div>{result.error.statusCode}</div>
                      </div>
                    </div>

                    <div className="rounded-md bg-zinc-800 p-4">
                      <h3 className="text-lg font-medium mb-2">Environment Variables</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-400">Region:</div>
                        <div>{result.environmentVariables.region}</div>
                        <div className="text-gray-400">Table Name:</div>
                        <div>{result.environmentVariables.tableName}</div>
                        <div className="text-gray-400">Access Key ID:</div>
                        <div>{result.environmentVariables.accessKeyId}</div>
                        <div className="text-gray-400">Secret Access Key:</div>
                        <div>{result.environmentVariables.secretAccessKey}</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={testConnection}
            disabled={isLoading}
            className="w-full bg-[#CE8C2C] hover:bg-[#CE8C2C]/80 text-black"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Testing Connection...
              </>
            ) : (
              "Test Connection Again"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

