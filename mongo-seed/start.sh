#!/bin/bash
mongoimport --host mongo --db ecommerce --collection customers --type json --file /customers.json --jsonArray
mongoimport --host mongo --db ecommerce --collection products --type json --file /products.json --jsonArray
