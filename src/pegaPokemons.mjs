export async function pegaPokemons(lista) {
  await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
    .then((res) => res.json())
    .then((json) => {
      json.results.map(async (pokemon) => {
        await fetch(pokemon.url)
          .then((res) => res.json())
          .then((json) => {
            lista.innerHTML += `
                    <li class="pokemon_card">
                        <img class="pokemon_card_img" src="${json.sprites.front_default}"/>
                        <label>${json.name}</label>
                    </li>`;
          });
      });
    });
}
