
# Payment Processing System

This repository contains a sample payment processing system built using Bun and Kafka for messaging.

## Services

### 1. Order Service

The Order Service is responsible for receiving and processing orders. It publishes order information to the `orders` Kafka topic.

- **Language**: TypeScript
- **File**: `order-service.ts`

### 2. Payments Service

The Payments Service processes payment transactions based on received orders. It publishes payment results to the `payments` Kafka topic.

- **Language**: TypeScript
- **File**: `payments-service.ts`

### 3. Payments Consumer Test

The Payments Consumer Test is a consumer application that listens to the `payments` Kafka topic and prints payment information to the console.

- **Language**: TypeScript
- **File**: `paymentsConsumerTest.ts`

## Prerequisites

Before running the services, ensure you have the following installed:

- Bun
- Kafka

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/payment-processing.git
   cd app
   ```

2. **Install dependencies:**

   ```bash
   bun install
   ```

3. **Configure Kafka:**

   Make sure Kafka is running locally or update the Kafka broker addresses in the TypeScript files (`order-service.ts`, `payments-service.ts`, `paymentsConsumerTest.ts`) to point to your Kafka setup.

## Running the Services

### 1. Order Service

Run the Order Service to start receiving and processing orders.

```bash
bun run order-service.ts
```

### 2. Payments Service

Run the Payments Service to process payments and publish results to Kafka.

```bash
bun run payments-service.ts
```

### 3. Payments Consumer Test

Run the Payments Consumer Test to listen to payment results from the `payments` topic.

```bash
bun run paymentsConsumerTest.ts
```

## Contributing

Feel free to contribute by opening issues or pull requests. Follow the [contributing guidelines](CONTRIBUTING.md).

