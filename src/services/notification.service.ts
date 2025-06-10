import { random } from 'lodash-es';

import { ServiceEventBus } from '../core/event-bus';
import { isOrderModel } from '../core/helpers';
import logger from '../core/logger';

class NotificationService {
  private static serviceEventBus: ServiceEventBus;

  static initialize(serviceEventBus: ServiceEventBus) {
    this.serviceEventBus = serviceEventBus;
    this.setStockReservedListener();
  }

  private static setStockReservedListener() {
    this.serviceEventBus.on('StockFailed', (order: unknown) => {
      if (isOrderModel(order)) {
        setTimeout(
          () => {
            logger.error(
              `📢  [NotificationService] Order ${order.id} failed due to insufficient stock. Notifying user...`
            );
          },
          random(500, 1500)
        );
      }
    });
  }
}

export { NotificationService };
