import { useAtom } from "jotai";

import { pokemonAtom, offsetAtom } from "../../atoms/pokemonAtom";
import { Pokemon } from "../../types";
import Card from "../../components/card";
import svgLeft from '../../assets/left-arrow.svg';
import svgRight from '../../assets/right-arrow.svg';
import "./dashboard.scss";

const Dashboard = () => {
  const [pokemonList] = useAtom(pokemonAtom);
  const [, setOffset] = useAtom(offsetAtom);

  const handleNext = () => {
    setOffset((prev) => prev + 10);
  };

  const handlePrev = () => {
    setOffset((prev) => Math.max(0, prev - 10));
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1 className="title">Pokedex</h1>
        <div className="card-pagination">
          <div className="pagination" onClick={handlePrev}>
            <img src={svgLeft} alt="React" className="left-arrow" />
            <p>Previous</p>
          </div>
          <div className="pagination" onClick={handleNext}>
            <p>Next</p>
            <img src={svgRight} alt="React" className="left-arrow" />
          </div>
        </div>
      </div>
      <div className="pokemon-list">
        {pokemonList.map((pokemon: Pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  )
};

export default Dashboard;