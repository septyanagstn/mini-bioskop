import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus, Prisma, SeatNumber } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {

  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const userId = this.parseId(createOrderDto.user_id, 'user_id');
    const showtimeId = this.parseId(createOrderDto.showtime_id, 'showtime_id');
    const seatNumbers = this.parseSeatNumbers(createOrderDto.seat_numbers);

    const [user, showtime] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId } }),
      this.prisma.showtime.findUnique({ where: { id: showtimeId } }),
    ]);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    if (!showtime) {
      throw new NotFoundException(`Showtime with ID ${showtimeId} not found`);
    }

    const totalPrice = showtime.price * seatNumbers.length;
    if (!Number.isSafeInteger(totalPrice) || totalPrice > 2147483647) {
      throw new BadRequestException('Calculated total price exceeds the supported range');
    }

    const orderId = BigInt(Date.now());

    try {
      const createdOrder = await this.prisma.$transaction(async (transaction) => {
        const existingSeats = await transaction.orderSeat.findMany({
          where: {
            showtime_id: showtimeId,
            seat_number: { in: seatNumbers },
          },
          select: { seat_number: true },
        });

        if (existingSeats.length > 0) {
          const unavailableSeats = existingSeats.map(({ seat_number }) => seat_number);
          throw new ConflictException(
            `These seats are already reserved: ${unavailableSeats.join(', ')}`,
          );
        }

        const order = await transaction.order.create({
          data: {
            id: orderId,
            user_id: userId,
            showtime_id: showtimeId,
            total_price: totalPrice,
            status: OrderStatus.PENDING,
          },
        });

        await transaction.orderSeat.createMany({
          data: seatNumbers.map((seat_number) => ({
            order_id: orderId,
            showtime_id: showtimeId,
            seat_number,
          })),
        });

        return order;
      });

      return {
        id: createdOrder.id.toString(),
        user_id: createdOrder.user_id.toString(),
        showtime_id: createdOrder.showtime_id.toString(),
        seat_numbers: seatNumbers,
        total_price: createdOrder.total_price,
        status: createdOrder.status,
        created_at: createdOrder.created_at,
      };
    } catch (error) {
      if (error) {
        throw new ConflictException('One or more selected seats have already been reserved');
      }
      throw error;
    }
  }

  async payment(id: string): Promise<Order> {
    const orderId = this.parseId(id, 'order_id');

    const paidOrder = await this.prisma.$transaction(async (transaction) => {
      const existingOrder = await transaction.order.findUnique({
        where: { id: orderId },
        include: { order_seats: { select: { seat_number: true } } },
      });

      if (!existingOrder) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }

      if (existingOrder.status === OrderStatus.PAID) {
        return existingOrder;
      }

      return transaction.order.update({
        where: { id: orderId },
        data: { status: OrderStatus.PAID },
        include: { order_seats: { select: { seat_number: true } } },
      });
    });

    return {
      id: paidOrder.id.toString(),
      user_id: paidOrder.user_id.toString(),
      showtime_id: paidOrder.showtime_id.toString(),
      seat_numbers: paidOrder.order_seats.map(({ seat_number }) => seat_number),
      total_price: paidOrder.total_price,
      status: paidOrder.status,
      created_at: paidOrder.created_at,
    };
  }

  private parseId(value: string, fieldName: string): bigint {
    if (!/^\d+$/.test(value)) {
      throw new BadRequestException(`${fieldName} must be a positive integer`);
    }
    return BigInt(value);
  }

  private parseSeatNumbers(seatNumbers: string[]): SeatNumber[] {
    const allowedSeats = new Set<string>(Object.values(SeatNumber));
    if (!Array.isArray(seatNumbers) || seatNumbers.length === 0) {
      throw new BadRequestException('Select at least one seat');
    }
    if (seatNumbers.some((seat) => !allowedSeats.has(seat))) {
      throw new BadRequestException('One or more seat numbers are invalid');
    }
    if (new Set(seatNumbers).size !== seatNumbers.length) {
      throw new BadRequestException('A seat cannot be selected more than once');
    }
    return seatNumbers as SeatNumber[];
  }
}
