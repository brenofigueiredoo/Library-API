import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserBookManager } from './entities/user_book_manager.entity';
import {
  booksOfUserReturnSchema,
  userBookReturnSchema,
} from './schemas/userBookManager.schemas';

@Injectable()
export class UserBookManagerService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserBookManager)
    private readonly userBookManagerRepository: Repository<UserBookManager>,
  ) {}

  async create(bookId: string, userId: string) {
    const book: Book = await this.bookRepository.findOneBy({ id: bookId });
    const user: User = await this.userRepository.findOneBy({ id: userId });

    if (!book) {
      throw new HttpException('Book not found', HttpStatus.BAD_REQUEST);
    }

    if (book.isBusy) {
      throw new HttpException('Book already in use', HttpStatus.BAD_REQUEST);
    }

    await this.bookRepository.update(bookId, { isBusy: true });
    const bookUpdated: Book = await this.bookRepository.findOneBy({
      id: bookId,
    });

    const readBook = await this.userBookManagerRepository.save({
      book: bookUpdated,
      user,
    });

    return userBookReturnSchema.parse(readBook);
  }

  async findAllByUser(userId: string) {
    const user: User = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['userBookManager', 'userBookManager.book'],
    });

    return booksOfUserReturnSchema.parse(user);
  }

  async findOne(relationId: string) {
    const userBookManager = await this.userBookManagerRepository.findOne({
      where: { id: relationId },
      relations: ['book'],
    });

    if (!userBookManager) {
      throw new HttpException('Relation not found', HttpStatus.BAD_REQUEST);
    }

    return userBookManager;
  }

  async update(relationId: string) {
    const userBookManager = await this.userBookManagerRepository.findOne({
      where: { id: relationId },
      relations: ['book'],
    });

    if (!userBookManager) {
      throw new HttpException('Relation not found', HttpStatus.BAD_REQUEST);
    }

    const book: Book = await this.bookRepository.findOneBy({
      id: userBookManager.book.id,
    });

    if (!userBookManager.isBusyForYou) {
      throw new HttpException(
        'The book already unoccupied for you',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.bookRepository.update(book.id, { isBusy: false });
    await this.userBookManagerRepository.update(relationId, {
      isBusyForYou: false,
    });

    return { message: 'Successful return of the book' };
  }
}
