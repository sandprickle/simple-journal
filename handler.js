import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { httpResponse } from './src/helpers.js'

const ddbClient = new DynamoDBClient()
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient)

export async function writeEntry(event) {
  return httpResponse(200, 'It seems to be working.')
}
