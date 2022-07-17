import { validateRequest } from './../middlewares/validateRequest';
import { NextFunction, Request, Response } from "express";
import Joi from 'joi';

export const AuthLoginSchema = (req: Request, res: Response, next: NextFunction) => {
  validateRequest(req, res, next, Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }))
}