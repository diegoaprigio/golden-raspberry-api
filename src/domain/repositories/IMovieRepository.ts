import { Producer } from '../entities/Producer';

export interface IMovieRepository {
  getAwardWinningProducers(): Promise<Producer[]>;
}
