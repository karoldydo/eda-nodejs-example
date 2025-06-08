import { ServiceEventBus } from '../core/event-bus';
import { isOrder } from '../core/helper';
import logger from '../core/logger';

const event = ServiceEventBus.getInstance();

const stock: Record<string, number> = { apple: 10 };

event.on('OrderPlaced', (order: unknown) => {
  logger.info(`🛒  [InventoryService] Received order: ${JSON.stringify(order)}`);
  if (isOrder(order)) {
    let inStock = true;

    for (const item of order.items) {
      if (!stock[item.name] || stock[item.name] < item.quantity) {
        inStock = false;
        break;
      }
    }

    if (inStock) {
      for (const item of order.items) {
        stock[item.name] -= item.quantity;
      }
      logger.info(`📦  [InventoryService] Inventory updated: ${JSON.stringify(stock)}`);
      event.emit('StockReserved', order);
    } else {
      logger.info(`❌  [InventoryService] Insufficient stock for order: ${JSON.stringify(order)}`);
      event.emit('StockFailed', order);
    }
  }
});
