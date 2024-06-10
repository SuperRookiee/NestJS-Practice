import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AnimalsModule } from './animals/animals.module';
import { CatModule } from './cat/cat.module';
import { DogModule } from './dog/dog.module';

const options: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: '1234',
  database: 'Animals',
  entities: [__dirname + '/**/*.entity.js'],
  synchronize: true,
  logging: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...options,
    }),
    AnimalsModule,
    CatModule,
    DogModule,
  ],
})
export class AppModule {}
