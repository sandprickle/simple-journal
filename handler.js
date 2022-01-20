const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb')
const { httpResponse } = require('./src/helpers.js')

const ddbClient = new DynamoDBClient()
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient)

export async function writeEntry(event) {
  return httpResponse(200, 'It seems to be working.')
}
