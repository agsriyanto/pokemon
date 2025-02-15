export type Pokemon = {
  name: string;
  id: string;
  sprite: string;
  types: string[];
}

export type DetailPokemon = {
  pokemon: {
    name: string;
    id: number;
    sprite: string;
    types: string[];
    height: number;
    weight: number;
    abilities: string[];
    species: string;
    eggGroups: string[];
    habitat: string;
    gender: string;
    moves?: any[];
    stats: any[];
    evolution?: any[];
  };
};