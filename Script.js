// Dark Theme
var Corpo = document.querySelector("body")
var Header = document.getElementById("Header")
function Sun(){
    localStorage.setItem("Theme",Corpo.style.background="#B63321")
    localStorage.setItem("Header",Header.style.background="#1654c0")
}
function Moon(){
    localStorage.setItem("Theme",Corpo.style.background="#35110d")
    localStorage.setItem("Header",Header.style.background="#0e2f68")
}
var Background = localStorage.getItem("Theme")
var HeaderBK = localStorage.getItem("Header")
Corpo.style.background = Background
Header.style.background = HeaderBK
let DivPokemon = document.querySelector("#Pokedex")
const fetchPokemon = () => {
    const getURl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
    const PokemonPromisses = []
    for (let i = 1; i <= 1008; i++){
    PokemonPromisses.push(fetch(getURl(i)).then(response => response.json()))
    }
    Promise.all(PokemonPromisses)
    .then(pokemons => {
        const lisPokemon = pokemons.reduce((accumulator,pokemon) => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)
            const stats = pokemon.stats.map(StatInfo => StatInfo.stat.name)
            const base = pokemon.stats.map((el) => el.base_stat)
            const ability = pokemon.abilities.map(AbilInfo => AbilInfo.ability.name)
            const move = pokemon.moves.map(MoveInfo => MoveInfo.move.name)
            accumulator +=
            `
            <div id="PokeBox">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${pokemon.id}.png" alt="">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${pokemon.id}.png" alt="">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id}.png" alt="">
            <div id="Status">
            <h6>Nº${pokemon.id}</h6>
            <h1>${pokemon.name}</h1>
            <h3>${types.join("/")}</h3>
            <span></span>
            <h4>${stats.join("<br>")}</h4>
            <h5>${base.join("<br>")}</h5>
            <h2>Base de experiência: ${pokemon.base_experience}</h2>
            <h6>Peso: ${pokemon.weight} kg e Altura: ${pokemon.height}</h6>
            <h4>Abilidades: ${ability.join("/")}</h4>
            <p>Movimentos: ${move.join(",")}</p>
            </div>
            </div>
            <div id="Pular"></div>
            `
            return accumulator
        },'')
        const ul = document.querySelector('[data-key="Poke"]')
        ul.innerHTML = lisPokemon
    })
}
fetchPokemon()
