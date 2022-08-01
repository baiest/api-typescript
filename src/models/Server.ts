import { verifyToken } from './../middlewares/token';
import express from 'express'
import cors from 'cors'
import https from 'https'
import fs from 'fs'
import dotenv from 'dotenv'
import { routes } from '../routes'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Se importan cada una de las rutas
routes.forEach(({ name, isProtected }) => {
    try {
      const { router } = require('../routes/' + name)
      app.use('/api/' + name,
      isProtected ? verifyToken : [], 
      router)
    } catch (error) {
      console.error('No se encontro la ruta: ', name, error)
    }
})

export const server = () => {
  try {
    if(process.env.DEVELOPMENT) return app.listen(PORT, () => console.log('Servidor iniciado en el puerto', PORT))
    
    return https.createServer({
      cert: fs.readFileSync('C:/openssl/x64/bin/client.cert'),
      key: fs.readFileSync('C:/openssl/x64/bin/client.key')
    }, app).listen(PORT, () => console.log('Servidor https iniciado en el puerto', PORT))
  } catch (error) {
    console.error('El servidor no inició', error)
  }
}
