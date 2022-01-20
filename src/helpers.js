export function httpResponse(code, message) {
  return {
    statusCode: code,
    body: JSON.stringify({
      message,
    }),
  }
}
