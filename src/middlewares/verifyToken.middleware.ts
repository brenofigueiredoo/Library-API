/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class verifyTokenIsValidMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const authToken: string | undefined = req.headers.authorization;
    if (!authToken) {
      throw new HttpException('Missing bearer token', HttpStatus.UNAUTHORIZED);
    }
    const token: string = authToken.split(' ')[1];

    verify(
      token,
      String(process.env.SECRET_KEY)!,
      (error: any, decoded: any) => {
        if (error) {
          throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
        }
        req.user = {
          id: String(decoded.sub),
          isAdm: decoded.isAdm,
        };
      },
    );

    next();
  }
}
