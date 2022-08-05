let map;
let userCoords;
let locationCircle;
let markerArray = [];
let pokemonSpawn = [];
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

//Start page by search for user location
function startMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initMap);
  } else {
    console.log("error");
  }
}

//get location and initialize map,user marker
function initMap(position) {
  userCoords = position.coords;
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: userCoords.latitude, lng: userCoords.longitude },
    zoom: 17,
  });
  new google.maps.Marker({
    position: { lat: userCoords.latitude, lng: userCoords.longitude },
    map: map,
  });
  createSonarCircle();
  createRadarBtnOnMap();
}
//create radar button
function createRadarBtnOnMap() {
  let btn = document.createElement("button");
  btn.className = "btn btn-danger";
  btn.id = "radar_btn";
  btn.innerText = "Press To Scan";
  btn.addEventListener("click", main);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(btn);
}

//create sonar circle
function createSonarCircle() {
  locationCircle = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0,
    map,
    center: map.center,
    radius: 200,
  });
}

//send a random coords inside radar circle
function getRandomPokemonCoords() {
  var bounds = locationCircle.getBounds();
  var sw = bounds.getSouthWest();
  var ne = bounds.getNorthEast();
  var ptLat = Math.random() * (ne.lat() - sw.lat()) + sw.lat();
  var ptLng = Math.random() * (ne.lng() - sw.lng()) + sw.lng();
  return { lat: ptLat, lng: ptLng };
}

// get coords and pokemon and spawn on map
function setPokeMarker(coords, pokemon) {
  markerArray.push(
    new google.maps.Marker({
      position: { lat: coords.lat, lng: coords.lng },
      map: map,
      icon: "../icons/marker_icon.png",
      animation: google.maps.Animation.BOUNCE,
    })
  );
  let index = markerArray.length - 1;
  let infowindow = new google.maps.InfoWindow({
    content: getPokemonInfo(pokemon, index),
  });
  markerArray[index].addListener("click", () => {
    infowindow.open({
      anchor: markerArray[index],
      map,
      shouldFocus: false,
    });
  });
}

//change spwan array to pokemon type
function getClassPokemonArray() {
  let pokeArr = [];
  pokemonSpawn.forEach((pokemon) => {
    pokeArr.push(Pokemon.switchAPIPokemonToClass(pokemon));
  });
  pokemonSpawn = pokeArr;
}

//API call to poke api
async function getPokemonById(id) {
  try {
    return await fetch(`${pokeAPI}${id}`).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}

//create Random length of pokemon array
function setRandomPokemonsArrMarkers() {
  let num_of_pokemons = Math.floor(Math.random() * 5) + 3;
  for (let i = 0; i < num_of_pokemons; i++) {
    createRandomPokemonsArray(num_of_pokemons);
  }
}

//create entry in pokemon array
function createRandomPokemonsArray(pokeNum) {
  getPokemonById(Math.floor(Math.random() * 100) + 1).then((res) => {
    pokemonSpawn.push(res);
    if (pokemonSpawn.length == pokeNum) {
      setPokemonsArrMarkers();
    }
  });
}

//send a pokemon infobox
function getPokemonInfo(pokemon, index) {
  return ` <div class="container-fluid">
  <div class="row d-flex justify-content-center">
    <div class="card col-12">
      <div
        class="bg-image hover-overlay ripple d-flex justify-content-center"
        data-mdb-ripple-color="light"
      >
        <img
          src="${pokemon.front_pic}"
          class="img-fluid"
        />
        <a href="#!">
          <div
            class="mask"
            style="background-color: rgba(251, 251, 251, 0.15)"
          ></div>
        </a>
      </div>
      <div class="card-body">
      <h5 class="card-title">${pokemon.name}</h5>
      <a href="#!" onclick="changeToScene(${index})" class="btn btn-danger">Capture</a>
      
      </div>
    </div>
  </div>
</div>`;
}

//send pokemon array to set markers
function setPokemonsArrMarkers() {
  getClassPokemonArray();
  pokemonSpawn.forEach((pokemon) => {
    let coords = getRandomPokemonCoords();
    setPokeMarker(coords, pokemon);
  });
}
//scanner animation
function scanRadarAnimation() {
  let fillHelper = 0;
  let strokeHelper = 0;
  let intervalId = setInterval(() => {
    if (locationCircle.fillOpacity < 0) {
      fillHelper = 0;
      strokeHelper = 0;
    }
    locationCircle.setOptions({
      fillOpacity: 0.35 - fillHelper,
      strokeOpacity: 0.8 - strokeHelper,
    });
    fillHelper = fillHelper + 0.07;
    strokeHelper = strokeHelper + 0.16;
  }, 40);

  setTimeout(() => {
    clearInterval(intervalId);
    locationCircle.setOptions({
      fillOpacity: 0,
      strokeOpacity: 0,
    });
  }, 3000);
}

//start pokemon search
function main() {
  scanRadarAnimation();
  document.getElementById("radar_btn").disabled = true;
  setTimeout(() => {
    document.getElementById("radar_btn").disabled = false;
  }, 600000);
  setTimeout(() => {
    setRandomPokemonsArrMarkers();
  }, 3000);
}

function changeToScene(index) {
  deleteMarker(index);
  document.getElementById("map_scene").style.display = "none";
  mainCaptureScene(pokemonSpawn[index]);
}
function deleteMarker(index) {
  markerArray[index].setMap(null);
}
