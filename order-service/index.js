const grpc = require('@grpc/grpc-js');
const OrderService = require('./service');
const debug = require('debug')('order-service');
const service = new OrderService()
const db = require('./lib/mongodb');
const rabbitmq = require('./lib/rabbitmq');




async function start() {
    const server = new grpc.Server();
    server.addService(service.protoDefinition.OrderService.service, {createOrder: service.createOrder});

    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        debug('Server Started');
    });

    await db.connect();
    rabbitmq.connect();
}

start();
