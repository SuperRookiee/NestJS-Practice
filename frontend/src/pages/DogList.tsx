import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Dog } from '../interface/Dog';
import { Link } from 'react-router-dom';

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
      <Link to='/'>Home</Link>
      <h2>Dog List</h2>
      <input
        type="text"
        placeholder="Search by dog name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Breed</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {filteredDogs.map(dog => (
            <tr key={dog.id}>
              <td>{dog.name}</td>
              <td>{dog.breed}</td>
              <td>{dog.age}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default DogList;