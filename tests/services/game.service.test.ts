import { createGame, getGame, updateGame, deleteGame } from '../../src/services/game.service';

describe('gameService', () => {
  let gameId;

  beforeEach(() => {
    const game = createGame();
    gameId = game.gameId;
  });

  test('should create a new game', () => {
    const game = createGame();
    expect(game).toHaveProperty('gameId');
    expect(game).toHaveProperty('board');
    expect(game).toHaveProperty('player');
  });

  test('should retrieve an existing game', () => {
    const game = getGame(gameId);
    expect(game).not.toBeNull();
    expect(game).toHaveProperty('player');
  });

  test('should update game state with a valid move', () => {
    const result = updateGame(gameId, 'right');
    expect(result).toHaveProperty('player');
    expect(result.player.moves).toBeLessThan(450);
  });

  test('should return error for invalid direction', () => {
    const result = updateGame(gameId, 'invalid');
    expect(result).toHaveProperty('error');
  });

  test('should delete a game', () => {
    const result = deleteGame(gameId);
    expect(result).toHaveProperty('success', true);
    const deletedGame = getGame(gameId);
    expect(deletedGame).toBeNull();
  });
});
