/* eslint-disable prettier/prettier */
import { z } from 'zod';

const userLoginSchema = z.object({
  email: z.string().email().max(45),
  password: z.string().min(3).max(20),
});

export default userLoginSchema;
