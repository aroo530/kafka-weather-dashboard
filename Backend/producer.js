const {Kafka} = require('kafkajs');
const https = require('https');

// Create a new Kafka instance
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'] // replace with your broker's address
});
const producer = kafka.producer();

async function main() {
    for (let index = 0; index < 15; index++) {
        const data = await getWeatherData();
        await produceMessage([
            {value: data}
        ]);
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

main().catch(console.error);

async function produceMessage(message) {
    await producer.connect();

    await producer.send({
        topic: 'my-topic2',
        messages: message
    });
    console.log('Message sent');

    await producer.disconnect();
}

async function getWeatherData() {
    const options = {
        method: 'GET',
        hostname: 'weatherapi-com.p.rapidapi.com',
        port: null,
        path: '/current.json?q=31.2001%2C29.9187',
        headers: {
            'X-RapidAPI-Key': '037cfa85f8msh0f588bd1d310858p1559a6jsn8b823a4c645c',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    const data = await new Promise((resolve, reject) => {
        const req = https.request(options, function (res) {
            const chunks = [];

            res.on('data', function (chunk) {
                chunks.push(chunk);
            });

            res.on('end', function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });

        req.end();
    });
    console.log('Data received', data);

    return data;
}
