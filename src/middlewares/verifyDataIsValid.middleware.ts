/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue, ZodTypeAny } from 'zod';

@Injectable()
export class verifyDataIsValidMiddleware implements NestMiddleware {
  constructor(private readonly schema: ZodTypeAny) {}

  use(req: Request, res: Response, next: NextFunction): void {
    try {
      const validated: Partial<Request> = this.schema.parse(req.body);
      req.body = validated;

      const validatedKeys: Array<string> = Object.keys(validated);
      if (!validatedKeys.length) {
        throw new HttpException(
          'One of the fields must be defined',
          HttpStatus.BAD_REQUEST,
        );
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = this.formatZodErrorMessage(error.errors);
        res.status(HttpStatus.BAD_REQUEST).json({ message: errorMessage });
      } else {
        next(error);
      }
    }
  }

  private formatZodErrorMessage(errors: ZodIssue[]): string {
    return errors
      .map((error) => {
        return `${error.path.join('.')} ${error.message}`;
      })
      .join(', ');
  }
}
