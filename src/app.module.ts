import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { UsersModule } from './users/users.module';
import { UserBookManagerModule } from './user_book_manager/user_book_manager.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    BooksModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    UserBookManagerModule,
    LoginModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
