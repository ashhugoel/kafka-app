FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENTRYPOINT ["node"]
CMD ["admin.js"]

# docker run --name admin -it --rm \
#   -e KAFKA_BROKERS=host.docker.internal:9092 \
#   --entrypoint sh \
#   kafka-practice
