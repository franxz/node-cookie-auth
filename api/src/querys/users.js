import bcryptjs from "bcryptjs";
import { BCRYPT_WORK_FACTOR } from "../config/index.js"

const { hash } = bcryptjs;


const getUserAttributes = 'users.user_id, users.name, users.email, users.password';

export const insertUser = async (name, email, password) => {
    password = await hash(password, BCRYPT_WORK_FACTOR);
    return {
        text: 'INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *;',
        values: [name, email, password]
    }
}

export const getUsers = () => {
    return `SELECT ${getUserAttributes} FROM users;`
}

export const getUserByEmail = (email) => {
    return {
        text: `SELECT ${getUserAttributes} FROM users WHERE users.email = $1;`,
        values: [email]
    }
}

export const getUserById = (id) => {
    return {
        text: `SELECT ${getUserAttributes} FROM users WHERE users.user_id = $1;`,
        values: [id]
    }
}

// TODO: purge
export const helloWorld = () => {
    return {
        text: 'SELECT $1::text as message',
        values: ['Hello world!']
    }
}