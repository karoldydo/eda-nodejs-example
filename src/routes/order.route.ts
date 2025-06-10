import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { ServiceEventBus } from '../core/event-bus';
import { bodySchemaValidatorMiddleware } from '../core/middlewares';
import { OrderModel, OrderRequestSchema } from '../models';

const serviceEventBus = ServiceEventBus.getInstance();
const orderRouter = Router();

orderRouter.post('/', bodySchemaValidatorMiddleware(OrderRequestSchema), (request: Request, response: Response) => {
  const { items } = request.body;

  const order = {
    id: uuidv4(),
    items,
    type: 'order',
  } satisfies OrderModel;

  serviceEventBus.emit('OrderPlaced', order);

  response.status(200).json(order);
  return;
});

export { orderRouter };
