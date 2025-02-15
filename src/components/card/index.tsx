import { useNavigate } from "react-router-dom";

import "./card.scss";
import { Pokemon } from "../../types";
import { formattedName } from "../../hooks";

interface CardProps {
  pokemon: Pokemon;
}

const Card = (props: CardProps) => {
  const { pokemon } = props;
  const navigate = useNavigate();

  const handleCardClick = (id: string | number) => {
    navigate(`/detail-pokemon/${id}`);
  };

  return (
    <div className={`card ${pokemon.types[0]}`} onClick={() => handleCardClick(pokemon.id)}>
      <h2>{formattedName(pokemon.name)}</h2>
      <div className="content">
        <div className="type">
          {pokemon.types.map((type: string) => (
            <span key={type} className={`type-${pokemon.types[0]}`}>{formattedName(type)}</span>
          ))}
        </div>
        <img src={pokemon.sprite} alt="React" className="img-pokemon" />
      </div>
    </div>
  )
};

export default Card;