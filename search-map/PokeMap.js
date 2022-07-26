let map;
let userCoords;
let locationCircle;
let markerArray = [];
let pokemonSpawn;
class Pokemon {
  constructor(name, front_pic, back_pic) {
    this.name = name;
    this.front_pic = front_pic;
    this.back_pic = back_pic;
  }
}
window.onload = () => {};
function startMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLocation);
  } else {
    console.log("error");
  }
}
function getLocation(position) {
  userCoords = position.coords;
  initMap(position.coords);
}
function initMap(coords) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: coords.latitude, lng: coords.longitude },
    zoom: 16,
  });
  new google.maps.Marker({
    position: { lat: coords.latitude, lng: coords.longitude },
    map: map,
  });
  locationCircle = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0,
    map,
    center: map.center,
    radius: 1000,
  });
  console.log(locationCircle);
}
//מקבל מיקום רנדומאלי ומידע על הפוקימון ומציג מרקר חדש
function setPokeMarker(coords, pokemon) {
  markerArray.push(
    new google.maps.Marker({
      position: { lat: coords.lat, lng: coords.lng },
      map: map,
      icon: "../icons/marker_icon.png",
      animation: google.maps.Animation.BOUNCE,
    })
  );
  let infowindow = new google.maps.InfoWindow({
    content: getPokemonInfo(pokemon),
  });
  let index = markerArray.length - 1;
  markerArray[index].addListener("click", () => {
    infowindow.open({
      anchor: markerArray[index],
      map,
      shouldFocus: false,
    });
  });
}
//מחזיר מיקום רנדומאלי
function getRandomPokemonCoords() {
  var bounds = locationCircle.getBounds();
  var sw = bounds.getSouthWest();
  var ne = bounds.getNorthEast();
  var ptLat = Math.random() * (ne.lat() - sw.lat()) + sw.lat();
  var ptLng = Math.random() * (ne.lng() - sw.lng()) + sw.lng();
  return { lat: ptLat, lng: ptLng };
}
function getClassPokemonArray() {
  let pokeArr = [];
  pokemonSpawn.forEach((pokemon) => {
    pokeArr.push(switchPokemonToClass(pokemon));
  });
  pokemonSpawn = pokeArr;
}
function switchPokemonToClass(pokemon) {
  return new Pokemon(
    pokemon.name,
    pokemon.sprites.other.dream_world.front_default,
    pokemon.sprites.back_default
  );
}
//מחזיר אובייקט של פוקימון
async function getPokemonById(id) {
  try {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
      res.json()
    );
  } catch (error) {
    console.log(error);
  }
}
//מחזיר מערך רנדומאלי של אובייקטי פוקימונים
function setRandomPokemonsArrMarkers() {
  let num_of_pokemons = Math.floor(Math.random() * 11) + 5;
  let pokemonsArr = [];
  for (let i = 0; i < num_of_pokemons; i++) {
    getPokemonById(Math.floor(Math.random() * 100) + 1).then((res) => {
      pokemonsArr.push(res);
      if (pokemonsArr.length == num_of_pokemons) {
        console.log(pokemonsArr[0]);
        setPokemonsArrMarkers(pokemonsArr);
      }
    });
  }
}
//מחזיר את תיבת המידע של הפוקימון
function getPokemonInfo(pokemon) {
  return ` <div class="container">
  <div class="row d-flex justify-content-center">
    <div class="card col-11">
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
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a href="#!" class="btn btn-primary">Capture</a>
      </div>
    </div>
  </div>
</div>`;
}
function setPokemonsArrMarkers(pokeArr) {
  pokemonSpawn = pokeArr;
  getClassPokemonArray();
  pokemonSpawn.forEach((pokemon) => {
    let coords = getRandomPokemonCoords();
    setPokeMarker(coords, pokemon);
  });
}
function main() {
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
    setRandomPokemonsArrMarkers();
  }, 3000);
}
