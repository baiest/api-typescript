import { validateRequest } from './../middlewares/validateRequest';
import { NextFunction, Request, Response } from "express";
import Joi from 'joi';

export const UsuarioCreateSchema = (req: Request, res: Response, next: NextFunction) => {
  validateRequest(req, res, next, Joi.object({
      nombres : Joi.string().required(),
      apellidos : Joi.string(),
      email : Joi.string().required(),
      password : Joi.string().required(),
  }))
}
export const UsuarioUpdateSchema = (req: Request, res: Response, next: NextFunction) => {
  validateRequest(req, res, next, Joi.object({
      nombres : Joi.string(),
      apellidos : Joi.string(),
      email : Joi.string(),
      password : Joi.string(),
  }))
}