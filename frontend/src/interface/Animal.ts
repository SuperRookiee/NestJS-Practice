import { Country } from "./Country";

export interface Animal {
    id: number;
    name: string;
    age: number;
    species: string;
    country?: Country;
}