/* eslint-disable prettier/prettier */
import { z } from 'zod';

const bookSchema = z.object({
  title: z.string().min(3).max(45),
  author: z.string().min(3).max(45),
  genre: z.string().min(3).max(45),
  publicationDate: z.string(),
});

const bookReturnSchema = bookSchema.extend({
  id: z.string(),
  isBusy: z.boolean(),
});

const returnMultipleBookSchema = bookReturnSchema.array();

const bookUpdateSchema = bookSchema.partial();

export {
  bookSchema,
  bookReturnSchema,
  returnMultipleBookSchema,
  bookUpdateSchema,
};
