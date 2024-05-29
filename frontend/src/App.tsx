import { Route, Routes } from 'react-router-dom';
import AnimalList from './pages/AnimalList';
import CatList from './pages/CatList';
import DogList from './pages/DogList';

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<AnimalList />} />
        <Route path="cat" element={<CatList />} />
        <Route path="dog" element={<DogList />} />
      </Route>
    </Routes>

  );
}

export default App;
