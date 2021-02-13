import assert from 'assert';
import { SESSION_OPTIONS } from './config/session.js';

export const isLoggedIn = (req) => {
    assert.notStrictEqual(req.session, undefined);
    if (req.session.userId === undefined) {
        return false;
    } else {
        return true;
    }
}

export const logIn = (req, userId) => {
    assert.notStrictEqual(req.session, undefined);
    req.session.userId = userId;
    req.session.createdAt = Date.now();
}

export const logOut = (req, res) =>
    new Promise((resolve, reject) => {
        assert.notStrictEqual(req.session, undefined);
        req.session.destroy((err) => {
            if (err) reject(err);

            res.clearCookie(SESSION_OPTIONS.name);

            resolve();
        });
    })
