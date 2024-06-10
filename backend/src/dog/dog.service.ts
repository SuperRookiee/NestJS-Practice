import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dog } from '../entity/dog.entity';

@Injectable()
export class DogService {
  constructor(
    @InjectRepository(Dog)
    private dogRepository: Repository<Dog>,
  ) { }

  async findAll(): Promise<Dog[]> {
    return this.dogRepository.find();
  }
}
