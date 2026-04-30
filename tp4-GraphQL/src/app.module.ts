import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { ReceiptsModule } from './receipts/receipts.module';
import { Receipt } from './database/entities/receipt.entity';
import { NotificationsModule } from './notifications/notifications.module';
import { CoreModule } from './core/core.module';
import { OrdersModule } from './orders/orders.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { GraphqlModule } from './graphql/graphql.module'; // your resolvers module
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // ✅ Database connection
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'mydb',
      entities: [Receipt, require('./database/entities/category.entity').Category, require('./database/entities/product.entity').Product],
      synchronize: true, // dev only
    }),

    // ✅ GraphQL setup (code-first)
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      // ❌ removed schema-first
      // typePaths: [join(process.cwd(), 'src/graphql/schema/*.graphql')],

      // ✅ auto-generate schema
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),

      playground: true,
      path: '/graphql',
    }),

    // ✅ Feature modules
    ReceiptsModule,
    NotificationsModule,
    CoreModule,
    OrdersModule,
    CategoryModule,
    ProductModule,
    GraphqlModule, // GraphQL resolvers
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}