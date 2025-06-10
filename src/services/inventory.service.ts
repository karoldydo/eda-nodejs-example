import { random } from 'lodash-es';

import { ServiceEventBus } from '../core/event-bus';
import { isOrderModel } from '../core/helpers';
import logger from '../core/logger';

class InventoryService {
  private static stock: Record<string, number> = { apple: 10 };
  private static serviceEventBus: ServiceEventBus;

  static initialize(serviceEventBus: ServiceEventBus) {
    this.serviceEventBus = serviceEventBus;
    this.setOrderPlacedListener();
  }

  private static setOrderPlacedListener() {
    this.serviceEventBus.on('OrderPlaced', (order: unknown) => {
      logger.info(`🛒  [InventoryService] Received order: ${JSON.stringify(order)}`);

      if (!isOrderModel(order)) {
        logger.error(`[InventoryService] Invalid order format: ${JSON.stringify(order)}`);
        return;
      }

      const inStock = order.items.every((item) => (this.stock[item.name] ?? 0) >= item.quantity);

      if (inStock) {
        for (const item of order.items) {
          this.stock[item.name] -= item.quantity;
        }
        setTimeout(
          () => {
            logger.info(`📦  [InventoryService] Inventory updated: ${JSON.stringify(this.stock)}`);
            this.serviceEventBus.emit('StockReserved', order);
          },
          random(500, 1500)
        );
      } else {
        setTimeout(
          () => {
            logger.info(`❌  [InventoryService] Insufficient stock for order: ${JSON.stringify(order)}`);
            this.serviceEventBus.emit('StockFailed', order);
          },
          random(500, 1500)
        );
      }
    });
  }
}

export { InventoryService };
