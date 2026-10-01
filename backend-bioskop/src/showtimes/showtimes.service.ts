import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, SeatNumber, Showtime as PrismaShowtime } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { Showtime } from './entities/showtime.entity';

@Injectable()
export class ShowtimesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createShowtimeDto: CreateShowtimeDto): Promise<Showtime> {
    const movieId = this.parseId(createShowtimeDto.movie_id, 'movie_id');
    const movie = await this.prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    const showDate = this.parseShowDate(createShowtimeDto.show_date);
    await this.ensureSlotAvailable(
      movieId,
      showDate,
      createShowtimeDto.audi,
      createShowtimeDto.start_time,
    );
    const generatedId = BigInt(Date.now());

    try {
      const createdShowtime = await this.prisma.showtime.create({
        data: {
          id: generatedId,
          movie_id: movieId,
          audi: createShowtimeDto.audi,
          show_date: showDate,
          start_time: createShowtimeDto.start_time,
          price: createShowtimeDto.price,
        },
      });

      return this.toShowtime(createdShowtime);
    } catch (error) {
      throw new BadRequestException('Failed to add Movie');
    }
    
  }

  async findAllShowtimeByDay(movieId: bigint, date: string): Promise<Showtime[]> {
    const showDate = new Date(`${date}T00:00:00.000Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(showDate.getTime()) || showDate.toISOString().slice(0, 10) !== date) {
      throw new BadRequestException('date must be a valid date in YYYY-MM-DD format');
    }

    try {
      const showtimes = await this.prisma.showtime.findMany({
        where: {
          movie_id: movieId,
          show_date: showDate,
        },
        include: {
          order_seats: { select: { seat_number: true } },
        },
        orderBy: { start_time: 'asc' },
      });

      return showtimes.map((showtime) => ({
        ...this.toShowtime(showtime),
        available_seats: this.getAvailableSeats(
          showtime.order_seats.map(({ seat_number }) => seat_number),
        ),
      }));
    } catch (error) {
      throw new BadRequestException('Failed to Load Data');
    }
  }

  async findSelectedShowtime(movieId: bigint, showtimeId: bigint): Promise<Showtime> {
    try {
      const showtime = await this.prisma.showtime.findFirst({
        where: {
          id: showtimeId,
          movie_id: movieId,
        },
        include: {
          order_seats: { select: { seat_number: true } },
        },
      });

      if (!showtime) {
        throw new NotFoundException('Selected showtime does not match the movie and start time');
      }

      return {
        ...this.toShowtime(showtime),
        available_seats: this.getAvailableSeats(
          showtime.order_seats.map(({ seat_number }) => seat_number),
        ),
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to Load Data');
    }
  }

  async update(id: bigint, updateShowtimeDto: UpdateShowtimeDto): Promise<Showtime> {
    const existingShowtime = await this.prisma.showtime.findUnique({ where: { id } });
    if (!existingShowtime) {
      throw new NotFoundException(`Showtime with ID ${id} not found`);
    }

    const data: Prisma.ShowtimeUncheckedUpdateInput = {};

    if (updateShowtimeDto.movie_id !== undefined) {
      const movieId = this.parseId(updateShowtimeDto.movie_id, 'movie_id');
      const movie = await this.prisma.movie.findUnique({ where: { id: movieId } });
      if (!movie) {
        throw new NotFoundException(`Movie with ID ${movieId} not found`);
      }
      data.movie_id = movieId;
    }
    if (updateShowtimeDto.audi !== undefined) data.audi = updateShowtimeDto.audi;
    if (updateShowtimeDto.show_date !== undefined) {
      data.show_date = this.parseShowDate(updateShowtimeDto.show_date);
    }
    if (updateShowtimeDto.start_time !== undefined) data.start_time = updateShowtimeDto.start_time;
    if (updateShowtimeDto.price !== undefined) data.price = updateShowtimeDto.price;

    if (Object.keys(data).length === 0) {
      throw new BadRequestException('At least one showtime field must be provided');
    }

    const movieId = updateShowtimeDto.movie_id !== undefined
      ? this.parseId(updateShowtimeDto.movie_id, 'movie_id')
      : existingShowtime.movie_id;
    const showDate = updateShowtimeDto.show_date !== undefined
      ? this.parseShowDate(updateShowtimeDto.show_date)
      : existingShowtime.show_date;
    const audi = updateShowtimeDto.audi ?? existingShowtime.audi;
    const startTime = updateShowtimeDto.start_time ?? existingShowtime.start_time;
    await this.ensureSlotAvailable(movieId, showDate, audi, startTime, id);

    try {
      const updatedShowtime = await this.prisma.showtime.update({
        where: { id },
        data,
      });

      return this.toShowtime(updatedShowtime);
    } catch (error) {
      throw new BadRequestException('Failed to Update Data');
    }
  }

  async remove(id: bigint): Promise<Showtime> {
    const existingShowtime = await this.prisma.showtime.findUnique({ where: { id } });
    if (!existingShowtime) {
      throw new NotFoundException(`Showtime with ID ${id} not found`);
    }

    const orderCount = await this.prisma.order.count({
      where: { showtime_id: id },
    });
    if (orderCount > 0) {
      throw new ConflictException('Cannot delete a showtime that already has orders');
    }

    try {
      const deletedShowtime = await this.prisma.showtime.delete({ where: { id } });
      return this.toShowtime(deletedShowtime);
    } catch (error) {
      throw new BadRequestException('Failed to Remove Data');
    }
  }

  private toShowtime(showtime: PrismaShowtime) {
    return {
      ...showtime,
      id: showtime.id.toString(),
      movie_id: showtime.movie_id.toString(),
    };
  }

  private getAvailableSeats(bookedSeats: SeatNumber[]): SeatNumber[] {
    const bookedSeatSet = new Set(bookedSeats);
    return Object.values(SeatNumber).filter((seat) => !bookedSeatSet.has(seat));
  }
  
  private parseId(value: string, fieldName: string): bigint {
    if (!/^\d+$/.test(value)) {
      throw new BadRequestException(`${fieldName} must be a positive integer`);
    }
    return BigInt(value);
  }

  private parseShowDate(value: string): Date {
    const date = new Date(`${value}T00:00:00.000Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
      throw new BadRequestException('show_date must be a valid date in YYYY-MM-DD format');
    }
    return date;
  }

  private async ensureSlotAvailable(
    movieId: bigint,
    showDate: Date,
    audi: string,
    startTime: string,
    excludeId?: bigint,
  ): Promise<void> {
    const existingShowtime = await this.prisma.showtime.findFirst({
      where: {
        movie_id: movieId,
        show_date: showDate,
        audi,
        start_time: startTime,
        ...(excludeId !== undefined && { id: { not: excludeId } }),
      },
    });

    if (existingShowtime) {
      throw new ConflictException(
        'A showtime already exists for this movie, date, auditorium, and start time',
      );
    }
  }
}
