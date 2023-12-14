import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user_book_manager' })
export class UserBookManager {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: true })
  isBusyForYou: boolean;

  @ManyToOne(() => User, (user) => user.userBookManager)
  user: User;

  @ManyToOne(() => Book, (book) => book.userBookManager)
  book: Book;

  @CreateDateColumn({ type: 'date' })
  createdAt: string | Date;
}
