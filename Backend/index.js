const express = require('express');
const https = require('https');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

const { Kafka } = require('kafkajs');
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});
const producer = kafka.producer();


app.use(express.json());

app.get('/', (req, res) => {
  res.json('Hello World!');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (data) => {
    console.log(data);
    produceMessage(data);
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

async function produceMessage(message) {
  await producer.connect();
  await producer.send({
    topic: 'my-topic',
    messages: [
      { value: message }
    ]
  });
  await producer.disconnect();
}

function getWeatherData() {
  const options = {
    method: 'GET',
    hostname: 'weatherapi-com.p.rapidapi.com',
    port: null,
    path: '/current.json?q=53.1%2C-0.13',
    headers: {
      'X-RapidAPI-Key': '037cfa85f8msh0f588bd1d310858p1559a6jsn8b823a4c645c',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  const req = https.request(options, function (res) {
    const chunks = [];

    res.on('data', function (chunk) {
      chunks.push(chunk);
    });

    res.on('end', function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
      
    });
  });

  req.end();
}
