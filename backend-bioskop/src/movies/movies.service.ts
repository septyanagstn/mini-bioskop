import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { Movie as PrismaMovie } from '@prisma/client';

@Injectable()
export class MoviesService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createMovieDto: CreateMovieDto): Promise<Movie>{
        const existingMovie = await this.prisma.movie.findUnique({
            where: {title: createMovieDto.title},
        });
        if (existingMovie) {
            throw new ConflictException(`Movie with title ${createMovieDto.title} already exists`);
        }

        const generatedId = BigInt(Date.now());

        const createdMovie = await this.prisma.movie.create({ 
            data: { 
                id: generatedId,
                title: createMovieDto.title,
                director: createMovieDto.director,
                starring: createMovieDto.starring,
                poster_url: createMovieDto.poster_url,
                synopsis: createMovieDto.synopsis,
            },
        });

        return this.toMovie(createdMovie);
    }
    
    async findAll(): Promise<Movie[]> {
        const movies = await this.prisma.movie.findMany();

        return movies.map((movie) => this.toMovie(movie));
    }

    async findOne(id: bigint): Promise<Movie> {
        const movie = await this.prisma.movie.findUnique({
            where: {id},
        })
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
        return this.toMovie(movie);
    }

    async update(id: bigint, updateMovieDto: CreateMovieDto): Promise<Movie> {
        const existMovie = await this.prisma.movie.findUnique({
            where: {id},
        })

        if (!existMovie) {
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
        
        const isSame = 
            existMovie.title === updateMovieDto.title &&
            existMovie.director === updateMovieDto.director &&
            existMovie.starring === updateMovieDto.starring &&
            existMovie.poster_url === updateMovieDto.poster_url &&
            existMovie.synopsis === updateMovieDto.synopsis;

        if (isSame) {
            throw new BadRequestException('Data tidak ada yang berubah.');
        }

        const updatedMovie = await this.prisma.movie.update({
            where: {id},
            data: {
                title: updateMovieDto.title,
                director: updateMovieDto.director,
                starring: updateMovieDto.starring,
                poster_url: updateMovieDto.poster_url,
                synopsis: updateMovieDto.synopsis,
            }
        });

        return this.toMovie(updatedMovie);
    }

    async remove(id: bigint): Promise<Movie> {
        const existMovie = await this.prisma.movie.findUnique({
            where: {id},
        })
        if (!existMovie) {
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
        const deletedMovie = await this.prisma.movie.delete({
            where: {id},
        });
        return this.toMovie(deletedMovie);
    }

    private toMovie(movie: PrismaMovie): Movie {
        return {
            ...movie,
            id: movie.id.toString(),
        };
    }
}
