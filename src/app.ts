import express from 'express';
import bodyParser from 'body-parser';
import gameRoutes from './routes/game.routes';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Use game routes
app.use('/game', gameRoutes);

app.listen(port, () => {
  console.log(`Game API is running on http://localhost:${port}`);
});
