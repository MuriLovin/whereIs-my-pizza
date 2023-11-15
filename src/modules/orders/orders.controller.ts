import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { MappedOrder } from './interfaces/mapped-order.interface';
import { OrderControllerResponse } from './interfaces/order-controller-response.interface';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll(): Promise<OrderControllerResponse<MappedOrder[]>> {
    const orders = await this.ordersService.findAll();
    return {
      code: 'S_OK',
      data: orders,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<OrderControllerResponse<MappedOrder>> {
    const order = await this.ordersService.findOne(id);
    return {
      code: 'S_OK',
      data: order,
    };
  }

  @Post()
  async createOrder(
    @Body() createOrder: CreateOrderDto[],
  ): Promise<OrderControllerResponse<MappedOrder>> {
    const order = await this.ordersService.createOrder(createOrder);
    return {
      code: 'S_OK',
      data: order,
    };
  }
}
