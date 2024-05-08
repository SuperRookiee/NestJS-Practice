import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';

const options: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'Animals',
  entities: [__dirname + '/**/*.entity.js'],
  synchronize: true,
  logging: false,
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...options,
    }),
    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
