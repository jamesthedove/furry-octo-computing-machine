const BaseService = require('./lib/base_service')

const rabbitmq = require('./lib/rabbitmq');


const PROTO_PATH = './protos/order_service.proto';

const Customer = require('./lib/models/customer');
const Product = require('./lib/models/product');
const Order = require('./lib/models/order');

class OrdersService extends BaseService{

    constructor() {
        super(PROTO_PATH, 'order_service', 'OrderService', null);
    }

    /**
     * This is the implementation of the createOrder service defined in the proto file
     * @param call contains the client's request
     * @param callback
     */
    async createOrder(call, callback){

        const {customerId, productId} = call.request;

        try{
            const customer = await Customer.findOne({customerId});

            const product = await Product.findOne({productId});

            if (!customer || !product){
                return callback(new Error('Cannot retrieve customer or product'));
            }

            const order = await new Order({ productId, customerId}).save();

            // push the order to rabbitmq to be consumed by the payment service
            await rabbitmq.pushToQueue(process.env.ORDERS_QUEUE_NAME, JSON.stringify({
                customerId,
                productId,
                orderId: order.id,
                orderStatus: order.get('orderStatus'),
            }))

            callback(null, {
                customerId,
                productId,
                orderId: order.id,
                orderStatus: order.get('orderStatus'),
            });

        } catch (e) {
            callback(e, {});
        }

    }

}

module.exports = OrdersService;
