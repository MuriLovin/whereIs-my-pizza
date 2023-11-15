import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { MappedOrder } from './interfaces/mapped-order.interface';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<MappedOrder[]> {
    return this.prismaService.order.findMany({
      select: {
        id: true,
        createdAt: true,
        orderItems: {
          select: {
            id: true,
            quantity: true,
            pizza: {
              select: {
                id: true,
                name: true,
                ingredients: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<MappedOrder> {
    return this.prismaService.order.findUnique({
      where: {
        id: parseInt(id, 10),
      },
      select: {
        id: true,
        createdAt: true,
        orderItems: {
          select: {
            id: true,
            quantity: true,
            pizza: {
              select: {
                id: true,
                name: true,
                ingredients: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async createOrder(createOrder: CreateOrderDto[]): Promise<MappedOrder> {
    return await this.prismaService.order.create({
      data: {
        orderItems: {
          createMany: {
            data: createOrder.map((orderItem) => ({
              quantity: orderItem.quantity,
              pizzaId: orderItem.pizzaId,
            })),
          },
        },
      },
      select: {
        id: true,
        createdAt: true,
        orderItems: {
          select: {
            id: true,
            quantity: true,
            pizza: {
              select: {
                id: true,
                name: true,
                ingredients: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
