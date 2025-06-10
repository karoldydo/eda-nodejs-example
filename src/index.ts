import express from 'express';

import { ServiceEventBus } from './core/event-bus';
import logger from './core/logger';
import './services/notification.service';
import './services/order.service';
import './services/payment.service';
import { orderRouter } from './routes';
import { InventoryService, NotificationService, OrderService, PaymentService } from './services';

const server = express();

// initialize services with the event bus
const instance = ServiceEventBus.getInstance();
InventoryService.initialize(instance);
NotificationService.initialize(instance);
OrderService.initialize(instance);
PaymentService.initialize(instance);

// default middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// routes
server.use('/api/order', orderRouter);

// start the server
server.listen(3000, async () => {
  logger.info(`🟢  Server is listening on port 3000`);
});
