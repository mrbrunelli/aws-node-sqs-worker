const { SQS } = require("aws-sdk");

const sqs = new SQS()

exports.producer = async (event) => {
  console.log(process.env.QUEUE_URL)
}

exports.consumer = async (event) => {
  console.log(event)
}
