import express from 'express';
import * as contoller from './endPoints';

const router = express.Router();

router.post('/login', contoller.login);

export default router;
