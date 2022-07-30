import { HttpStatusCode } from './../types/HttpStatusCode';
import { Request, Response } from "express"
import { FindAttributeOptions } from "sequelize/types"
import { Op } from 'sequelize'
import { Usuario } from '../models/Usuario'
import bcrypt from 'bcrypt'


const get = async(req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { query, page } = req.query
    
    const attributes: FindAttributeOptions = { exclude: ["password"] }
    const limit = 10
    const actualPage = page ? parseInt(page as string) : 1
    if(id){
      const usuario = await Usuario.findByPk(id, { attributes })
      return res.status(usuario ? HttpStatusCode.OK : HttpStatusCode.NOT_FOUND).json(usuario)
    }
    
    const count = Math.floor(await Usuario.count() / limit) + 1;
    
    if(query){
      const data = await Usuario.findAll({
        attributes,
        limit,
        offset: (actualPage - 1) * limit,
        where:{
          [Op.or]: [
            {nombres: {[Op.like]: `%${query}%`}},
            {apellidos: {[Op.like]: `%${query}%`}},
            {email: {[Op.like]: `%${query}%`}}
          ]
        }
      })
      
      return res.json({ page: actualPage, totalPages: count, data })
    }
    
    const data = await Usuario.findAll({ 
      attributes,
      limit,
      offset: (actualPage - 1) * limit, 
    })
    return res.json({ page: actualPage, totalPages: count, data })
  } catch (error) {
    console.log("Error Usuario: ", error)
    res.status(HttpStatusCode.BAD_REQUEST).json(error)
  }
}

const create = async(req: Request, res: Response) => { 
  try {
    const usuario = req.body
    const usuarioDB = await Usuario.findOne({ where: { email: usuario.email } });
    if (usuarioDB) return res.status(HttpStatusCode.CONFLICT).json({ message: 'Este usuario ya existe' })

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(usuario.password, salt);

    const usuarioCreated = await Usuario.create({
      ...usuario,
      password
    })
    return res.status(HttpStatusCode.CREATED).json({ usuario: usuarioCreated })
  } catch (error) {
    console.log('Usuario controller: ', error)
    return res.status(HttpStatusCode.BAD_REQUEST).json({ usuario: null })
  }}

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const attr: Partial<Usuario> = req.body
    const attributes: FindAttributeOptions = { exclude: ["password"] }
    const usuario = await Usuario.findByPk(id, { attributes })
    
    if(!usuario) return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Usuario no encontrado' })
    
    await usuario.update(attr)
    await usuario.save()
    res.json(usuario)
  } catch (error) {
    console.log('Usuario controller: ', error)
    return res.status(HttpStatusCode.BAD_REQUEST).json(null)
  }
}
const _delete = (_: Request, res: Response) => res.json({ message: 'Cancelar usuario' })

export = {
  get,
  create,
  update,
  _delete
}