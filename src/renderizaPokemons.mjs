export async function renderizaPokemons(lista, pagina = 0) {
	await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pagina * 20}&limit=${(pagina * 20) + 20}`)
	.then((res) => res.json())
		.then((pokemons) => {
			pokemons.results.map(async (pokemon) => {
				await fetch(pokemon.url)
					.then((res) => res.json())
					.then((json) => {
						lista.innerHTML += `
							<li class="pokedex_card">
								<img class="pokedex_card_img" src="${json.sprites.front_default}"/>
								<h2>${primeiraLetraMaiuscula(json.name)}</h2>
								<h3 class="pokemon_id">${json.id}</h3>
							</li>
						`;
					})
					.then(() => {
						const card_highlight = document.querySelector('.card_highlight')
						document.querySelectorAll('.pokedex_card')
							.forEach((item) => item.addEventListener('click', async() => {
								aparece()
								console.log(item.childNodes[5].innerText)
								await fetch(`https://pokeapi.co/api/v2/pokemon/${item.childNodes[5].innerText}/`)
								.then((res) => res.json())
								.then((json) => {
									console.log(json)
									card_highlight.innerHTML = `
									<button class="sair">&times;</button>
									<img class="card_highlight_img" src="${json.sprites.front_default}"/>
									<h2 class="card_highlight_titulo">${primeiraLetraMaiuscula(json.name)}</h2>
									`
									document.querySelector('.sair')
										.addEventListener('click', desaparece)
								})
							}))

						document.querySelector('.overlay')
							.addEventListener('click', desaparece)
					});
			});
		});
}

function aparece() {
	document.querySelector('.card_highlight')
		.classList
			.remove('hidden')

	document.querySelector('.overlay')
		.classList
			.remove('hidden')
}

function desaparece() {
	document.querySelector('.card_highlight')
		.classList
			.add('hidden')

	document.querySelector('.overlay')
		.classList
			.add('hidden')

	document.querySelector('.card_highlight')
		.innerHTML = ''
}

function primeiraLetraMaiuscula(palavra) {
	return palavra[0].toUpperCase() + palavra.substring(1)
}