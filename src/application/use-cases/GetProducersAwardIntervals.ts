import { IMovieRepository } from '../../domain/repositories/IMovieRepository';

export class GetProducersAwardIntervals {
    constructor(private readonly movieRepository: IMovieRepository) { }

    async execute() {
        const producers = await this.movieRepository.getAwardWinningProducers();
        const intervals = producers.reduce((acc, producer) => {
            const interval = producer.interval;
            if (!acc.min || interval < acc.min.interval) {
                acc.min = producer;
            }
            if (!acc.max || interval > acc.max.interval) {
                acc.max = producer;
            }
            return acc;
        }, { min: null, max: null });

        return {
            min: intervals.min ? [intervals.min] : [],
            max: intervals.max ? [intervals.max] : [],
        };
    }
}
