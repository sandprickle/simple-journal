import 'dotenv/config'
import { JournalEntry } from './journal'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb'

const ddbDocClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: process.env.REGION,
  })
)

export const writeEntry = (entry: JournalEntry) => {
  return ddbDocClient.send(
    new PutCommand({
      TableName: process.env.DYNAMODB_TABLE,
      Item: entry,
    })
  )
}

export const queryAllEntries = (journalId: string) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    ExpressionAttributeValues: {
      ':id': journalId,
    },
    KeyConditionExpression: 'journalId = :id',
    //FilterExpression: '',
  }
  return ddbDocClient.send(new QueryCommand(params))
}
