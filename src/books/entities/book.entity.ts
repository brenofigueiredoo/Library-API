import { UserBookManager } from 'src/user_book_manager/entities/user_book_manager.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  genre: string;

  @Column({ type: 'date' })
  publicationDate: string | Date;

  @Column({ default: false })
  isBusy: boolean;

  @OneToMany(() => UserBookManager, (userBookManager) => userBookManager.book)
  userBookManager: UserBookManager[];
}
