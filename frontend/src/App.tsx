import { Route, Routes } from 'react-router-dom';
import CatList from './components/CatList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CatList />} />
    </Routes>
  );
}

export default App;
