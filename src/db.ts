import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient())

interface JournalEntry {
  journalId: string
  timestamp: string
  contents: string
}

export const storeEntry = (entry: JournalEntry) => {
  return `${entry} stored! (JK)`
}
