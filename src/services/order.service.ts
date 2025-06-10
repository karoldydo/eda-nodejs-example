import { random } from 'lodash-es';

import { ServiceEventBus } from '../core/event-bus';
import { isOrderModel } from '../core/helpers';
import logger from '../core/logger';

class OrderService {
  private static serviceEventBus: ServiceEventBus;

  static initialize(serviceEventBus: ServiceEventBus) {
    this.serviceEventBus = serviceEventBus;
    this.setPaymentProcessedListener();
  }

  private static setPaymentProcessedListener() {
    this.serviceEventBus.on('PaymentProcessed', (order: unknown) => {
      if (isOrderModel(order)) {
        logger.info(`📝  [OrderService] Order ${order.id} payment successful. Updating order status to "Paid"`);

        setTimeout(
          () => {
            logger.info(`📬  [OrderService] Order ${order.id} status updated to "Paid"`);
          },
          random(500, 1500)
        );
      }
    });
  }
}

export { OrderService };
