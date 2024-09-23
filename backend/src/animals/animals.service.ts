import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from 'src/entity/country.entity';
import { Cat } from 'src/entity/cat.entity';
import { Dog } from 'src/entity/dog.entity';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(Dog)
    private readonly dogRepository: Repository<Dog>,
  ) {}

  async getAllAnimals() {
    const cats = await this.catRepository
      .createQueryBuilder('cat')
      .leftJoinAndSelect('cat.country', 'country')
      .select(['cat.id', 'cat.name', 'cat.breed', 'cat.age', 'country.name'])
      .getMany();

    const dogs = await this.dogRepository
      .createQueryBuilder('dog')
      .leftJoinAndSelect('dog.country', 'country')
      .select(['dog.id', 'dog.name', 'dog.breed', 'dog.age', 'country.name'])
      .getMany();

    return { cats, dogs };
  }

  async getAnimalsByAge(age: number) {
    const cats = await this.catRepository
      .createQueryBuilder('cat')
      .leftJoinAndSelect('cat.country', 'country')
      .where('cat.age = :age', { age })
      .select([
        'cat.id',
        'cat.name',
        'cat.breed',
        'cat.age',
        'country.name AS country',
      ])
      .getRawMany();

    const dogs = await this.dogRepository
      .createQueryBuilder('dog')
      .leftJoinAndSelect('dog.country', 'country')
      .where('dog.age = :age', { age })
      .select([
        'dog.id',
        'dog.name',
        'dog.breed',
        'dog.age',
        'country.name AS country',
      ])
      .getRawMany();

    return { cats, dogs };
  }

  async getAnimalsByContinent(continent: string) {
    return this.countryRepository
      .createQueryBuilder('country')
      .innerJoinAndSelect('country.cats', 'c')
      .innerJoinAndSelect('country.dogs', 'd')
      .where('country.continent = :continent', { continent })
      .getMany();
  }
}
