import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Title must have atleast 3 characters.' })
  title: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Author must have atleast 3 characters.' })
  author: string;

  @MinLength(3, { message: 'Genre must have atleast 3 characters.' })
  @IsNotEmpty()
  genre: string;

  @IsNotEmpty()
  publicationDate: string | Date;
}
