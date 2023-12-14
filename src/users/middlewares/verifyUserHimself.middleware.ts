/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class verifyUserHimselfMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const loggedUser: string = req.user.id;
    const paramsUser: string = req.params.id;

    if (loggedUser !== paramsUser) {
      throw new HttpException('Insufficient permission', HttpStatus.FORBIDDEN);
    }

    next();
  }
}
