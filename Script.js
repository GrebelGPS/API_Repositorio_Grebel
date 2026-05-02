//  CONFIGURACIÓN
const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=1025";
const contenedor = document.getElementById("contenedor");

//  API 
async function fetchData(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Hubo un error en la AAPI");
        return await res.json();
    } catch (error) {
        console.error(error);
    }
}

//  TRAE LOS POKEMONE
async function getPokemons() {
    const data = await fetchData(API_URL);
    if (!data) return;

    const detalles = data.results.map(p => fetchData(p.url));
    const pokemons = await Promise.all(detalles);

    renderPokemons(pokemons);
}

// CARDS
function createCard(pokemon) {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h2>${pokemon.name}</h2>
        <p class="tipo">${pokemon.types[0].type.name}</p>
    `;

    return card;
}

function renderPokemons(pokemons) {
    const fragment = document.createDocumentFragment();

    pokemons.forEach(pokemon => {
        fragment.appendChild(createCard(pokemon));
    });

    contenedor.appendChild(fragment);
}
 
document.addEventListener("DOMContentLoaded", getPokemons);