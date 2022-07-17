import { HttpStatusCode } from './../types/HttpStatusCode';
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express"

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.header('Authorization')
  if(!bearer) return res.status(HttpStatusCode.UNAUTHORIZED).json({ error: 'Acceso denegado' })
  const token = bearer.split(' ')[1]
  try {
    req.body.session = jwt.verify(token, process.env.TOKEN_SECRET || '')
    next() // continuamos
  } catch (error) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({ error: 'Token no es válido' })
  }
}