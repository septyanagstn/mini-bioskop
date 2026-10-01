import { Controller, ForbiddenException, Get, Post, Body, Patch, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  ordersByUser(
    @Param('userId') userId: string,
    @Req() request: Request & { user: AuthenticatedUser },
  ): Promise<Order[]> {
    if (request.user.user_id !== userId) {
      throw new ForbiddenException('You can only view your own orders');
    }
    return this.ordersService.findAllByUserId(userId);
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Patch(':id')
  payment(@Param('id') id: string) {
    return this.ordersService.payment(id);
  }
}
