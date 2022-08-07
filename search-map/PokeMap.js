let map;
let userCoords;
let locationCircle;
let markerArray = [];
let pokemonSpawn = [];
function loadPhase1Pages(page, e) {
  e.preventDefault();
  switch (page) {
    case "map":
      loadMapPage();
      break;
    case "inventory":
      loadInventoryPage();
      break;
    case "battle":
      loadBattlePage();
      break;
    case "pokewiki":
      loadPokeWikiPage();
      break;
    case "shop":
      loadShopPage();
      break;
    case "anime":
      loadAnimePage();
      break;
  }
}
function loadMapPage() {
  document.getElementById("change_main").innerHTML = `
  <div id="txt_header" class="container-fluid">
  <h1 id="above_headline">OG Presents</h1>
  <h1 id="game_headline">Pokemon-GO</h1>
  <h1 id="sub_headline">Game Center</h1>
</div>
<div class="container my-5">
  <h1 class="display-3 text-light text-center">In the Game center you can</h1>
</div>
<div class="container-fluid my-5">
  <div class="row d-flex justify-content-center">
    <div class="col-12 col-md-6 col-lg-3 mb-5 mx-5">
      <div class="bg-image picture_card shadow-5-strong">
        <img
          src="https://wallpaper.dog/large/5576460.jpg"
          class="img-fluid"
          alt="Sample"
        />
        <div class="mask" style="background-color: rgba(0, 0, 0, 0.6)">
          <div
            class="d-flex p-5 text-center justify-content-center align-items-center h-100"
          >
            <h1 class="card_txt">Explore The Map</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-3 mb-5 mx-5">
      <div class="bg-image picture_card">
        <img
          src="https://wallpaperaccess.com/full/109332.jpg"
          class="img-fluid "
          alt="Sample"
        />
        <div class="mask" style="background-color: rgba(0, 0, 0, 0.6)">
          <div
            class="d-flex p-5 text-center justify-content-center align-items-center h-100"
          >
            <h1 class="card_txt">Catch All The Pokemons</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-3 mb-5  mx-5">
      <div class="bg-image">
        <img
          src="https://img.wallpapersafari.com/desktop/1920/1080/90/89/UWq59F.jpg"
          class="img-fluid"
          alt="Sample"
        />
        <div class="mask" style="background-color: rgba(0, 0, 0, 0.6)">
          <div
            class="d-flex p-5 text-center  justify-content-center align-items-center h-100"
          >
            <h1 class="card_txt">Win Battles &Get Prizes</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="container my-5 d-flex justify-content-center">
  <h1 class="guide_headline" class="my-5">Game Tutorial</h1>
</div>
<div class="container-fluid">
  <div class="row">
    <div class="col-12 col-xl-6 my-5 d-flex justify-content-center">
      <div class="card mb-3 guide_card" style="max-width: 90%">
        <div class="row g-0">
          <div class="col-md-6">
            <img
              src="../images/guide1.jpeg"
              alt=""
              class="img-fluid rounded-start"
            />
          </div>
          <div class="col-md-6">
            <div class="card-body ">
              <h1 class="card-title display-2">Step 1</h1>
              <h2 class="card-text">
                Press the search button to search nearby Pokemons.Once you press the button the next scan will be available after 10 minutes.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-6 my-5 d-flex justify-content-center">
      <div class="card mb-3 guide_card " style="max-width: 90%">
        <div class="row g-0">
          <div class="col-md-6">
            <img
              src="../images/guide2.jpeg"
              alt=""
              class="img-fluid rounded-start"
            />
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h1 class="card-title display-2">Step 2</h1>
              <h2 class="card-text">
                The markers that apeared on the screen are nearby pokemons, press on them to see the information. 
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-6 my-5 d-flex justify-content-center">
      <div class="card mb-3 guide_card" style="max-width: 90%">
        <div class="row g-0">
          <div class="col-md-6">
            <img
              src="../images/guide3.jpeg"
              alt=""
              class="img-fluid rounded-start"
            />
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h1 class="card-title display-2">Step 3</h1>
              <h2 class="card-text">
                Press on the button on the bottom of the information card to try and capture the pokemon.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-6 my-5 d-flex justify-content-center">
      <div class="card mb-3 guide_card" style="max-width: 90%">
        <div class="row g-0">
          <div class="col-md-6">
            <img
              src="../images/guide4.jpeg"
              alt=""
              class="img-fluid rounded-start"
            />
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h1 class="card-title display-2">Step 4</h1>
              <h2 class="card-text">
               Now try to catch the pokemon, but notice that you only have 3 tries, and you can always pass on the pokemon and return to the map.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="container my-5  d-flex justify-content-center">
  <h1 class="guide_headline" class="my-5">Lets Get Started</h1>
</div>
<div id="covermap_con" class="container-fluid d-flex justify-content-center my-5">
  <div id="change_mapscene">
    <div id="map_scene" class="container-fluid">
      <div id="map_capture_div" class="row justify-content-center">
        <div id="map" class="col-10"></div>
      </div>
    </div>
    <div class="container mt-5 position-relative" id="battle_con">
      <div id="overlay">
        <div
          id="capture_con"
          class="d-flex justify-content-center align-items-center"
        >
          <img
            id="capture_pokeball"
            src="../images/final_closeball.png"
            alt=""
          />
          <div id="pokemon_capturedCon">
            <img id="pokemon_capturedImg" src="../images/fail.png" alt="" />
          </div>
          <div id="continue_div" class="p-4">
            <button
              type="button"
              class="btn btn-primary"
              onclick="continueScene()"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <div id="spawn_div" class="position-absolute top-50 start-50">
        <img id="spawn_poke" src="" alt="" />
      </div>
      <div
        id="text_box_con"
        class="position-absolute bottom-0 start-0 p-4 d-flex flex-column justify-content-center"
        style="z-index:1;"
      >
        <h2 id="text_box" class="p-2"></h2>
        <div class="p-2">
          <h5 id="capture_btn" onclick="throwAnimation()" class="press">
            <i class="arrow_right"></i> Capture
          </h5>
          <h5 onclick="returnToMapScene()" class="press">
            <i class="arrow_right"></i> Pass
          </h5>
        </div>
      </div>
      <div
        class="position-absolute end-0 bottom-0 p-4"
      ><div class="d-flex justify-content-end align-items-center">
        <img id="pokemon_ball_img" src="../images/pokemon_ball.png" alt="" />
        <h1 id="tries"></h1>
      </div>
      </div>
      <img
        class="position-absolute bottom-0 end-0"
        id="catch_pokemon_ball"
        src="../images/pokemon_ball.png"
        alt=""
      />
    </div>
  </div>
</div>
<div class="container my-5  d-flex flex-column align-items-center justify-content-center">
  <h1 class="guide_headline" class="my-5">Whats Next?</h1>
  <h1 class="display-1 text-white my-5 text-center">you can see all the pokemon you have captured in the Inventory page go and explore more</h1>

</div>
  `;
}

window.onload = () => {
  loadMapPage();
};
//Start page by search for user location
function startMap() {
  setTimeout(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(initMap);
    } else {
      console.log("error");
    }
  }, 2000);
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
