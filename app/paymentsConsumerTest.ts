const { Kafka } = require('kafkajs');

// Настройка Kafka
const kafka = new Kafka({
  clientId: 'payment-consumer',
  brokers: ['localhost:9092'], // Замени на адрес твоего Kafka-брокера
});

const consumer = kafka.consumer({ groupId: 'inventory-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'payments', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const paymentInfo = JSON.parse(message.value.toString());
      console.log('Received payment:', paymentInfo);
    },
  });
};

run().catch(console.error);
