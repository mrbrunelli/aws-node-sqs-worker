const { SQS } = require('aws-sdk')

const sqs = new SQS({ region: process.env.REGION })

exports.producer = async (event) => {
  const message = {
    message: event.body,
    created_at: new Date().toISOString()
  }

  await sqs.sendMessage({
    MessageBody: JSON.stringify(message),
    QueueUrl: process.env.QUEUE_URL,
    DelaySeconds: 0
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify('Message sent!')
  }
}

exports.consumer = async (event) => {
  console.log(event)
}
