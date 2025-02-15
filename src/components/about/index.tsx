import "./about.scss";
import { DetailPokemon } from "../../types";

const About = (props: DetailPokemon) => {
  const { pokemon } = props;

  return (
    <div className="about">
      <div className="about-content">
        <p>Species</p>
        <p>{pokemon?.species}</p>
      </div>
      <div className="about-content">
        <p>Height</p>
        <p>{pokemon.height}cm</p>
      </div>
      <div className="about-content">
        <p>Weight</p>
        <p>{pokemon.weight}lbs</p>
      </div>
      <div className="about-content">
        <p>Abilities</p>
        <p>{pokemon.abilities.join(", ")}</p>
      </div>

      <p className="title-breeding">Breeding</p>

      <div className="about-content">
        <p>Gender</p>
        <p>{pokemon.gender}</p>
      </div>
      <div className="about-content">
        <p>Egg Groups</p>
        <p>{pokemon.eggGroups.join(", ")}</p>
      </div>
      <div className="about-content">
        <p>Egg Cycle</p>
        <p>{pokemon.habitat}</p>
      </div>
    </div>
  )
};

export default About;