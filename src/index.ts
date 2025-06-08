import express from 'express';

import logger from './core/logger';
import { orderRouter } from './rotues';
import './services/inventory.service';
import './services/notification.service';
import './services/order.service';
import './services/payment.service';

const server = express();

// default middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// routes
server.use('/api/order', orderRouter);

// start the server
server.listen(3000, async () => {
  logger.info(`🟢  Server is listening on port 3000`);
});
