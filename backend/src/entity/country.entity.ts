import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cat } from './cat.entity';
import { Dog } from './dog.entity';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  continent: string;

  @OneToMany(() => Cat, (cat) => cat.country)
  cats?: Cat[];

  @OneToMany(() => Dog, (dog) => dog.country)
  dogs?: Dog[];
}
