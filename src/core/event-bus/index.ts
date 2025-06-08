import { EventEmitter } from 'node:events';

import logger from '../logger';

class ServiceEventBus extends EventEmitter {
  private static instance: ServiceEventBus;

  private constructor() {
    super();
  }

  public static getInstance(): ServiceEventBus {
    if (!ServiceEventBus.instance) {
      ServiceEventBus.instance = new ServiceEventBus();
    }
    return ServiceEventBus.instance;
  }

  override emit(event: string | symbol, ...args: unknown[]): boolean {
    logger.info(`🚀  [ServiceEventBus] Emitting event: ${event.toString()} with args: ${JSON.stringify(args)}`);
    return super.emit(event, ...args);
  }

  override on(event: string | symbol, listener: (...args: unknown[]) => void): this {
    logger.info(`👂  [ServiceEventBus] Listening for event: ${event.toString()}`);
    return super.on(event, listener);
  }
}

export { ServiceEventBus };
