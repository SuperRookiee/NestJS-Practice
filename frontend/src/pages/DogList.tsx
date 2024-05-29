import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Dog } from '../interface/Dog';

const DogList = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    axios.get<Dog[]>('http://localhost:3000/dog')
      .then(response => setDogs(response.data))
      .catch(error => console.error('Error fetching dogs:', error));
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredDogs = dogs.filter(Dog =>
    Dog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Dog List</h2>
      <input
        type="text"
        placeholder="Search by dog name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredDogs.map(dog => (
          <li key={dog.id}>{dog.name} Breed: {dog.breed} Age: {dog.age}</li>
        ))}
      </ul>
    </div>
  );
};

export default DogList;