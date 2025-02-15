import "./moves.scss";
import { DetailPokemon } from "../../types";

const Moves = (props: DetailPokemon) => {
  const { pokemon } = props;

  return (
    <div className="moves">
      <ul className="moves-list">
        {pokemon?.moves?.map((move, index) => (
          <li key={index} className="move-item">{move}</li>
        ))}
      </ul>
    </div>
  )
};

export default Moves;
