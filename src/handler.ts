import 'dotenv/config'
import { JournalEntry, storeEntry, getEntries } from './journal'
import { HttpResponse } from '@aws-sdk/types'
import * as yup from 'yup'

// HELPERS

const httpResponse = (code: number, message: string): HttpResponse => {
  return {
    headers: {
      accept: 'application/json',
    },
    statusCode: code,
    body: message,
  }
}

const validateEntry = (entry: JournalEntry): Promise<JournalEntry> => {
  const isoDateExp =
    /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/

  const journalEntrySchema = yup
    .object({
      journalId: yup.string().defined().min(3),
      timestamp: yup.string().matches(isoDateExp).defined(),
      content: yup.string().defined(),
    })
    .noUnknown()

  return journalEntrySchema.validate(entry, { strict: true })
}

const validateJournalId = (journalId: string) => {
  return yup.string().min(3).defined().validate(journalId)
}

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

export const getJournalEntries = async (event: any) => {
  console.log(event)

  return validateJournalId(JSON.parse(event.body).journalId)
    .then((journalId) => getEntries(journalId))
    .catch((err) => {
      console.error(err)

      if (err.name && err.name === 'ValidationError')
        return httpResponse(400, JSON.stringify(err.errors))
      else return httpResponse(500, 'Yo womething wonky happened')
    })
}
