# ecommerce-services

## Requirements
Docker and docker compose are required to build or run this application

## Getting Started
To start the application, please run the following command

```shell script
 docker-compose up 
```

Please note that the application might take about 60 seconds to start due to the dependencies on waiting for mongodb and rabbitmq

## Dummy Data
The database is initially seeded with a product and customer which can be used with the API immediately the application is started.

```json
{
	"customerId": "customer1",
	"productId": "product1"
}
```
## API
The application only has one exposed endpoint to the public, which is the customer service running on port `3000`

To create an order
```shell script
curl --request POST \
  --url http://localhost:3000/orders \
  --header 'Content-Type: application/json' \
  --data '{
	"customerId": "customer1",
	"productId": "product1"
}'
```
This will forward the request to the `order-service` which will return a response.
The order is then processed in the background by the `payment-service` which marks the order as fulfilled or unfulfilled.

## Limitations
There is currently no product service because there's no functionality that requires that at the moment.

Each service contains a `lib` folder with similar codes that are used across all services, in an ideal situation, this will be isolated to a separate repository or npm package and be shared amongst the services.
 
