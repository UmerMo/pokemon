import { useState, useEffect } from "react";
import { getPokemons } from "../graphql/fetch/getPokemons";
import styled from "styled-components";
import "../components/pokemon-card";
const Loading = styled.div`
  color: white;
`;

const PokemonView = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPokemons().then((response) => {
      setPokemons(response.data.pokemons);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loading>Loading pokemons... 🙃 </Loading>;
  }

  if (pokemons.length === 0) {
    return <p>Oops.. no data returned 😔</p>;
  }

  return <pokemon-card items={JSON.stringify(pokemons)} />;
};

export default PokemonView;
