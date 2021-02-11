let connection, channel;
module.exports = {
    async connect(){
        try{
            connection = await require('amqplib').connect(process.env.RABBITMQ_URL, {timeout: 5000,});
            channel = await connection.createChannel();
            console.log('connected to rabbitmq');
        } catch (e) {
            console.log('unable to connect to rabbitmq')
            process.exit(1);
        }


    },
    async pushToQueue(name, message){
        await channel.assertQueue(name);
        await channel.sendToQueue(name, Buffer.from(message));
    }
}
