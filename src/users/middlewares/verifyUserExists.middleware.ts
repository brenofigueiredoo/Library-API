/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class verifyUserEmailAlreadyExistsMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async use(req: any, res: any, next: () => void) {
    const email = req.body.email;
    email === undefined && next();

    const user = await this.userRepository.findOne({
      where: {
        id: Not(req.user.id),
        email,
      },
    });

    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    next();
  }
}
