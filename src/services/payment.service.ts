import { ServiceEventBus } from '../core/event-bus';
import { isOrder } from '../core/helper';
import logger from '../core/logger';

const event = ServiceEventBus.getInstance();

event.on('StockReserved', (order: unknown) => {
  if (isOrder(order)) {
    logger.info(`💸  [PaymentService] Processing payment for order: ${JSON.stringify(order)}`);

    setTimeout(() => {
      logger.info(`✅  [PaymentService] Payment processed for order: ${JSON.stringify(order)}`);
      event.emit('PaymentProcessed', order);
    }, 3000);
  }
});
