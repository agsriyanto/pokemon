import { Routes, Route } from 'react-router-dom';

import './App.css';
import Dashboard from './pages/dashboard';
import DetailPokemon from './pages/detail';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/detail-pokemon/:pokemonId" element={<DetailPokemon />} />
    </Routes>
  )
}

export default App
