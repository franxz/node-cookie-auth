import { Router } from 'express';
import { loginSchema, validate } from '../validation/index.js';
import { getUserByEmail } from '../querys/index.js';
import { pgClient } from '../index.js'
import { logIn, logOut } from '../auth.js';
import { auth, catchAsync, guest } from '../middleware/index.js';
import { BadRequest } from '../errors/index.js';
import { matchesPassword } from '../helpers/index.js';


const router = Router();

router.post('/login', guest, catchAsync(async (req, res) => {
    await validate(loginSchema, req.body);
    const { email, password } = req.body;

    const user = ( await pgClient.query(getUserByEmail(email)) ).rows[0];
    
    // Vulnerable a timming attack 💀
    // TODO: arreglarlo
    if (!user || !(await matchesPassword(password, user.password))) {
        throw new BadRequest('Wrong email or password');
    }
    
    logIn(req, user.user_id);

    res.json({ message: 'OK' });
}));

router.post('/logout', auth, catchAsync(async (req, res) => {
    await logOut(req, res);
    res.json({ message: 'OK' });
}));

router.get('/isloggedin', auth, catchAsync(async (req, res) => {
    res.json({ message: 'OK' });
}));

export default router;
