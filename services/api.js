const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
const animeAPI = "https://api.jikan.moe/v3/search/anime?q=pokemon";
const berriesAPI = "https://pokeapi.co/api/v2/berry?offset=20&limit=50";
//API call to poke api
async function getPokemonById(id) {
  try {
    return await fetch(`${pokeAPI}${id}`).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}
//Pokemon Anime Fetch
async function getAnimeAPI() {
  try {
    return await fetch(animeAPI)
      .then((res) => res.json())
      .then((res) => res.results);
  } catch (e) {
    console.log(e);
  }
}
//berries fetch
async function getBerriesAPI() {
  try {
    return await fetch(berriesAPI)
      .then((res) => res.json())
      .then((res) => res.results);
  } catch (error) {
    console.log(error);
  }
}
async function getBerry(API) {
  try {
    return await fetch(API).then((res) => res.json());
  } catch (e) {
    console.log(e);
  }
}
