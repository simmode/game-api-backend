# Game API Backend

This project is a simple RESTful API for a game backend, built using **Node.js** and **Express.js**. The API allows players to save and resume games, move within a game board, and manage game states. It is structured using a clean architecture with routes, services, and controllers.

---

## Features

* **Create a new game**: Generate a new game with a unique ID, a board, and player properties like health and moves.
* **Retrieve game state**: Get the current state of a game by its ID.
* **Update game state**: Move the player on the board and update game properties like health and moves.
* **Delete a game**: Remove a game from the system.

---

## Project Structure

```plaintext
src/
├── controllers/
│   └── game.controller.ts    # Handles HTTP requests and responses
├── routes/
│   └── game.routes.ts        # Defines the API routes
├── services/
│   └── game.service.ts       # Contains the business logic
├── app.ts                    # Main app configuration
```

---

## Prerequisites

Ensure you have the following installed on your system:

* **Node.js** (>=14.x)
* **npm** or **yarn**

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd game-api-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

The server will run at `http://localhost:3000`.

---

## API Endpoints

### Base URL: `http://localhost:3000/game`

| Method | Endpoint    | Description              |
| ------ | ----------- | ------------------------ |
| POST   | `/`         | Create a new game        |
| GET    | `/:id`      | Retrieve game state      |
| PUT    | `/:id/move` | Update game state (move) |
| DELETE | `/:id`      | Delete a game            |

### Example Payloads

#### Create Game (POST `/`)

Request:

```json
{}
```

Response:

```json
{
  "gameId": "1234",
  "board": [["", "", ""], ...],
  "player": {
    "x": 0,
    "y": 0,
    "health": 200,
    "moves": 450
  }
}
```

#### Move Player (PUT `/:id/move`)

Request:

```json
{
  "direction": "down"
}
```

Response:

```json
{
  "board": [["", "", ""], ...],
  "player": {
    "x": 0,
    "y": 1,
    "health": 99,
    "moves": 49
  }
}
```

---

## Testing

To run tests (if any are configured):

```bash
npm test
```
---

## Author

Derek Simmons - simmdoe@gmail.com
