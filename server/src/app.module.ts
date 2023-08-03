import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './dogs/entities/dog.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { UtilsModule } from './utils/utils.module';
@Module({
  imports: [
    CatsModule,
    DogsModule,
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'test',
      // entities: [Dog, User],
      synchronize: true,
      autoLoadEntities: true
    }),
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
