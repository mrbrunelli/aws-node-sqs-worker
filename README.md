## Offline AWS Serveless Worker

> AWS Worker with Node + SQS + Lambda

### Technologies

- [x] Serverless 2.5.x
- [x] Node 14.x
- [x] ElasticMQ latest

### How execute

1. Clone repo

```sh
git clone git@github.com:mrbrunelli/aws-node-sqs-worker.git
```

2. Setup Docker

```sh
yarn docker:up
```

3. Run Serverless Offline

```sh
yarn start:local
```

### Messages and Queues

> The SQS event is triggered after sending a message, with 5 seconds delay.

1. Call listQueue lambda to check queues url

```sh
curl http://localhost:3000/local/queues
```

2. Create new message. Message displays in serverless console.

```sh
curl --header "Content-Type: application/json" \
  --request POST \
  --data 'My message' \
  http://localhost:3000/local/produce
```
