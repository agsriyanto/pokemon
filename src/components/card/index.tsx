import "./card.scss";
import pokeBall from "../../assets/pokeball.svg";
import { Pokemon } from "../../types";

interface CardProps {
  pokemon: Pokemon;
}

const Card = (props: CardProps) => {
  const { pokemon } = props;

  const formattedName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  };

  return (
    <div className={`card ${pokemon.types[0]}`}>
      <h2>{formattedName(pokemon.name)}</h2>
      <div className="content">
        <div className="type">
          {pokemon.types.map((type: string) => (
            <span key={type} className={`type-${pokemon.types[0]}`}>{formattedName(type)}</span>
          ))}
        </div>
        <img src={pokemon.sprite} alt="React" className="img-pokemon" />
      </div>
      <img src={pokeBall} alt="Pokeball" className="pokeball" draggable={false} />
    </div>
  )
};

export default Card;