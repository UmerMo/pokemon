import POKEMON_QUERY from "./query/POKEMON_QUERY";

export const getPokemons = () => {
  return fetch("https://graphql-pokemon2.vercel.app/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: POKEMON_QUERY }),
  }).then((response) => response.json());
};
