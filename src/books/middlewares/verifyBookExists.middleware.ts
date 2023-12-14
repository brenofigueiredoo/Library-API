/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class verifyBookExistsMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async use(req: any, res: any, next: () => void) {
    const book = await this.bookRepository.findOneBy({
      id: req.params.id,
    });

    if (!book) {
      throw new HttpException('Book not found', HttpStatus.BAD_REQUEST);
    }

    next();
  }
}
