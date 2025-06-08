import { get } from 'lodash-es';

import { OrderItem, OrderModel } from '../../models';

export const isOrder = (args: unknown): args is OrderModel => {
  return get(args, 'type') === 'order';
};

export const hasOrderItem = (args: unknown[]): args is OrderItem[] => {
  if (!Array.isArray(args)) {
    return false;
  }

  if (args.length === 0) {
    return false;
  }

  return args.every((item) => typeof get(item, 'name') === 'string' && typeof get(item, 'quantity') === 'number');
};
