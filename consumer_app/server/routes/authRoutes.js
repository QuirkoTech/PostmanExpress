import { Router } from 'express';

import protect from '../helpers/protect.js';
import { signUp } from '../controllers/authControllers.js';

const router = Router();

router.route('/login').post();
router.route('/signup').post(signUp);

export default router;
