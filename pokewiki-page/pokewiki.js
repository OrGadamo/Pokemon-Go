const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
//new pokemon class
class Pokemon {
  constructor(
    name,
    front_pic,
    back_pic,
    species,
    pastType,
    stats,
    type,
    moves,
    abilities
  ) {
    this.name = Pokemon.getPokemonNameCaptilise(name);
    this.front_pic = front_pic;
    this.back_pic = back_pic;
    this.species = species;
    this.pastType = pastType;
    this.stats = stats;
    this.type = type;
    this.moves = moves;
    this.abilities = abilities;
  }
  static getPokemonNameCaptilise(name) {
    return name[0].toUpperCase() + name.substr(1);
  }
  static switchAPIPokemonToClass(pokemon) {
    return new Pokemon(
      pokemon.name,
      pokemon.sprites.other.dream_world.front_default,
      pokemon.sprites.back_default,
      pokemon.species.name,
      Pokemon.CheckPastTypes(pokemon.past_types),
      Pokemon.getCleanStats(pokemon.stats),
      Pokemon.getCleanTypes(pokemon.types),
      Pokemon.getMoveList(pokemon.moves),
      Pokemon.getAbillities(pokemon.abilities)
    );
  }
  static CheckPastTypes(pastArr) {
    return pastArr.length > 0 ? pastArr : null;
  }
  static getCleanStats(stats) {
    let newStats = [];
    stats.forEach((stat) => {
      newStats.push({
        num_stat: stat["base_stat"],
        name_stat: stat["stat"]["name"],
      });
    });
    return newStats;
  }
  static getCleanTypes(types) {
    let newType = [];
    if (Array.isArray(types)) {
      types.forEach((type) => {
        newType.push(type["type"]["name"]);
      });
    } else {
      newType.push(types["type"]["name"]);
    }
    return newType;
  }
  static getMoveList(moves) {
    let movesList = [];
    moves.map((move) => {
      if (movesList.length < 6) movesList.push(move["move"]["name"]);
    });
    return movesList;
  }
  static getAbillities(abilities) {
    let abilitiesList = [];
    if (Array.isArray(abilities)) {
      abilities.forEach((ability) => {
        abilitiesList.push(ability.ability.name);
      });
    } else {
      abilitiesList.push(abilities ? abilities.ability.name : null);
    }
    return abilitiesList;
  }
  getStringStats() {
    let result = "";
    this.stats.forEach((stat) => {
      result += `${stat.num_stat}-${stat.name_stat} `;
    });
    return result;
  }
  getStringTypes() {
    let result = "";
    this.type.forEach((type_name) => {
      result += result == "" ? type_name : `, ${type_name}`;
    });
    return result;
  }
  getStringAbilities() {
    let result = "";
    this.abilities.forEach((ability) => {
      result += result == "" ? ability : `, ${ability}`;
    });
    return result;
  }
  getStringMoves() {
    let result = "";
    this.moves.forEach((move) => {
      result += result == "" ? move : `, ${move}`;
    });
    return result;
  }
}
async function getPokemonById(id) {
  try {
    return await fetch(`${pokeAPI}${id}`).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}
let displayPoke = [];
function getRandomDisplayId(num) {
  let idArr = [];
  for (let i = 0; i < num; i++) {
    idArr.push(Math.floor(Math.random() * 500) + 1);
  }
  return idArr;
}
async function getPokemonArr(num) {
  getRandomDisplayId(num).forEach((id) => {
    getPokemonById(id).then((res) => {
      displayPoke.push(Pokemon.switchAPIPokemonToClass(res));
      if (displayPoke.length == num) displayPokemonArray(displayPoke);
    });
  });
}
getPokemonArr(100);
// "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/485.png"
function getPokeInfoCard(pokemon) {
  return `
    <div class="col-12 col-sm-6 col-lg-4 col-xl-3 col-xxl-2 mb-3 d-flex align-items-strech">
    <div class="card">
        <img src="${
          pokemon.front_pic
        }" class="card-img-top wiki_pokeImg" alt="Fissure in Sandstone"/>
        <div class="card-body">
            <div class="p-2">
                <h2 id="poke_title">${pokemon.name}</h2>
                <h4 class="poke_info"><strong>Species</strong>: ${
                  pokemon.species
                }</h4>
                <h4 class="poke_info"><strong>Type</strong>: ${pokemon.getStringTypes()}</h4>
                <h4 class="poke_info"><strong>Stats</strong>: ${pokemon.getStringStats()}</h4>
                <h4 class="poke_info"><strong>Abilities</strong>: ${pokemon.getStringAbilities()}</h4>
                <h4 class="poke_info"><strong>Moves</strong>: ${pokemon.getStringMoves()}</h4>
                <h4 class="poke_info"><strong>Last Type</strong>: ${
                  pokemon.pastType ? pokemon.pastType : "none"
                }</h4>
                </div>
        </div>
      </div>
</div>
    `;
}
function displayPokemonArray(arr) {
  document.getElementById("pokewiki_con").innerHTML = "";
  arr.forEach((pokemon) => {
    document.getElementById("pokewiki_con").innerHTML +=
      getPokeInfoCard(pokemon);
  });
}
function searchPokemon() {
  let search = document.getElementById("poke_search").value.toLowerCase();
  let searchArr = displayPoke.filter((poke) =>
    poke.name.toLowerCase().includes(search)
  );
  searchArr.length > 0
    ? displayPokemonArray(searchArr)
    : searchPokeInApi(search);
}
function searchPokeInApi(search) {
  getPokemonById(search).then((res) => {
    if (res) {
      displayPokemonArray([Pokemon.switchAPIPokemonToClass(res)]);
    } else displaySearchError();
  });
}
function displaySearchError() {
  document.getElementById(
    "pokewiki_con"
  ).innerHTML = `<h1 class="text-center text-white">No Search Result</h1>`;
}
