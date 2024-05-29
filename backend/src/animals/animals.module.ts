import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { Cat } from 'src/cat/entity/cat.entity';
import { Dog } from 'src/dog/entity/dog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cat, Dog])],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
