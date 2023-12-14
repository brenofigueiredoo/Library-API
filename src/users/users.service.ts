import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  returnMultipleUserSchema,
  userReturnSchema,
} from './schemas/users.schemas';
import { UserBookManager } from 'src/user_book_manager/entities/user_book_manager.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserBookManager)
    private readonly userBookManagerRepository: Repository<UserBookManager>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const userAlreadyExists = await this.userRepository.findOneBy({ email });

    if (userAlreadyExists) {
      throw new HttpException('User already exists', HttpStatus.CREATED);
    }

    const user: User = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);

    return userReturnSchema.parse(user);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return returnMultipleUserSchema.parse(users);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    return userReturnSchema.parse(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const oldUser = await this.userRepository.findOneBy({ id });
    const mergeUserData = { ...oldUser, ...updateUserDto };

    const updatedUser = this.userRepository.create(mergeUserData);
    await this.userRepository.save(updatedUser);

    return userReturnSchema.parse(updatedUser);
  }

  async remove(id: string) {
    await this.userBookManagerRepository.delete({
      user: { id },
    });

    await this.userRepository.delete({ id });
  }
}
