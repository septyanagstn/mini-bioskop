import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@Controller('movies')
@ApiTags('movies')
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

    @Post()
    create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
        return this.moviesService.create(createMovieDto);
    }

	@Get()
	findAll(): Promise<Movie[]> {
		return this.moviesService.findAll();
	}

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Movie> {
        return this.moviesService.findOne(this.parseId(id));
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMovieDto: CreateMovieDto): Promise<Movie> {
        return this.moviesService.update(this.parseId(id), updateMovieDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Movie> {
        return this.moviesService.remove(this.parseId(id));
    }

    private parseId(value: string): bigint {
        if (!/^\d+$/.test(value)) {
        throw new BadRequestException(`Movie ID must be a positive integer`);
        }
        return BigInt(value);
    }

}
