import "./evolution.scss";
import { DetailPokemon } from "../../types";
import { formattedName } from "../../hooks";

const Evolution = (props: DetailPokemon) => {
  const { pokemon } = props;

  return (
    <div className="evolution">
      {pokemon?.evolution?.map((evo, index) => (
        <p key={index}>
          {formattedName(evo.from)} → {formattedName(evo.to)} (Level {evo.min_level || "?"}, {evo.trigger})
        </p>
      ))}
    </div>
  )
};

export default Evolution;
