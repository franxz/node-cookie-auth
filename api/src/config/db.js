const {
    PG_PORT = 5432,
    PG_HOST = 'localhost',
    PG_USER = 'pgUser',
    PG_PASSWORD = 'pgPass',
    PG_DB = 'pgDb'
} = process.env;

export const PG_OPTIONS = {
    port: +PG_PORT,
    host: PG_HOST,
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DB
}