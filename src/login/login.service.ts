import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { compareSync } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createLoginDto: CreateLoginDto) {
    const user: User | null = await this.userRepository.findOneBy({
      email: createLoginDto.email,
    });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const passwordMatch = compareSync(createLoginDto.password, user.password);

    if (!passwordMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const token: string = jwt.sign(
      { isAdm: user.isAdm },
      String(process.env.SECRET_KEY),
      {
        expiresIn: '24h',
        subject: String(user.id),
      },
    );

    return { token: token };
  }
}
