/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { UserBookManager } from '../entities/user_book_manager.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class verifyRelationshipBelongsToTheUser implements NestMiddleware {
  constructor(
    @InjectRepository(UserBookManager)
    private readonly userBookRepository: Repository<UserBookManager>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userBookManager = await this.userBookRepository.findOne({
      where: {
        id: req.params.relationId,
        user: { id: req.user.id },
      },
    });

    if (!userBookManager) {
      throw new HttpException('Insufficient permission', HttpStatus.NOT_FOUND);
    }

    next();
  }
}
