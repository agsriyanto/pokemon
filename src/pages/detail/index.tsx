import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAtom } from "jotai";

import "./detailPokemon.scss";
import { formattedName } from '../../hooks';
import { pokemonAtom, pokemonDetailAtom } from "../../atoms/pokemonAtom";
import About from '../../components/about';
import BaseStatus from '../../components/baseStatus';
import Evolution from '../../components/evolution';
import Moves from '../../components/moves';

const DetailPokemon = () => {
  const [tabActive, setTabActive] = useState('About');
  const { pokemonId } = useParams();
  const [pokemonList] = useAtom(pokemonAtom);

  const idFormat = pokemonId?.toString().padStart(4, "0");

  const pokemon = pokemonList.find((pokemon: any) => pokemon.id === pokemonId);

  useEffect(() => {
    if (pokemonId) {
      const fetchPokemonDetails = async () => {
        const details = await pokemonDetailAtom.read(pokemonId);
        console.log(details)
        // setPokemonDetails(details); // Set the fetched details in state
      };
      
      fetchPokemonDetails();
    }
  }, [pokemonId]);

  const handleChangeTab = (tab: string) => {
    setTabActive(tab);
  };

  const tabs = ["About", "Base Status", "Evolution", "Moves"];
  const tabContent = tabActive === 'About' ? <About /> : tabActive === 'Base Status' ? <BaseStatus /> : tabActive === 'Evolution' ? <Evolution /> : <Moves />

  return (
    <div className={`card ${pokemon.types[0]} detail-pokemon`}>
      <div className="content-header">
        <div>
          <h1>{formattedName(pokemon.name)}</h1>
          <div className="type">
            {pokemon?.types.map((type: string) => (
              <span key={type} className={`type-${pokemon.types[0]}`}>{formattedName(type)}</span>
            ))}
          </div>
        </div>
        <p className="id">#{idFormat}</p>
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