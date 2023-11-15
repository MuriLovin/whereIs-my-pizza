import { Test } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaService } from 'src/database/prisma.service';
import { faker } from '@faker-js/faker';

const assertResponse = (order) => {
  expect(order).toHaveProperty('id');
  expect(order).toHaveProperty('createdAt');
  expect(order).toHaveProperty('orderItems');

  const firstItem = order.orderItems[0];
  expect(firstItem).toHaveProperty('id');
  expect(firstItem).toHaveProperty('quantity');
  expect(firstItem).toHaveProperty('pizza');

  const pizza = firstItem.pizza;
  expect(pizza).toHaveProperty('id');
  expect(pizza).toHaveProperty('name');
};

describe('OrdersController', () => {
  let ordersController: OrdersController;
  const prismaMock = {
    findMany: jest.fn(() => [
      {
        id: 1,
        createdAt: faker.date.past(),
        orderItems: [
          {
            id: 1,
            quantity: 1,
            pizza: {
              id: 1,
              name: 'Margherita',
              ingredients: [
                {
                  name: 'tomato',
                },
                {
                  name: 'mozzarella',
                },
              ],
            },
          },
          {
            id: 2,
            quantity: 1,
            pizza: {
              id: 2,
              name: 'Bufala',
              ingredients: [
                {
                  name: 'tomato',
                },
                {
                  name: 'mozzarella di bufala',
                },
              ],
            },
          },
        ],
      },
      {
        id: 2,
        createdAt: faker.date.past(),
        orderItems: [
          {
            id: 3,
            quantity: 1,
            pizza: {
              id: 1,
              name: 'Margherita',
              ingredients: [
                {
                  name: 'tomato',
                },
                {
                  name: 'mozzarella',
                },
              ],
            },
          },
          {
            id: 4,
            quantity: 1,
            pizza: {
              id: 2,
              name: 'Bufala',
              ingredients: [
                {
                  name: 'tomato',
                },
                {
                  name: 'mozzarella di bufala',
                },
              ],
            },
          },
        ],
      },
    ]),
    findUnique: jest.fn(() => ({
      id: 1,
      createdAt: faker.date.past(),
      orderItems: [
        {
          id: 1,
          quantity: 1,
          pizza: {
            id: 1,
            name: 'Margherita',
            ingredients: [
              {
                name: 'tomato',
              },
              {
                name: 'mozzarella',
              },
            ],
          },
        },
        {
          id: 2,
          quantity: 1,
          pizza: {
            id: 2,
            name: 'Bufala',
            ingredients: [
              {
                name: 'tomato',
              },
              {
                name: 'mozzarella di bufala',
              },
            ],
          },
        },
      ],
    })),
    create: jest.fn(() => ({
      id: 1,
      createdAt: faker.date.past(),
      orderItems: [
        {
          id: 1,
          quantity: 1,
          pizza: {
            id: 1,
            name: 'Margherita',
            ingredients: [
              {
                name: 'tomato',
              },
              {
                name: 'mozzarella',
              },
            ],
          },
        },
        {
          id: 2,
          quantity: 1,
          pizza: {
            id: 2,
            name: 'Bufala',
            ingredients: [
              {
                name: 'tomato',
              },
              {
                name: 'mozzarella di bufala',
              },
            ],
          },
        },
      ],
    })),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        {
          provide: PrismaService,
          useValue: {
            order: prismaMock,
          },
        },
      ],
    }).compile();

    ordersController = moduleRef.get<OrdersController>(OrdersController);
  });

  it('should get all orders', async () => {
    const response = await ordersController.findAll();
    expect(response.data).toHaveLength(2);
    expect(response.code).toBe('S_OK');
    response.data.forEach((order) => {
      assertResponse(order);
    });
  });

  it('should get one order', async () => {
    const response = await ordersController.findOne('1');
    expect(response.code).toBe('S_OK');
    assertResponse(response.data);
  });

  it('should create an order', async () => {
    const response = await ordersController.createOrder([
      {
        pizzaId: 1,
        quantity: 1,
      },
      {
        pizzaId: 2,
        quantity: 1,
      },
    ]);

    expect(response.code).toBe('S_OK');
    assertResponse(response.data);
  });
});
