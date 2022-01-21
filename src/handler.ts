import { httpResponse, validateEntry } from './helpers'
import { storeEntry } from './db'

const createEntry = async function createNewJournalEntry(event: any) {
  try {
    const entry = await validateEntry(event.body)

    const res = await storeEntry(entry)
    console.log(res)
  } catch (err) {
    console.error(err)
  }
  return httpResponse(200, 'It seems to be working.')
}
