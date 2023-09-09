import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { computeCone } from './functions';

const port = 4000;

const createServer = async () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  app.post('/calc', async ({ body }, res) => {
    const height: number = body.data.height;
    const radius: number = body.data.radius;
    const segments: number = body.data.segments;

    const coneGeometry = computeCone(height, radius, segments);

    res.send(JSON.stringify(coneGeometry));
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

createServer();
