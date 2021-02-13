import { isLoggedIn, logOut } from '../auth.js'
import { Forbidden, Unauthorized } from '../errors/index.js'
import { SESSION_ABSOLUTE_TIMEOUT } from '../config/index.js'
import { catchAsync } from './errors.js'


export const guest = (req, res, next) => {
    if (isLoggedIn(req)) {
        return next(new Forbidden('You are already logged in'))
    }

    next()
}

export const auth = (req, res, next) => {
    if (!isLoggedIn(req)) {
        return next(new Unauthorized('You must be logged in'))
    }

    next()
}

export const active = catchAsync(
    async (req, res, next) => {
        if (isLoggedIn(req)) {
            const now = Date.now()
            const { createdAt } = req.session

            if (now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
                await logOut(req, res)
                return next(new Unauthorized('Session expired'))
            }
        }

        next()
    }
)