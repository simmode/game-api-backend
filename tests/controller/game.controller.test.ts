import request from 'supertest';
import express from 'express';
import gameRoutes from '../../src/routes/game.routes';

const app = express();
app.use(express.json());
app.use('/game', gameRoutes);

describe('gameController', () => {
  let gameId;

  test('POST /game - should create a new game', async () => {
    const response = await request(app).post('/game');
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('gameId');
    gameId = response.body.gameId;
  });

  test('GET /game/:id - should retrieve game state', async () => {
    const response = await request(app).get(`/game/${gameId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('player');
  });

  test('PUT /game/:id/move - should update game state', async () => {
    const response = await request(app)
      .put(`/game/${gameId}/move`)
      .send({ direction: 'right' });
    expect(response.status).toBe(200);
    expect(response.body.player).toHaveProperty('moves');
  });

  test('PUT /game/:id/move - should return error for invalid direction', async () => {
    const response = await request(app)
      .put(`/game/${gameId}/move`)
      .send({ direction: 'invalid' });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('DELETE /game/:id - should delete the game', async () => {
    const response = await request(app).delete(`/game/${gameId}`);
    expect(response.status).toBe(204);
  });
});
