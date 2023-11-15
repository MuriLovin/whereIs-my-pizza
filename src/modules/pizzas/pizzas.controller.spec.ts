import { Test } from '@nestjs/testing';
import { PizzasController } from './pizzas.controller';
import { PizzasService } from './pizzas.service';
import { faker } from '@faker-js/faker';
import { PrismaService } from 'src/database/prisma.service';

describe('PizzasController', () => {
  let pizzasController: PizzasController;
  const prismaMock = {
    findMany: jest.fn(() => [
      {
        name: faker.lorem.word(),
        price: 10,
        ingredients: [faker.lorem.word(), faker.lorem.word()],
      },
      {
        name: faker.lorem.word(),
        price: 20,
        ingredients: [
          faker.word.words(1),
          faker.word.words(1),
          faker.word.words(1),
        ],
      },
    ]),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PizzasController],
      providers: [
        PizzasService,
        {
          provide: PrismaService,
          useValue: {
            pizza: prismaMock,
          },
        },
      ],
    }).compile();

    pizzasController = moduleRef.get<PizzasController>(PizzasController);
  });

  it('should get all pizzas', async () => {
    const pizzas = await pizzasController.findAll();
    expect(pizzas).toHaveLength(2);
    pizzas.forEach((pizza) => {
      expect(pizza).toHaveProperty('name');
      expect(pizza).toHaveProperty('price');
      expect(pizza).toHaveProperty('ingredients');
    });
  });
});
