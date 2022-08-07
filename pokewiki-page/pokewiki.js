let displayPoke = [];
function loadPokeWikiPage() {
  document.getElementById("change_main").innerHTML = `
  <div class="container-fluid my-5 text-center">
  <h1 id="headline_wiki"><i style="transform: translate(50%, -90%);" class="fas fa-search wiki_icon"></i>PokEWiki Center<i style="transform: translate(-50%, 80%);" class="fas fa-globe-americas wiki_icon"></i></h1>
  <h1 class="display-4 text-white">Here in the PokeWiki you can explore and learn about new pokemons</h1>
</div>
<div class="container-fluid">
  <div class="row">
      <div class="col-6 d-flex p-4 justify-content-end">
          <img id="fireImg_con" class="col-10 px-0 img-fluid rounded-8 border border-dark" src="../images/fire-poke.png" alt="">
      </div>
      <div class="col-6 d-flex p-4 justify-content-start">
          <img id="grassImg_con" class="col-10 px-0 img-fluid rounded-8 border border-dark" src="../images/grass-poke.png" alt="">
      </div>
       <div class="col-6 d-flex p-4 justify-content-end">
          <img id="normalImg_con" class="col-10 px-0 img-fluid rounded-8 border border-dark" src="../images/normal-poke.png" alt="">
      </div>
      <div class="col-6 d-flex p-4 justify-content-start">
          <img id="waterImg_con" class="col-10 px-0 img-fluid rounded-8 border border-dark" src="../images/water-poke.png" alt="">
      </div>
  </div>
</div>
<div id="search_form" class="my-5">
  <div class="input-group">
    <div class="form-outline form-white w-75">
      <input type="search" id="poke_search" class="form-control form-control-lg whiteInput" />
      <label class="form-label" for="form1">Search</label>
    </div>
    <button onclick="searchPokemon()" type="button" class="btn btn-warning btn-lg">
      <i class="fas fa-search"></i>
    </button>
  </div>
</div>
<div class="container-fluid my-5">
  <div class="row" id="pokewiki_con">
  </div>
</div>
  `;
  displayPoke = [];
  getPokemonArr(100);
}
function getRandomDisplayId(num) {
  let idArr = [];
  for (let i = 0; i < num; i++) {
    idArr.push(Math.floor(Math.random() * 500) + 1);
  }
  return idArr;
}
function getPokemonArr(num) {
  getRandomDisplayId(num).forEach((id) => {
    getPokemonById(id).then((res) => {
      displayPoke.push(Pokemon.switchAPIPokemonToClass(res));
      if (displayPoke.length == num) displayPokemonArray(displayPoke);
    });
  });
}
function getPokeInfoCard(pokemon) {
  return `
    <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-3 d-flex align-items-strech">
    <div class="card">
        <img src="${
          pokemon.front_pic
        }" class="card-img-top wiki_pokeImg" alt="Fissure in Sandstone"/>
        <div class="card-body">
            <div class="p-2">
                <h2 class="wiki_title">${pokemon.name}</h2>
                <h4 class="wiki_info"><strong>Species</strong>: ${
                  pokemon.species
                }</h4>
                <h4 class="wiki_info"><strong>Type</strong>: ${pokemon.getStringTypes()}</h4>
                <h4 class="wiki_info"><strong>Stats</strong>: ${pokemon.getStringStats()}</h4>
                <h4 class="wiki_info"><strong>Abilities</strong>: ${pokemon.getStringAbilities()}</h4>
                <h4 class="wiki_info"><strong>Moves</strong>: ${pokemon.getStringMoves()}</h4>
                <h4 class="wiki_info"><strong>Last Type</strong>: ${
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
