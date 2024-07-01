const { Kafka, Partitioners } = require('kafkajs');

// Настройка Kafka
const kafka = new Kafka({
  clientId: 'payments-service',
  brokers: ['localhost:9092'], // Замени на адрес твоего Kafka-брокера
});

const consumer = kafka.consumer({ groupId: 'payment-group' });
const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });

const processPayment = (order) => {
  // Имитация обработки платежа
  const isSuccess = Math.random() > 0.2; 
  const paymentResult = {
    orderId: order.orderId,
    status: isSuccess ? 'success' : 'failure',
    processedAt: new Date().toISOString(),
  };
  return paymentResult;
};

const run = async () => {
  await consumer.connect();
  await producer.connect();
  
  await consumer.subscribe({ topic: 'orders', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const order = JSON.parse(message.value.toString());
      console.log('Received order:', order);

      const paymentResult = processPayment(order);
      console.log('Payment result:', paymentResult);

      await producer.send({
        topic: 'payments',
        messages: [
          { value: JSON.stringify(paymentResult) },
        ],
      });

      console.log('Payment result sent to Kafka');
    },
  });
};

run().catch(console.error);
