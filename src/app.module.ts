import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { OrdersModule } from './modules/orders/orders.module';
import { PizzasModule } from './modules/pizzas/pizzas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
    }),

    OrdersModule,
    PizzasModule,
  ],
})
export class AppModule {}
