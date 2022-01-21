import * as yup from 'yup'

const journalEntrySchema = yup
  .object({
    journalId: yup.string().defined().min(3),
    contents: yup.string().defined(),
  })
  .noUnknown()

//export interface JournalEntry
//extends yup.InferType<typeof journalEntrySchema> {}

export interface JournalEntry {
  journalId: string
  contents: string
}

export const httpResponse = (code: number, message: string) => {
  return {
    statusCode: code,
    body: JSON.stringify({
      message,
    }),
  }
}

export const validateEntry = (entry: JournalEntry): Promise<JournalEntry> => {
  return journalEntrySchema.validate(entry, { strict: true })
}
