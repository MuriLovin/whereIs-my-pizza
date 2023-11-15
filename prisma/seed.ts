import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const ingredients = await createIngredients();
  createPizzas(ingredients);
}

async function createPizzas(ingredients) {
  await prisma.pizza.upsert({
    where: { name: 'Margherita' },
    update: {},
    create: {
      name: 'Margherita',
      price: 5,
      ingredients: {
        connect: [
          { id: ingredients.tomato.id },
          { id: ingredients.mozzarella.id },
        ],
      },
    },
  });

  await prisma.pizza.upsert({
    where: { name: 'Bufala' },
    update: {},
    create: {
      name: 'Bufala',
      price: 6,
      ingredients: {
        connect: [
          { id: ingredients.tomato.id },
          { id: ingredients.mozarellaDiBufala.id },
        ],
      },
    },
  });

  await prisma.pizza.upsert({
    where: { name: 'Romana' },
    update: {},
    create: {
      name: 'Romana',
      price: 5,
      ingredients: {
        connect: [
          { id: ingredients.tomato.id },
          { id: ingredients.mozzarella.id },
          { id: ingredients.anchovies.id },
          { id: ingredients.oil.id },
          { id: ingredients.oregano.id },
        ],
      },
    },
  });

  await prisma.pizza.upsert({
    where: { name: 'Diavola' },
    update: {},
    create: {
      name: 'Diavola',
      price: 7.5,
      ingredients: {
        connect: [
          { id: ingredients.tomato.id },
          { id: ingredients.mozzarella.id },
          { id: ingredients.spicySlami.id },
        ],
      },
    },
  });

  await prisma.pizza.upsert({
    where: { name: 'Pizza Bianca' },
    update: {},
    create: {
      name: 'Pizza Bianca',
      price: 5,
      ingredients: {
        connect: [
          { id: ingredients.mozzarella.id },
          { id: ingredients.oregano.id },
        ],
      },
    },
  });
}

async function createIngredients() {
  const tomato = await prisma.ingredient.upsert({
    where: { name: 'tomato' },
    update: {},
    create: {
      name: 'tomato',
    },
  });

  const mozzarella = await prisma.ingredient.upsert({
    where: { name: 'mozzarella' },
    update: {},
    create: {
      name: 'mozzarella',
    },
  });

  const mozarellaDiBufala = await prisma.ingredient.upsert({
    where: { name: 'mozzarella di bufala' },
    update: {},
    create: {
      name: 'mozzarella di bufala',
    },
  });

  const anchovies = await prisma.ingredient.upsert({
    where: { name: 'anchovies' },
    update: {},
    create: {
      name: 'anchovies',
    },
  });

  const oregano = await prisma.ingredient.upsert({
    where: { name: 'oregano' },
    update: {},
    create: {
      name: 'oregano',
    },
  });

  const oil = await prisma.ingredient.upsert({
    where: { name: 'oil' },
    update: {},
    create: {
      name: 'oil',
    },
  });

  const spicySlami = await prisma.ingredient.upsert({
    where: { name: 'spicy slami' },
    update: {},
    create: {
      name: 'spicy slami',
    },
  });

  return {
    tomato,
    mozzarella,
    mozarellaDiBufala,
    anchovies,
    oregano,
    oil,
    spicySlami,
  };
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
