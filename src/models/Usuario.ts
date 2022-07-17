import { Model, DataTypes } from 'sequelize'
import { DB } from '../db/config'
export class Usuario extends Model {
  declare id: number
  declare nombres: string
  declare apellidos: string
  declare email: string
  declare password: string
  declare createdAt: Date
  declare updatedAt: Date
}

Usuario.init(
  {
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'usuarios',
    sequelize: DB, // passing the `sequelize` instance is required
  },
);