import express from 'express';
import * as controller from './endPoints';

const router = express.Router();

router.post('/login', controller.login);
router.post('/register', controller.register);

router.post('/download', controller.download);

export default router;
