import { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Animal } from '../interface/Animal';

interface AnimalResponse {
    cats: Animal[];
    dogs: Animal[];
}

const AnimalList = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        axios.get<AnimalResponse>('http://localhost:3000/animals')
            .then(response => {
                const allAnimals: Animal[] = [
                    ...response.data.cats.map(cat => ({ ...cat, species: 'Cat' })),
                    ...response.data.dogs.map(dog => ({ ...dog, species: 'Dog' }))
                ];
                setAnimals(allAnimals);
            })
            .catch(error => {
                console.error('Error fetching animals:', error);
            });
    }, []);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredAnimals = animals.filter(animal =>
        animal.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main>
            <h2>All Animals</h2>
            <input
                type="text"
                placeholder="Search by animal name"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <ul>
                {filteredAnimals.map(animal => (
                    <li key={`${animal.id}_${animal.species}`}>
                        {animal.name} - {animal.species} ({animal.age})
                    </li>
                ))}
            </ul>
            <div>
                <Link to="/cat">Cat</Link>
            </div>
            <div>
                <Link to="/dog">Dog</Link>
            </div>
        </main>
    );
};

export default AnimalList;
