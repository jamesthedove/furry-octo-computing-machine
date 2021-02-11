const amqplib = require('amqplib');
const db = require('./lib/mongodb');

const Order = require('./lib/models/order')

const QUEUE = process.env.ORDERS_QUEUE_NAME;

async function start() {
    try{
        await db.connect();
        const connection = await amqplib.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE);

        console.log('connected to rabbitmq');


        //process messages from the queue
        channel.consume(QUEUE, async function(msg) {
            if (msg !== null) {
                const pendingOrder = JSON.parse(msg.content.toString());

                //assuming payment is successful
                try{
                    await Order.findOneAndUpdate({_id: pendingOrder.orderId}, { orderStatus: 'fulfilled' });
                    channel.ack(msg);
                } catch (e) {
                    //something went wrong.
                    console.error(e);
                    channel.nack(msg);
                }

            }
        });
    } catch (e){
        console.log('could not connect to rabbitmq')
        process.exit(1);
    }

}

start();
