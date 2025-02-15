import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

export const offsetAtom = atom(0);

export const pokemonAtom = atom(async (get) => {
  const offset = get(offsetAtom);

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
    );
    if (!response.ok) throw new Error("Failed to fetch Pokemon list");

    const data = await response.json();

    const pokemonList = data.results.map(
      (pokemon: { name: string; url: string }) => ({
        name: pokemon.name,
        id: pokemon.url.split("/").slice(-2, -1)[0],
      })
    );

    const detailsPromises = pokemonList.map(
      async (pokemon: { name: string; id: string }) => {
        try {
          const detailsResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon-form/${pokemon.id}`
          );
          if (!detailsResponse.ok)
            throw new Error(`Failed to fetch details for ${pokemon.name}`);

          const detailsData = await detailsResponse.json();

          return {
            ...pokemon,
            sprite: detailsData.sprites.front_default,
            types: detailsData.types.map(
              (t: { type: { name: string } }) => t.type.name
            ),
          };
        } catch (error) {
          return { ...pokemon, sprite: "", types: [] };
        }
      }
    );

    return await Promise.all(detailsPromises);
  } catch (error) {
    console.error(error);
    return [];
  }
});

export const pokemonDetailAtom = atomFamily((pokemonId: string) =>
  atom(async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Pokemon details");
      }
      const data = await response.json();

      const evolutionResponse = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonId}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch Pokemon details");
      }
      const evolutionData = await evolutionResponse.json();

      const speciesResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${data.name}`
      );
      if (!speciesResponse.ok) {
        throw new Error("Failed to fetch Pokemon species details");
      }
      const speciesData = await speciesResponse.json();

      const STAT_LABELS: Record<string, string> = {
        hp: "HP",
        attack: "Attack",
        defense: "Defense",
        "special-attack": "Sp. Atk",
        "special-defense": "Sp. Def",
        speed: "Speed",
      };

      const mapEvolutionChain = (chain: any, evolutions: any[] = []) => {
        if (!chain || !chain.species) return evolutions;

        chain.evolves_to.forEach((evolution: any) => {
          const evolutionDetails = evolution.evolution_details[0] || {};
          evolutions.push({
            from: chain.species.name,
            to: evolution.species.name,
            min_level: evolutionDetails.min_level || null,
            trigger: evolutionDetails.trigger?.name || "unknown",
          });

          mapEvolutionChain(evolution, evolutions);
        });

        return evolutions;
      };

      const evolutionStages = mapEvolutionChain(evolutionData.chain);

      return {
        name: data.name,
        id: data.id,
        sprite: data.sprites.front_default,
        types: data.types.map((t: { type: { name: string } }) => t.type.name),
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map(
          (a: { ability: { name: string } }) => a.ability.name
        ),
        species:
          speciesData.genera.find(
            (g: { language: { name: string } }) => g.language.name === "en"
          )?.genus || "Unknown",
        eggGroups: speciesData.egg_groups.map((g: { name: string }) => g.name),
        habitat: speciesData.habitat.name,
        gender: speciesData.gender_rate,
        stats: data.stats.map((item: any) => ({
          name: STAT_LABELS[item.stat.name] || item.stat.name,
          value: item.base_stat,
          effort: item.effort,
        })),
        moves: data.moves.map((item: any) => item.move.name),
        evolution: evolutionStages,
      };
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
      return null;
    }
  })
);
