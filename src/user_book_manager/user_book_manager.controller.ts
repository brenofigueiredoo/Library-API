import { Controller, Get, Post, Patch, Param, Req } from '@nestjs/common';
import { UserBookManagerService } from './user_book_manager.service';
import { Request } from 'express';

@Controller('user-books')
export class UserBookManagerController {
  constructor(
    private readonly userBookManagerService: UserBookManagerService,
  ) {}

  @Post('create-relation/:bookId')
  create(@Param('bookId') bookId: string, @Req() request: Request) {
    const userId = request.user.id;
    return this.userBookManagerService.create(bookId, userId);
  }

  @Get('list-relations')
  findAllByUser(@Req() request: Request) {
    return this.userBookManagerService.findAllByUser(request.user.id);
  }

  @Get('retrieve-relation/:relationId')
  findOne(@Param('relationId') relationId: string) {
    return this.userBookManagerService.findOne(relationId);
  }

  @Patch('update-relation/:relationId')
  update(@Param('relationId') relationId: string) {
    return this.userBookManagerService.update(relationId);
  }
}
