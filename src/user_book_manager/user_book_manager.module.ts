import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserBookManagerService } from './user_book_manager.service';
import { UserBookManagerController } from './user_book_manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBookManager } from './entities/user_book_manager.entity';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';
import { verifyTokenIsValidMiddleware } from 'src/middlewares/verifyToken.middleware';
import { verifyRelationshipBelongsToTheUser } from './middlewares/verifyRelationshipBelongsToTheUser.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UserBookManager, User, Book])],
  controllers: [UserBookManagerController],
  providers: [UserBookManagerService],
})
export class UserBookManagerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyTokenIsValidMiddleware).forRoutes(
      {
        path: 'user-books/create-relation/:bookId',
        method: RequestMethod.POST,
      },
      { path: 'user-books/list-relations', method: RequestMethod.GET },
    );

    consumer
      .apply(verifyTokenIsValidMiddleware, verifyRelationshipBelongsToTheUser)
      .forRoutes(
        {
          path: 'user-books/retrieve-relation/:relationId',
          method: RequestMethod.GET,
        },
        {
          path: 'user-books/update-relation/:relationId',
          method: RequestMethod.PATCH,
        },
      );
  }
}
