import { Router } from 'express';

import { login } from './login';

const auth: Router = Router();

auth.use('/login', login);

export { auth }





