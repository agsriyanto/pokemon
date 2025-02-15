import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import "./detailPokemon.scss";
import { Pokemon } from '../../types';
import { formattedName } from '../../hooks';
import { pokemonAtom, pokemonDetailAtom } from "../../atoms/pokemonAtom";
import About from '../../components/about';
import BaseStatus from '../../components/baseStatus';
import Evolution from '../../components/evolution';
import Moves from '../../components/moves';
import svgLeft from '../../assets/left-arrow.svg';

const DetailPokemon = () => {
  const [tabActive, setTabActive] = useState('About');
  const { pokemonId } = useParams();
  const navigate = useNavigate();

  const [pokemonList] = useAtom(pokemonAtom);
  const [pokemonDetails] = useAtom(pokemonDetailAtom(pokemonId!));

  const idFormat = pokemonId?.toString().padStart(4, "0");

  const pokemon = pokemonList.find((pokemon: Pokemon) => pokemon.id === pokemonId);

  const handleChangeTab = (tab: string) => {
    setTabActive(tab);
  };

  const tabs = ["About", "Base Stats", "Evolution", "Moves"];
  const tabContent = pokemonDetails && (tabActive === 'About' ? <About pokemon={pokemonDetails} /> : tabActive === 'Base Stats' ? <BaseStatus pokemon={pokemonDetails} /> : tabActive === 'Evolution' ? <Evolution pokemon={pokemonDetails} /> : <Moves pokemon={pokemonDetails} />);

  return (
    <div className={`card ${pokemon?.types[0]} detail-pokemon`}>
      <div onClick={() => navigate(`/`)} className="back">
        <img src={svgLeft} alt="React" className="back-arrow" />
        Back List
      </div>
      <div className="content-header">
        <div>
          <h1 className="pokemon-name">{formattedName(pokemon.name)}</h1>
          <div className="type">
            {pokemon?.types.map((type: string) => (
              <span key={type} className={`type-${pokemon.types[0]}`}>{formattedName(type)}</span>
            ))}
          </div>
        </div>
        <p className="id">#{idFormat}</p>
        <img src={pokemonDetails?.sprite} alt="React" className="img-pokemon-detail" />
      </div>
      <div className="content-body">
        <div className='tabs'>
          {tabs.map((tab: string) => (
            <p key={tab} onClick={() => handleChangeTab(tab)} className={`tab ${tab === tabActive ? 'active' : ''}`}>
              {tab}
            </p>
          ))}
        </div>
        {tabContent}
      </div>
    </div>
  )
};

export default DetailPokemon;