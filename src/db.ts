import * as dotenv from 'dotenv'
dotenv.config()

import { JournalEntry } from './helpers'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}))

export const storeEntry = (entry: JournalEntry) => {
  const put = new PutCommand({
    TableName: process.env.DYNAMODB_TABLE,
    Item: entry,
  })
  return ddbDocClient.send(put)
}
