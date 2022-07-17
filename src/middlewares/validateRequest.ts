import { HttpStatusCode } from './../types/HttpStatusCode';
import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export const validateRequest = (req: Request, res: Response, next: NextFunction, schema: Schema) => {
  const options = {
      abortEarly: false, 
      allowUnknown: true, 
      stripUnknown: true 
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        ...error,
        details: error.details.map(e => e.message.replace("\"", "'").replace("\"", "'"))
      });
  } else {
      req.body = value;
      next();
  }
}