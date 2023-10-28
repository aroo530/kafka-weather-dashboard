const {Kafka, client} = require('kafkajs');
const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 3001;

io.on('connection', (socket) => {
    console.log('a user connected');

//     emit data to client
    socket.on('ok', (data) => {
        console.log('data received', data);
        io.emit('data', 'data received');
    });
});

app.get('/', (req, res) => {
    res.render('index');
});

console.log('listening on port ', port)
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});


const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
})

async function consume() {
    await consumer.connect()
    await consumer.subscribe({topic: 'my-topic2', fromBeginning: false})

    return await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log({
                message: message.value.toString(),
            })
            io.emit('data', JSON.parse(message.value.toString()));
            console.log('emitted')
        },
    })
    // await consumer.disconnect()
}

const consumer = kafka.consumer({groupId: 'my-group'})
consume().catch(console.error)

