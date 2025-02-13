import { useAtom } from "jotai";

import { pokemonAtom } from "../../atoms/pokemonAtom";
import { Pokemon } from "../../types";
import Card from "../../components/card";
import "./dashboard.scss";

const Dashboard = () => {
  const [pokemonList] = useAtom(pokemonAtom);

  return (
    <>
      <h1 className="title">Pokedex</h1>
      <div className="pokemon-list">
        {pokemonList.map((pokemon: Pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  )
};

export default Dashboard;