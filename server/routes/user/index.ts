import { Router } from 'express';

import { auth } from './auth';
import { user } from './user';

const userApi: Router = Router();

userApi.use('/', user);
userApi.use('/auth', auth);

export { userApi }





