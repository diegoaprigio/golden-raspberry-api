import { Request, Response } from 'express';
import { GetProducersAwardIntervals } from '../../application/use-cases/GetProducersAwardIntervals';

export class ProducerController {
  constructor(private readonly getProducersAwardIntervals: GetProducersAwardIntervals) {}

  async getAwardIntervals(req: Request, res: Response) {
    const result = await this.getProducersAwardIntervals.execute();
    res.json(result);
  }
}
