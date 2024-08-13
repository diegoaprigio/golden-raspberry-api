import { IMovieRepository } from '../../domain/repositories/IMovieRepository';
import { PrismaService } from './prismaService';
import { Producer } from '../../domain/entities/Producer';
import { Movie } from '../../domain/entities/Movie';

export class PrismaMovieRepository implements IMovieRepository {
    constructor(private readonly prisma: PrismaService) { }

    async getAwardWinningProducers(): Promise<Producer[]> {
        const movies = await this.prisma.movie.findMany({
            where: { winner: true },
            orderBy: { year: 'asc' },
        });

        const producersMap = new Map<string, number[]>();

        movies.forEach((movie: Movie) => {
            movie.producers.split(',').forEach((producer: string) => {

                producer = producer.trim();

                if (!producersMap.has(producer)) {
                    producersMap.set(producer, []);
                }

                if (producersMap && producersMap != undefined)
                    producersMap.get(producer).push(movie.year);

            });
        });

        const producers: Producer[] = [];

        producersMap.forEach((years, producer) => {

            if (years.length > 1) {
                for (let i = 1; i < years.length; i++) {
                    
                    const interval = years[i] - years[i - 1];

                    const prod = new Producer(
                        producer, 
                        interval, 
                        years[i - 1], 
                        years[i]
                    );

                    producers.push(prod);
                }
            }
        });

        return producers;
    }
}
