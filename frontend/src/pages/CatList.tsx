import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Cat } from '../interface/Cat';

const CatList = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    axios.get<Cat[]>('http://localhost:3000/cat')
      .then(response => setCats(response.data))
      .catch(error => console.error('Error fetching cats:', error));
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCats = cats.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Cat List</h2>
      <input
        type="text"
        placeholder="Search by cat name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredCats.map(cat => (
          <li key={cat.id}>{cat.name} Breed: {cat.breed} Age: {cat.age}</li>
        ))}
      </ul>
    </div>
  );
};

export default CatList;