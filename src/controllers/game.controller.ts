import { Request, Response } from 'express';
import { createGame, getGame, updateGame, deleteGame } from '../services/game.service';

export function handleCreateGame(req: Request, res: Response) {
  const result = createGame();
  res.status(201).send(result);
}

export function handleGetGame(req: Request, res: Response) {
  const { id } = req.params;
  const result = getGame(id);

  if (!result) {
    res.status(404).send({ error: 'Game not found' });
  } else {
    res.send(result);
  }
}

export function handleUpdateGame(req: Request, res: Response) {
  const { id } = req.params;
  const { direction } = req.body;
  const result = updateGame(id, direction);

  if (result.error) {
    res.status(400).send(result);
  } else {
    res.send(result);
  }
}

export function handleDeleteGame(req: Request, res: Response) {
  const { id } = req.params;
  const result = deleteGame(id);

  if (result.error) {
    res.status(404).send(result);
  } else {
    res.status(204).send();
  }
}
