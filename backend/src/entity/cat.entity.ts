import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Country } from './country.entity';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column()
  age: number;

  @ManyToOne(() => Country, (country) => country.cats)
  country: Country;
}
