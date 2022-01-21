import { HttpResponse } from '@aws-sdk/types'
import 'dotenv/config'
import * as yup from 'yup'

export interface JournalEntry {
  journalId: string
  content: string
}

export const httpResponse = (code: number, message: string): HttpResponse => {
  return {
    headers: {
      accept: 'application/json',
    },
    statusCode: code,
    body: message,
  }
}

export const validateEntry = (entry: JournalEntry): Promise<JournalEntry> => {
  const journalEntrySchema = yup
    .object({
      journalId: yup.string().defined().min(3),
      content: yup.string().defined(),
    })
    .noUnknown()

  return journalEntrySchema.validate(entry, { strict: true })
}
