import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from 'src/cat/entity/cat.entity';
import { Dog } from 'src/dog/entity/dog.entity';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(Dog)
    private readonly dogRepository: Repository<Dog>,
  ) {}

  async getAllAnimals() {
    const cats = await this.catRepository.find();
    const dogs = await this.dogRepository.find();
    return { cats, dogs };
  }
}
