import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { Country } from 'src/entity/country.entity';
import { Cat } from 'src/entity/cat.entity';
import { Dog } from 'src/entity/dog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country, Cat, Dog])],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule { }
