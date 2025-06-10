import express from 'express';
import { handleCreateGame, handleGetGame, handleUpdateGame, handleDeleteGame } from '../controllers/game.controller';

const router = express.Router();

router.post('/', handleCreateGame);
router.get('/:id', handleGetGame);
router.put('/:id/move', handleUpdateGame);
router.delete('/:id', handleDeleteGame);

export default router;
