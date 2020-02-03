import express from 'express';
import * as controller from './endPoints';

const router = express.Router();

router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/delite', controller.deleteUser);
router.post('/logout', controller.logout);

router.post('/download', controller.download);
router.get('/users', controller.featchUsers);

export default router;
