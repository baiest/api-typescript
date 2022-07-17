type ApiRoute = {
  name: string
  isProtected: boolean
}
// Coloca el nombre del archivo que contiene sus respectivas rutas
export const routes: ApiRoute[] = [
  {
    name: 'usuario',
    isProtected: true
  },
  {
    name: 'auth',
    isProtected: false
  }
];
