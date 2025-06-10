import { z } from 'zod';

export const OrderItemSchema = z.object({
  name: z.string(),
  quantity: z.number().int().positive(),
});

export const OrderRequestSchema = z.object({
  items: z.array(OrderItemSchema),
});

export const OrderSchema = z
  .object({
    id: z.string(),
    type: z.literal('order'),
  })
  .merge(OrderRequestSchema);

export type OrderModel = z.infer<typeof OrderSchema>;
