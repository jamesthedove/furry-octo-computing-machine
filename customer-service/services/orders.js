const BaseService = require('../lib/base_service')

const PROTO_PATH = './protos/order_service.proto';


class OrdersService extends BaseService{

    constructor() {
        super(PROTO_PATH, 'order_service', 'OrderService', 'order-service:50051');
    }

    createOrder(customerId, productId){
        return new Promise((resolve, reject) => {
            this.client.createOrder({customerId, productId}, function(err, response) {
                if (err){
                    return reject(err);
                }
                resolve(response);
            });
        });

    }

}

module.exports = OrdersService;
