import { z } from 'zod';

export const OrderItemSchema = z.object({
  name: z.string({ message: 'The name must be a string' }).trim().min(1, { message: 'The name cannot be empty' }),
  quantity: z
    .number({ message: 'The quantity must be a number' })
    .int('The quantity must be an integer')
    .positive('The quantity must be a positive number'),
});

export const OrderRequestSchema = z.object({
  items: z.array(OrderItemSchema).nonempty('The items must be an array of objects with name and quantity'),
});

export const OrderSchema = z
  .object({
    id: z.string().trim().min(1, { message: 'The id must be a non-empty string' }).trim(),
    type: z.literal('order'),
  })
  .merge(OrderRequestSchema);

export type OrderModel = z.infer<typeof OrderSchema>;
