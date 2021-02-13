import { Router } from 'express';
import { pgClient } from '../index.js';
import { auth } from '../middleware/index.js';
import { catchAsync } from '../middleware/index.js';
import { getUserById } from '../querys/index.js';

const router = Router();

router.get('/home', auth, catchAsync(async (req, res) => {
    const user = ( await pgClient.query(getUserById(req.session.userId)) ).rows[0];
    res.json(user);
}));

export default router;