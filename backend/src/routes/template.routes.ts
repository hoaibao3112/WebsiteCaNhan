import { Router } from 'express';
import { getTemplates } from '../controllers/template.controller.js';

const router = Router();

router.get('/', getTemplates);

export default router;
