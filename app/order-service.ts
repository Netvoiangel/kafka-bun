const { Kafka, Partitioners } = require('kafkajs');
const readlineSync = require('readline-sync');

// Настройка Kafka
const kafka = new Kafka({
  clientId: 'order-service',
  brokers: ['localhost:9092'], // Замени на адрес твоего Kafka-брокера
});

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });

const run = async () => {
  await producer.connect();

  console.log("Order Service is running. Enter 'exit' to quit.");

  while (true) {
    const userId = readlineSync.question('Enter user ID: ');
    if (userId.toLowerCase() === 'exit') break;

    const items = readlineSync.question('Enter items (format: item1:quantity1,item2:quantity2): ');
    if (items.toLowerCase() === 'exit') break;

    const totalAmount = readlineSync.question('Enter total amount: ');
    if (totalAmount.toLowerCase() === 'exit') break;

    const order = {
      orderId: `order-${Date.now()}`,
      userId,
      items: items.split(',').map(item => {
        const [id, quantity] = item.split(':');
        return { id, quantity: Number(quantity) };
      }),
      totalAmount: Number(totalAmount),
    };

    console.log('Order received:', order);

    await producer.send({
      topic: 'orders',
      messages: [
        { value: JSON.stringify(order) },
      ],
    });

    console.log('Order sent to Kafka');
  }

  await producer.disconnect();
};

run().catch(console.error);
