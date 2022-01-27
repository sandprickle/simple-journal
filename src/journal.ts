import * as db from './db'

export interface JournalEntry {
  journalId: string
  timestamp: number
  content: string
}

export const storeEntry = (entry: JournalEntry) => db.writeEntry(entry)

export const getEntries = (journalId: string) =>
  db.queryAllEntries(journalId).then((res) => res.Items)
