/* eslint-disable prettier/prettier */
import { Request as ExpressRequest } from 'express';

declare module 'express' {
  interface Request extends ExpressRequest {
    user: {
      id: string;
      isAdm: boolean;
    };
  }
}
