import { EventEmitter } from 'node:events';

import { OrderModel } from '../../models';
import logger from '../logger';

interface EventMap {
  OrderPlaced: OrderModel;
  PaymentProcessed: OrderModel;
  StockFailed: OrderModel;
  StockReserved: OrderModel;
}

class ServiceEventBus extends EventEmitter {
  private static instance: ServiceEventBus;

  constructor() {
    super();
  }

  static getInstance(): ServiceEventBus {
    if (!ServiceEventBus.instance) {
      ServiceEventBus.instance = new ServiceEventBus();
    }
    return ServiceEventBus.instance;
  }

  override emit<K extends keyof EventMap>(event: K, payload: EventMap[K]): boolean {
    logger.info(`🚀  [ServiceEventBus] Emitting event: ${event} with payload: ${JSON.stringify(payload)}`);
    return super.emit(event, payload);
  }

  override on<K extends keyof EventMap>(event: K, listener: (payload: EventMap[K]) => void): this {
    logger.info(`👂  [ServiceEventBus] Listening for event: ${event}`);
    return super.on(event, listener);
  }
}

export { ServiceEventBus };
