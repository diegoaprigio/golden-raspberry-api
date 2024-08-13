import express from 'express';
import { PrismaService } from '../database/prismaService';
import { PrismaMovieRepository } from '../database/PrismaMovieRepository';
import { GetProducersAwardIntervals } from '../../application/use-cases/GetProducersAwardIntervals';
import { ProducerController } from '../../interface/controllers/ProducerController';

const app = express();
const port = 3000;

const prismaService = new PrismaService();
const movieRepository = new PrismaMovieRepository(prismaService);
const getProducersAwardIntervals = new GetProducersAwardIntervals(movieRepository);
const producerController = new ProducerController(getProducersAwardIntervals);

app.get('/producers/awards-interval', (req, res) => producerController.getAwardIntervals(req, res));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export { app };
