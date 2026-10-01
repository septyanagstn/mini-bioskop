import { BadRequestException, Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { ApiTags } from '@nestjs/swagger';
import { Showtime } from './entities/showtime.entity';

@Controller('showtimes')
@ApiTags('showtimes')
export class ShowtimesController {
  constructor(private readonly showtimesService: ShowtimesService) {}

  @Post()
  create(@Body() createShowtimeDto: CreateShowtimeDto): Promise<Showtime> {
    return this.showtimesService.create(createShowtimeDto);
  }

  @Get()
  findAllShowtimeByDay(@Query('movieId') movieId: string, @Query('date') date: string): Promise<Showtime[]> {
    if (!date) {
      throw new BadRequestException('date is required in YYYY-MM-DD format');
    }
    return this.showtimesService.findAllShowtimeByDay(this.parseId(movieId), date);
  }

  @Get('detail')
  findSelectedShowtime(@Query('movieId') movieId: string, @Query('showtimeId') showtimeId: string): Promise<Showtime> {
    return this.showtimesService.findSelectedShowtime(
      this.parseId(movieId),
      this.parseId(showtimeId),
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShowtimeDto: UpdateShowtimeDto): Promise<Showtime> {
    return this.showtimesService.update(this.parseId(id), updateShowtimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Showtime> {
    return this.showtimesService.remove(this.parseId(id));
  }

  private parseId(id: string): bigint {
    if (!/^\d+$/.test(id ?? '') || BigInt(id) <= 0n) {
      throw new BadRequestException('ID must be a positive integer');
    }

    return BigInt(id);
  }
}
