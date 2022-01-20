'use strict'

module.exports.writeEntry = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'you did it my good sir.',
        input: event,
      },
      null,
      2
    ),
  }
}

//module.exports.hello = async (event) => {
//return {
//statusCode: 200,
//body: JSON.stringify(
//{
//message: 'Go Serverless v2.0! Your function executed successfully!',
//input: event,
//},
//null,
//2
//),
//}
//}
