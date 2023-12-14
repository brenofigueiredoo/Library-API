/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class verifyUserIsAdmMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const isAdm: boolean = req.user.isAdm;
    if (!isAdm) {
      throw new HttpException('Insufficient permission', HttpStatus.FORBIDDEN);
    }

    next();
  }
}
