import 'dotenv/config'
import { JournalEntry, storeEntry, getEntries } from './journal'
import { HttpResponse } from '@aws-sdk/types'
import * as yup from 'yup'

// HELPERS

const httpResponse = (code: number, message: string): HttpResponse => {
  return {
    headers: {
      accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Credentials': 'true',
    },
    statusCode: code,
    body: message,
  }
}

const validateEntry = (entry: JournalEntry): Promise<JournalEntry> => {
  const journalEntrySchema = yup
    .object({
      journalId: yup.string().defined().min(3),
      timestamp: yup.number().defined().integer(),
      content: yup.string().defined(),
    })
    .noUnknown()

  return journalEntrySchema.validate(entry, { strict: true })
}

//const validateJournalId = (journalId: string) => {
//return yup.string().min(3).defined().validate(journalId)
//}

// HANDLERS

export const createEntry = async (event: any) => {
  console.log(event)

  return validateEntry(JSON.parse(event.body))
    .then((entry) => storeEntry(entry))
    .catch((err) => {
      console.error(err)

      if (err.name && err.name === 'ValidationError')
        return httpResponse(400, JSON.stringify(err.errors))
      else return httpResponse(500, 'Yo something wonky happened')
    })
}

//export const getJournalEntries = async (event: any) => {
//console.log(event)

//return validateJournalId(event.queryStringParameters.journal)
//.then((journalId) => getEntries(journalId))
//.catch((err) => {
//console.error(err)

//if (err.name && err.name === 'ValidationError')
//return httpResponse(400, JSON.stringify(err.errors))
//else return httpResponse(500, 'Yo womething wonky happened')
//})
//}
