import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

const ddbClient = new DynamoDBClient({})

// Type Definitions

interface HttpResponse {
  statusCode: number
  body: string
}

interface JournalEntry {
  journalId: string
  timestamp: string
  contents: string
}

// General Helpers

const httpResponse = (code: number, message: string): HttpResponse => {
  return {
    statusCode: code,
    body: JSON.stringify({
      message,
    }),
  }
}

// DB Helpers

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient)

// Handlers

export const createEntry = async function createNewJournalEntry(event: ht) {
  return httpResponse(200, 'It seems to be working.')
}
