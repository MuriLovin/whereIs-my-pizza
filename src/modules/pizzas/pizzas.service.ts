import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { MappedPizzaFormatted } from './interfaces/mapped-pizza.interface';

@Injectable()
export class PizzasService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<MappedPizzaFormatted[]> {
    const pizzas = await this.prismaService.pizza.findMany({
      select: {
        name: true,
        price: true,
        ingredients: {
          select: {
            name: true,
          },
        },
      },
    });

    return pizzas.map((pizza) => ({
      ...pizza,
      ingredients: pizza.ingredients.map((ingredient) => ingredient.name),
    }));
  }
}
