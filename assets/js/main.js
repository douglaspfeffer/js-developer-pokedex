const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const profileContent = document.getElementById('profileContent');

// window.location.search is the URL parameter after questing mark (?)
//  params is the object that receive the URL parameters
const params = new URLSearchParams(window.location.search);
// params.get("id") is used to get the ID
const id = params.get("id");

const maxRecords = 151
const limit = 10
let offset = 0;

// Verify if the ID has value and call the function ( if it has ID )
if (id) {
    getProfilePokemon(id);
}

function getProfilePokemon(id) {
    pokeApi
        .getPokemonDetailsToProfile(id)
        .then((pokemon) => {

            const newHtml =
                `
        <!-- Basic information section -->
        
        <section class="details">
            <div class="basic">
            <div class="basic ${pokemon.type}">
            <div class="buttons">
                <div class="back">
                    <button type="button" class="arrow-back" onclick="window.location.href='index.html'">
                        <img src="./assets/img/arrow.png" alt="back">
                    </button>
                </div>
            </div>
                    <h1 class="name">${pokemon.name}</h1>
                    <p class="number">#${pokemon.number}</p>
                    <ul class="types">
                        ${pokemon.types
                            .map((type) => `<li class="type ${type}"> ${type}</li>`)
                            .join("")}
                    </ul>
                    <img class="img" src="${pokemon.photo}" alt="${pokemon.img}">
                </div>
            </div>
            <div class="menu_items" id="about">
                <ul class="atributes">
                    <li class="span-details" id="hp">HP <b>${pokemon.hp}</b></li>
                    <li class="span-details" id="attack">Attack <b>${pokemon.attack}</b></li>
                    <li class="span-details" id="defense">Defense <b>${pokemon.defense}</b></li>
                    <li class="span-details" id="height">Height <b>${pokemon.height}</b></li>
                    <li class="span-details" id="weight">Weight <b>${pokemon.weight}</b></li>
                </ul>
                        
                <ul class="skills">
                    <a class="skill" id="abilities">Abilities: ${pokemon.abilities}</a>
                </ul>
            </div>
            
        </selection>
        `;
            if (profileContent) {
                profileContent.innerHTML = newHtml;
            }
        })
        .catch((error) => console.log(error));
}

function enterToProfile(id) {   //redirectToProfile
    const detailsURL = `details.html?id=${id}`;
    window.location.href = detailsURL;
}

function showItems(category) {    //showItems(about)
    let menuItems = document.querySelectorAll(".menu_items");  //menu_items
    menuItems.forEach((item) => {
        item.classList.remove("active");
    });

    document.getElementById(category).classList.add("active")
}

function convertPokemonToLi(pokemon) {
    return `
        <button id="${pokemon.number}" class="pokemon-card" onclick="enterToProfile(${pokemon.number})">
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">                     
                </div>
            </li>
        </button>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

const pokemonBody = document.querySelector('body')
let pokemonContent = document.querySelector('.content')
const pokemonHeader = document.querySelector('header')

let pokemonClick = document.querySelector('#click')

let fillGeneral = () => {
    pokeApi.getPokemonGeneral()
    .then((pokemon) => {
        pokemonClick.innerHTML = `
        <ol>
            <li class="list">
                <span class="txt-${pokemon.types[0]} bold">Weight</span>
                <span class="txt-light-gray">${pokemon.weight}</span>
            </li>
            <li class="list">
                <span class="txt-${pokemon.types[0]} bold">Height</span>
                <span class="txt-light-gray">${pokemon.height}</span>
            </li>
            <li class="list">
                <span class="txt-${pokemon.types[0]} bold">Abilities</span>
                ${pokemon.abilities.map((ability) => `<span class="txt-light-gray">${ability}</span>`).join('')}
            </li>
        </ol>
        <h3 class="txt-dark-gray">Breeding</h3>
        <ol>
            <li class="list">
                <span class="txt-${pokemon.types[0]} bold">Gender</span>
                <span class="txt-dark-gray bold">Male: <span class="txt-light-gray">${pokemon.gender.male}</span></span>
                <span class="txt-dark-gray bold">Female:<span class="txt-light-gray"> ${pokemon.gender.female}</span></span>
            </li>
            <li class="list">
                <span class="txt-${pokemon.types[0]} bold">Egg Group</span>
                ${pokemon.eggGroups.map((eggGroup) => `<span class="txt-light-gray">${eggGroup}</span>`).join('')}
            </li>
            <li class="list">
                <span class="txt-${pokemon.types[0]} bold">Egg Cycle</span>
                <span class="txt-light-gray">${pokemon.eggCycle}</span>
            </li>
        </ol>`

    const buttonActived = document.querySelector(".active")
    buttonActived.classList.remove("active", "border-radius", "txt-dark-gray", `${pokemon.types[0]}`)
    buttonActived.classList.add(`txt-${pokemon.types[0]}`)

    const buttonSelected = document.querySelector("#general")
    buttonSelected.classList.add("active", "border-radius", "txt-dark-gray", `${pokemon.types[0]}`)
    buttonSelected.classList.remove(`txt-${pokemon.types[0]}`)})
}

let fillBaseStats = () => {
    
}

let fillEvolution = () => {
    
}

let fillMoves = () => {
    
}