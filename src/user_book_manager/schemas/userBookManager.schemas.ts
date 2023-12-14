/* eslint-disable prettier/prettier */
import { bookReturnSchema } from 'src/books/schemas/books.schemas';
import { userSchema } from 'src/users/schemas/users.schemas';
import { z } from 'zod';

const userBookReturnSchema = z.object({
  id: z.string(),
  isBusyForYou: z.boolean(),
  createdAt: z.string(),
  book: bookReturnSchema,
});

const booksOfUserReturnSchema = userSchema
  .extend({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    userBookManager: userBookReturnSchema.array(),
  })
  .omit({ password: true });

export { userBookReturnSchema, booksOfUserReturnSchema };
