FROM mongo

COPY products.json /products.json
COPY customers.json /customers.json

COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]

