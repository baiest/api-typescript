import { verifyToken } from './../middlewares/token';
import { AuthLoginSchema } from '../schemas/AuthSchema';
import Auth from '../controllers/Auth'
import { Router } from "express"

export const router = Router()

router.get('/', verifyToken ,Auth.profile)
router.post('/', AuthLoginSchema, Auth.login)
