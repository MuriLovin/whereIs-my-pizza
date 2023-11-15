import { Controller, Get } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { MappedPizzaFormatted } from './interfaces/mapped-pizza.interface';

@Controller('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @Get()
  async findAll(): Promise<MappedPizzaFormatted[]> {
    return this.pizzasService.findAll();
  }
}
