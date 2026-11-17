# rabit-send — Producer side

The **producer half** of a dockerized cart microservice that publishes
messages over **RabbitMQ**. Its counterpart lives in
[`rabit-receive`](https://github.com/JoseSleiter/rabit-receive) — the two together are the smallest
runnable version of the event-driven architecture, not a diagram of one.

## Why two repos

Because that is the point. A producer and a consumer that can only be run together, from two
separate deployables, is the difference between *claiming* you understand message queues and
being able to show the broker in the middle doing its job. Stop one side and the other keeps
accepting work: the queue absorbs it.

## Shape

```
api/
  index.js                 DB connection + port
  src/app.js               Express app and AMQP channel
  src/config/config.js     env-driven configuration
  src/controllers/         cart, client, address, product, features, items
  src/models/              Mongoose schemas
Dockerfile
```

Stack: Node.js · Express · `amqplib` · MongoDB (Mongoose) · Docker

## Running it

```bash
cd api
npm install
npm start          # needs a reachable RabbitMQ and MongoDB
```

Or build the image with the included `Dockerfile`. Run **both** repos plus a broker to see the
round trip.

## Honest status

A 2019 exercise, kept public because the pattern it shows still holds. The production version of
this idea — Flask and Node services behind a Kong gateway, RabbitMQ, and the Saga pattern for
transaction consistency — was built at Plan Salud C.A.
