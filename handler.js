const AWS = require('aws-sdk')

const sqs = new AWS.SQS({
  endpoint: new AWS.Endpoint(process.env.ELASTICMQ_URL),
  region: process.env.REGION
})

exports.producer = async (event) => {
  const message = {
    message: event.body,
    created_at: new Date().toISOString()
  }

  await sqs.sendMessage({
    MessageBody: JSON.stringify(message),
    QueueUrl: process.env.QUEUE_URL,
    DelaySeconds: 5
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify('Message sent!')
  }
}

exports.consumer = async (event) => {
  for (message of event.Records) {
    const body = JSON.parse(message.body)
    console.log(`Message received: ${body.message}`)

    await sqs.deleteMessage({
      QueueUrl: process.env.QUEUE_URL,
      ReceiptHandle: message.receiptHandle
    }).promise()

    console.log(`Message ${message.messageId} deleted!`)
  }
}

exports.listQueues = async (event) => {
  const { QueueUrls } = await sqs.listQueues().promise()

  return {
    statusCode: 200,
    body: JSON.stringify({
      queues: QueueUrls
    })
  }
}
