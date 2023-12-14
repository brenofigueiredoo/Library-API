import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userUpdateSchema } from './schemas/users.schemas';
import { NextFunction, Request, Response } from 'express';
import { verifyDataIsValidMiddleware } from 'src/middlewares/verifyDataIsValid.middleware';
import { verifyTokenIsValidMiddleware } from 'src/middlewares/verifyToken.middleware';
import { UserBookManager } from 'src/user_book_manager/entities/user_book_manager.entity';
import { verifyUserIsAdmMiddleware } from './middlewares/verifyUserIsAdm.middleware';
import { verifyUserEmailAlreadyExistsMiddleware } from './middlewares/verifyUserExists.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserBookManager])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(verifyTokenIsValidMiddleware)
      .forRoutes(
        { path: 'users/retrieve-user', method: RequestMethod.GET },
        { path: 'users/delete-user', method: RequestMethod.DELETE },
        { path: 'users/update-user', method: RequestMethod.PATCH },
      );

    consumer
      .apply(verifyTokenIsValidMiddleware, verifyUserIsAdmMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.GET });

    consumer
      .apply(
        (req: Request, res: Response, next: NextFunction) =>
          new verifyDataIsValidMiddleware(userUpdateSchema).use(req, res, next),
        verifyUserEmailAlreadyExistsMiddleware,
      )
      .forRoutes({ path: 'users/update-user', method: RequestMethod.PATCH });
  }
}
