import { httpResponse, validateEntry } from './helpers'
import { storeEntry } from './db'

export const createEntry = async (event: any) => {
  return validateEntry(event.body)
    .then((entry) => storeEntry(entry))
    .catch((err) => {
      if (err.type && err.type === 'ValidationError')
        return httpResponse(400, JSON.stringify(err.errors))
      else return httpResponse(500, JSON.stringify(err))
    })
}
