import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index';
import { connectToMongo } from './lib/mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => res.send('Incredibles backend running'));

async function start() {
  try {
    await connectToMongo();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
