import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MakersModule } from './makers/makers.module';
import { TokenController } from './token/token.controller';
import config from './config/config';
import { dbOptions } from './config/db.config';
import { ItemsModule } from './items/items.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRoot(dbOptions),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: config()['apollo']['debug'],
      driver: ApolloDriver,
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: config()['cors']['origin'],
        credentials: true,
      },
      playground: config()['apollo']['playground'],
    }),
    AdminUsersModule,
    AuthModule,
    MakersModule,
    ItemsModule,
    CategoriesModule,
  ],
  controllers: [AppController, TokenController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
