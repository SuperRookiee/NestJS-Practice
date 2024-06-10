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
    const [names, setNames] = useState<string>('');
    const [continent, setContinent] = useState<string>('');

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

    const handleAgeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const age = event.target.value ?? '';
        axios.get<AnimalResponse>(`http://localhost:3000/animals/${age}`)
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
    };

    const handleSearchContinent = () => {
        axios.post<AnimalResponse[]>('http://localhost:3000/animals/continent', { continent })
            .then(response => {
                const allAnimals: Animal[] = [];
                
                response.data.forEach(country => {
                    country.cats.forEach(cat => {
                        allAnimals.push({ ...cat, species: 'Cat'});
                    });
                    country.dogs.forEach(dog => {
                        allAnimals.push({ ...dog, species: 'Dog'});
                    });
                });
    
                setAnimals(allAnimals);
            })
            .catch(error => {
                console.error('Error fetching animals:', error);
            });
    }    

    const handleSearchName = (event: ChangeEvent<HTMLInputElement>) => {
        setNames(event.target.value);
    };

    const filteredAnimals = animals.filter(animal =>
        animal.name.toLowerCase().includes(names?.toLowerCase())
    );

    const handleContinentChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setContinent(event.target.value);
    };

    return (
        <main>
            <h2>All Animals</h2>
            <input
                type="text"
                placeholder="Search by animal name"
                value={names}
                onChange={handleSearchName}
            />
            <select onChange={handleAgeChange}>
                <option value="">ALL AGE</option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map(age =>
                    <option key={age} value={age}>{age}</option>
                )}
            </select>
            <br />
            <select onChange={handleContinentChange}>
                <option value="">Select Continent</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Africa">Africa</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
                <option value="Oceania">Oceania</option>
            </select>
            <button onClick={handleSearchContinent}>Search</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Species</th>
                        <th>Age</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAnimals.map(animal => (
                        <tr key={`${animal.id}_${animal.species}`}>
                            <td>{animal.name}</td>
                            <td>{animal.species}</td>
                            <td>{animal.age}</td>
                            <td>{animal.country?.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
