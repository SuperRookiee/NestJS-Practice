import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AnimalsService } from './animals.service';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Get()
  async getAllAnimals() {
    return await this.animalsService.getAllAnimals();
  }

  @Get(':age')
  async getAnimalsByAge(@Param('age') age: number) {
    return await this.animalsService.getAnimalsByAge(age);
  }

  @Post('continent')
  async getAnimalsByContinent(@Body('continent') continent: string) {
    return this.animalsService.getAnimalsByContinent(continent);
  }
}
