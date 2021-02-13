import express from 'express'
import session from 'express-session'
import { SESSION_OPTIONS } from './config/index.js'
import { serverError, notFound, active, cors } from './middleware/index.js'
import { home, login, register } from './routes/index.js'


export const createApp = (store) => {
    const app = express()


    app.use(cors)

    app.use(express.json())

    app.use(session({ ...SESSION_OPTIONS, store }))

    app.use(active)


    // routes
    app.use(home)
    app.use(register)
    app.use(login)

    app.use(notFound)


    // error handler
    app.use(serverError)


    return app
}
