import { ServiceEventBus } from '../core/event-bus';
import { isOrder } from '../core/helper';
import logger from '../core/logger';

const event = ServiceEventBus.getInstance();

event.on('StockFailed', (order: unknown) => {
  if (isOrder(order)) {
    logger.error(`📢  [NotificationService] Order ${order.id} failed due to insufficient stock. Notifying user...`);
  }
});
