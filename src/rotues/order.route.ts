import { Request, Response, Router } from 'express';
import createHttpError from 'http-errors';
import { isEmpty } from 'lodash-es';

import { ServiceEventBus } from '../core/event-bus';
import { hasOrderItem } from '../core/helper';
import logger from '../core/logger';
import { OrderModel } from '../models';

const event = ServiceEventBus.getInstance();
const orderRouter = Router();

orderRouter.post('/', (request: Request, response: Response) => {
  const { items } = request.body;

  if (isEmpty(items)) {
    const { message, status } = createHttpError(400, 'The items are required and must be a non-empty array');
    logger.error(
      `[${request.method}] request ${request.originalUrl} has been failed, payload: ${JSON.stringify(request.body ?? {})}, params: ${JSON.stringify(
        request.params ?? {}
      )}. Error: ${message}`
    );
    response.status(status).json({ message });
    return;
  }

  if (!hasOrderItem(items)) {
    const { message, status } = createHttpError(400, 'The items must be an array of objects with name and quantity');
    logger.error(
      `[${request.method}] request ${request.originalUrl} has been failed, payload: ${JSON.stringify(request.body ?? {})}, params: ${JSON.stringify(
        request.params ?? {}
      )}. Error: ${message}`
    );
    response.status(status).json({ message });
    return;
  }

  const order = {
    id: Math.floor(Math.random() * 10000),
    items,
    type: 'order',
  } satisfies OrderModel;

  event.emit('OrderPlaced', order);

  response.status(200).json(order);
  return;
});

export { orderRouter };
