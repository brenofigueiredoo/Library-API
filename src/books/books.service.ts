import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  bookReturnSchema,
  returnMultipleBookSchema,
} from './schemas/books.schemas';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const { title } = createBookDto;

    const bookAlreadyExists = await this.bookRepository.findOneBy({ title });

    if (bookAlreadyExists) {
      throw new HttpException('Book already exists', HttpStatus.FORBIDDEN);
    }

    const book: Book = this.bookRepository.create(createBookDto);
    await this.bookRepository.save(book);

    return bookReturnSchema.parse(book);
  }

  async findAll() {
    const books = await this.bookRepository.find();
    return returnMultipleBookSchema.parse(books);
  }

  async findOne(id: string) {
    const book = await this.bookRepository.findOneBy({ id });
    return bookReturnSchema.parse(book);
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const oldBook = await this.bookRepository.findOneBy({ id });
    const mergeBookData = { ...oldBook, ...updateBookDto };

    const updatedBook = this.bookRepository.create(mergeBookData);
    await this.bookRepository.save(updatedBook);

    return bookReturnSchema.parse(updatedBook);
  }

  async remove(id: string) {
    const book = await this.bookRepository.findOneBy({ id });

    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    await this.bookRepository.delete(id);
  }
}
