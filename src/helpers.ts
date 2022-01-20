export const httpResponse = (code: number, message: string): HttpResponse => {
  return {
    statusCode: code,
    body: JSON.stringify({
      message,
    }),
  }
}
