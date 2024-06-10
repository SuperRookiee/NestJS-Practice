import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Cat } from '../interface/Cat';
import { Link } from 'react-router-dom';

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
      <Link to='/'>Home</Link>
      <h2>Cat List</h2>
      <input
        type="text"
        placeholder="Search by cat name"
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
          {filteredCats.map(cat => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td>{cat.breed}</td>
              <td>{cat.age}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default CatList;