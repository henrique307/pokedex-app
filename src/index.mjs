import {renderizaPokemons} from './renderizaPokemons.mjs'
const c = console.log.bind(console)

const pokedexList = document.querySelector('.pokedex_list')

renderizaPokemons(pokedexList, 0)