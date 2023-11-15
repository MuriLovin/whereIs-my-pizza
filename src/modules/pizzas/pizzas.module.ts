import { Module } from '@nestjs/common';
import { PizzasController } from './pizzas.controller';
import { PizzasService } from './pizzas.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [PizzasController],
  providers: [PizzasService, PrismaService],
  exports: [PizzasService],
})
export class PizzasModule {}
