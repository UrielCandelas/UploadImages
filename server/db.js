import { Sequelize } from 'sequelize'

const userName = "root"
const password = "n0m3l0S@"
const database = "uploadImages"
const host = "localhost"
const port = 3306

const sequelize = new Sequelize({
  host: host,
  port: port,
  username: userName,
  password: password,
  database: database,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,  // Número máximo de conexiones simultáneas en el pool
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})
export const syncTables = async () => {
  try {
    await sequelize.sync()
    console.log(`>>Tablas Sincronizadas`)
  } catch (error) {
    throw new Error(`Occurrio un error: ${error.message}`)
  }
}
export default sequelize