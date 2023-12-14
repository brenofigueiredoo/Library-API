/* eslint-disable prettier/prettier */
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(3).max(45),
  email: z.string().email().max(45),
  password: z.string().min(4).max(20),
});

const userReturnSchema = userSchema
  .extend({
    id: z.string(),
    isAdm: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .omit({ password: true });

const returnMultipleUserSchema = userReturnSchema.array();

const userUpdateSchema = userSchema.partial();

export {
  userSchema,
  userReturnSchema,
  returnMultipleUserSchema,
  userUpdateSchema,
};
