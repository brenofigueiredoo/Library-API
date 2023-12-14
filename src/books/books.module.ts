import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { verifyBookExistsMiddleware } from './middlewares/verifyBookExists.middleware';
import { verifyTokenIsValidMiddleware } from 'src/middlewares/verifyToken.middleware';
import { verifyUserIsAdmMiddleware } from 'src/users/middlewares/verifyUserIsAdm.middleware';
import { verifyDataIsValidMiddleware } from 'src/middlewares/verifyDataIsValid.middleware';
import { bookSchema, bookUpdateSchema } from './schemas/books.schemas';
import { NextFunction, Request, Response } from 'express';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        verifyTokenIsValidMiddleware,
        verifyUserIsAdmMiddleware,
        verifyBookExistsMiddleware,
      )
      .forRoutes(
        { path: 'books/:id', method: RequestMethod.DELETE },
        { path: 'books/:id', method: RequestMethod.PATCH },
      );

    consumer
      .apply(verifyBookExistsMiddleware)
      .forRoutes({ path: 'books/:id', method: RequestMethod.GET });

    consumer
      .apply((req: Request, res: Response, next: NextFunction) =>
        new verifyDataIsValidMiddleware(bookSchema).use(req, res, next),
      )
      .forRoutes({ path: 'books', method: RequestMethod.POST });

    consumer
      .apply((req: Request, res: Response, next: NextFunction) =>
        new verifyDataIsValidMiddleware(bookUpdateSchema).use(req, res, next),
      )
      .forRoutes({ path: 'books:id', method: RequestMethod.PATCH });
  }
}
