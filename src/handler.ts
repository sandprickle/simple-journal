import 'dotenv/config'
import { httpResponse, validateEntry } from './helpers'
import { storeEntry } from './journal'

export const createEntry = async (event: any) => {
  return validateEntry(event.body)
    .then((entry) => storeEntry(entry))
    .catch((err) => {
      console.error(err)
      if (err.name && err.name === 'ValidationError')
        return httpResponse(400, JSON.stringify(err.errors))
      else return httpResponse(500, 'Yo something wonky happened')
    })
}
