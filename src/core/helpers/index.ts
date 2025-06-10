import { get } from 'lodash-es';

import { OrderModel } from '../../models';

export const isOrderModel = (args: unknown): args is OrderModel => {
  return get(args, 'type') === 'order';
};
