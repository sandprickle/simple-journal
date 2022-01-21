import 'dotenv/config'
import { JournalEntry } from './helpers'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}))

export const storeEntry = (entry: JournalEntry) => {
  const table = process.env.DYNAMODB_TABLE || 'test'
  const put = new PutCommand({
    TableName: table,
    Item: {
      timestamp: new Date().toISOString(),
      ...entry,
    },
  })
  return ddbDocClient.send(put)
}
