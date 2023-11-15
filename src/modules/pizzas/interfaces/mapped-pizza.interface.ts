import { IngredientsVerbose } from './ingredients.interface';

export interface MappedPizza {
  id: number;
  name: string;
  price: number;
  ingredients: (IngredientsVerbose | string)[];
}

export type MappedPizzaFormatted = Omit<MappedPizza, 'id'>;
