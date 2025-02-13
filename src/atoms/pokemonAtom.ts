import { atom } from "jotai";

export const pokemonAtom = atom(async () => {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
  );
  const data = await response.json();

  const pokemonList = data.results.map(
    (pokemon: { name: string; url: string }) => ({
      name: pokemon.name,
      id: pokemon.url.split("/").slice(-2, -1)[0],
    })
  );

  const detailsPromises = pokemonList.map(async (pokemon: { name: string; id: string }) => {
    const detailsResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon-form/${pokemon.id}`
    );
    const detailsData = await detailsResponse.json();

    return {
      ...pokemon,
      sprite: detailsData.sprites.front_default,
      types: detailsData.types.map(
        (t: { type: { name: string } }) => t.type.name
      ),
    };
  });

  return Promise.all(detailsPromises);
});
