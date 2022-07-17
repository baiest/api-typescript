import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { HttpStatusCode } from './../types/HttpStatusCode';
import { Request, Response } from "express";
import { Usuario } from "../models/Usuario";

const login = async(req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await Usuario.findOne({ where: { email } })
    if (!user) return res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Contraseña no válida' })
    
    if(!process.env.TOKEN_SECRET) throw new Error('No esta la firma del token')
    
    user.password = ''
    const token = jwt.sign({
      ...user.get()
    }, process.env.TOKEN_SECRET)
    res.header('Authorization', `Bearer ${token}`);
    res.json({ message: 'loggeado', token })
  } catch (error) {
    console.log('Auth controller: ', error)
    res.status(404).json({ message: 'Error' })
  }
}

const profile = async(req: Request, res: Response) => {
  const { session } = req.body
  try {
    const attributes = { exclude: ['password'] }
    const usuario = await Usuario.findByPk(session.id, { attributes })
    res.json(usuario)
  } catch (error) {
    console.log('Error AuthController: ', error)
    res.json(null)
  }
}

export = {
  login,
  profile
}