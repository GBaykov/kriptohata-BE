import { Sequelize } from "sequelize";

export default new Sequelize(
    process.env.DB_NAME || 'movie-library',
    process.env.DB_USER|| 'postgres',
    process.env.FB_PASSWORD || 'root',
    {
        dialect:"postgres",
        host:process.env.DB_HOST,
        port: Number(process.env.DB_PORT)
    }
)