import { ServiceEventBus } from '../core/event-bus';
import { isOrder } from '../core/helper';
import logger from '../core/logger';

const event = ServiceEventBus.getInstance();

event.on('PaymentProcessed', (order: unknown) => {
  if (isOrder(order)) {
    logger.info(`📝  [OrderService] Order ${order.id} payment successful. Updating order status to "Paid"`);

    setTimeout(() => {
      logger.info(`📬  [OrderService] Order ${order.id} status updated to "Paid"`);
    }, 2000);
  }
});
