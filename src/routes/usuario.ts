import { UsuarioCreateSchema, UsuarioUpdateSchema } from '../schemas/UsuarioSchema';
import { Router } from "express"

import Usuario from "../controllers/Usuario"

export const router = Router()

router.get('/', Usuario.get)
router.post('/', UsuarioCreateSchema, Usuario.create)
router.get('/:id', Usuario.get)
router.put('/:id', UsuarioUpdateSchema, Usuario.update)
router.delete('/', Usuario._delete)
