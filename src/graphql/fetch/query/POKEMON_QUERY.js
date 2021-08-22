const POKEMON_QUERY = `
{
    pokemons(first: 151) {
      id,
      name,
      image,
      attacks {
        fast {
          name
        },
        special {
          name
        }
      }
    }
  }
`;

export default POKEMON_QUERY;
