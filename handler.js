const { SQS } = require("aws-sdk");

const sqs = new SQS()

exports.producer = async (event) => {
  console.log(event)
}

exports.consumer = async (event) => {
  console.log(event)
}
