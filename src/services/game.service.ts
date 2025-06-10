import { v4 as uuidv4 } from 'uuid';

const BOARD_SIZE = 50;
const DEFAULT_HEALTH = 200;
const DEFAULT_MOVES = 450;
const games: Record<string, any> = {};
const states = ["Blank", "Speeder", "Lava", "Mud"];
const stateMap =
    {
        "Blank": {"Health": 0, "Moves": -1},
        "Speeder": {"Health": -5, "Moves": 0},
        "Lava": {"Health": -50, "Moves": -10},
        "Mud": {"Health": -10, "Moves": -5},
    };

function createBoard(size: number): string[][] {
  return Array.from({ length: size }, () => Array(size).fill(''));
}

function getRandomState() : string {
    let i = Math.floor(Math.random() * states.length);
    return states[i];
}

function initStates(board:string[][]) {
    for (let i=0; i<board.length; i++) {
        let row = board[i];
        for (let j=0; j<row.length; j++) {
            row[j] = getRandomState();
        }
    }
}

export function createGame() {
  const gameId = uuidv4();
  const board = createBoard(BOARD_SIZE);
  initStates(board);
  const player = { x: 0, y: 0, health: DEFAULT_HEALTH, moves: DEFAULT_MOVES };

  games[gameId] = { board, player };
  return { gameId, board, player };
}

export function getGame(gameId: string) {
  return games[gameId] || null;
}

export function updateGame(gameId: string, direction: string) {
  const game = games[gameId];

  if (!game) return { error: 'Game not found' };

  const { player } = game;
  const { x, y, health, moves } = player;

  if (moves <= 0 || health <= 0) return { error: 'Game over. No moves or health left.' };

  let newX = x;
  let newY = y;

  switch (direction) {
    case 'up':
      newX = Math.max(0, x - 1);
      break;
    case 'down':
      newX = Math.min(BOARD_SIZE - 1, x + 1);
      break;
    case 'left':
      newY = Math.max(0, y - 1);
      break;
    case 'right':
      newY = Math.min(BOARD_SIZE - 1, y + 1);
      break;
    default:
      return { error: 'Invalid direction' };
  }

  if (newX === x && newY === y) return { error: 'Move did not change position' };

  player.x = newX;
  player.y = newY;
  let cellState = game.board[x][y];
  player.moves += stateMap[cellState]["Moves"];
  

  player.health = Math.max(0, health + stateMap[cellState]["Health"]);

  return {player,  board: game.board };
}

export function deleteGame(gameId: string) {
  if (!games[gameId]) return { error: 'Game not found' };

  delete games[gameId];
  return { success: true };
}
