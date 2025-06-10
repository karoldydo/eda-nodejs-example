import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { z } from 'zod';

import logger from '../logger';

const validateSchemaMiddleware =
  (schema: z.Schema) => async (request: Request, response: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync(request.body);
    if (!result.success) {
      const { message, status } = createHttpError(400, 'The items must be an array of objects with name and quantity');
      logger.error(
        `[${request.method}] request ${request.originalUrl} has been failed, payload: ${JSON.stringify(request.body ?? {})}, params: ${JSON.stringify(
          request.params ?? {}
        )}. Error: ${message}`
      );
      response.status(status).json({ message });
      return;
    }
    request.body = result.data;
    next();
  };

export { validateSchemaMiddleware };
