import { Router } from 'express';
import { registerSchema, validate } from '../validation/index.js';
import { insertUser, getUsers, getUserByEmail } from '../querys/index.js';
import { pgClient } from '../index.js'
import { logIn } from '../auth.js';
import { catchAsync, guest } from '../middleware/index.js';
import { BadRequest } from '../errors/index.js';


const router = Router();

// TODO: purge
router.get('/register', async (req, res) => {
    const qres = await pgClient.query(getUsers());
    res.json({ message: qres.rows });
});

router.post('/register', guest, catchAsync(async (req, res) => {
    await validate(registerSchema, req.body);

    const { name, email, password } = req.body;

    const qres = await pgClient.query(getUserByEmail(email));

    if (qres.rows.length) {
        res.status(500);
        throw new BadRequest('Email inválido');
    }

    const user = await (await pgClient.query(await insertUser(name, email, password))).rows[0]; // OK?

    logIn(req, user.user_id);

    res.json({ message: 'OK' });
}));

export default router;