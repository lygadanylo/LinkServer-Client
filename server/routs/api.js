import express from 'express';
import * as contoller from './endPoints';

const router = express.Router();

router.post('/login', contoller.login);

router.get('/download', contoller.download);

export default router;
