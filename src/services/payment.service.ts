import { random } from 'lodash-es';

import { ServiceEventBus } from '../core/event-bus';
import { isOrderModel } from '../core/helpers';
import logger from '../core/logger';

class PaymentService {
  private static serviceEventBus: ServiceEventBus;

  static initialize(serviceEventBus: ServiceEventBus) {
    this.serviceEventBus = serviceEventBus;
    this.setStockReservedListener();
  }

  private static setStockReservedListener() {
    this.serviceEventBus.on('StockReserved', (order: unknown) => {
      if (isOrderModel(order)) {
        logger.info(`💸  [PaymentService] Processing payment for order: ${JSON.stringify(order)}`);

        setTimeout(
          () => {
            logger.info(`✅  [PaymentService] Payment processed for order: ${JSON.stringify(order)}`);
            this.serviceEventBus.emit('PaymentProcessed', order);
          },
          random(500, 1500)
        );
      }
    });
  }
}

export { PaymentService };
