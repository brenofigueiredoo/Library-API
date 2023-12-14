import { PartialType } from '@nestjs/mapped-types';
import { CreateUserBookManagerDto } from './create-user_book_manager.dto';

export class UpdateUserBookManagerDto extends PartialType(CreateUserBookManagerDto) {}
