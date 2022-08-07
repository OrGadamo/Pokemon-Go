let pokemonAnime = [];
function loadAnimePage() {
  document.getElementById("change_main").innerHTML = `
  <div class="container-fluid my-5 d-flex flex-column align-items-center">
  <h1 class="mb-5" id="headline_anime">Anime Center <i id="anime_icon" class="fas fa-film"></i></h1> 
  <h1 class="mt-5 text-white text-center display-4">Here you can find all anime related to pokemon including the pokemon series</h1>
</div>
<div class="gif_con d-flex flex-wrap justify-content-center my-5 mx-auto">  
      <img class="w-25" src="https://www.gifcen.com/wp-content/uploads/2022/04/pokemon-gif-8.gif" alt="">
      <img class="w-25" src="https://media3.giphy.com/media/nfnF2zVPRemXu/200.gif" alt="">
      <img class="w-25" src="https://media1.giphy.com/media/fSvqyvXn1M3btN8sDh/giphy.gif" alt="">
      <img class="w-25" src="https://i.pinimg.com/originals/3a/f1/cc/3af1cc2e440012b9a79255b4f19190fc.gif" alt="">
      <img class="w-25" src="https://i.pinimg.com/originals/08/0f/f3/080ff34d3305888ca6e7e216fedc60dc.gif" alt="">
      <img class="w-25" src="https://i.chzbgr.com/full/8542493440/h4743AFCE/pokemon-memes-pikachu-gif" alt="">
      <img class="w-25" src="https://i.gifer.com/BjzW.gif" alt="">
      <img class="w-25" src="https://phoneky.co.uk/thumbs/screensavers/down/cartoon-anime/cutepikach_1QDbPL0n.gif" alt="">
      <img class="w-25" src="https://i.gifer.com/XX0b.gif" alt="">
      <img class="w-25" src="https://i.pinimg.com/originals/7d/8e/ce/7d8ece07bdf7e7aeba520ee0a5adcaa8.gif" alt="">
      <img class="w-25" src="https://c.tenor.com/xt1bXo5kKfsAAAAd/pikachu-ketchup.gif" alt="">
      <img class="w-25" src="https://i.gifer.com/embedded/download/HR50.gif" alt="">
</div>
<h1 class="display-5 my-5 text-white text-center">Here you can search Anime by Name</h1>
<div id="search_form" class="my-5">
  <div class="input-group">
    <div class="form-outline form-white w-75">
      <input oninput="searchAnime()" type="search" id="anime_search" class="form-control form-control-lg" />
      <label class="form-label" for="form1">Search</label>
    </div>
    <button onclick="searchAnime()" type="button" class="btn btn-warning btn-lg">
      <i class="fas fa-search"></i>
    </button>
  </div>
</div>
<div class="container-fluid my-5">
  <div class="row" id="anime_con">
  </div>
</div>
  `;
  getAnimeArr();
}
function getAnimeArr() {
  getAnimeAPI().then((res) => {
    pokemonAnime = PokeAnime.switchAPIDataToClass(res);
    displayAnime(pokemonAnime);
  });
}
function displayAnime(arr) {
  document.getElementById("anime_con").innerHTML = "";
  arr.forEach((anime) => {
    document.getElementById("anime_con").innerHTML += anime.getAnimeCard();
  });
}
function searchAnime() {
  let search = document.getElementById("anime_search").value.toLowerCase();
  let searchArr = pokemonAnime.filter((anime) =>
    anime.title.toLowerCase().includes(search)
  );
  searchArr.length > 0 ? displayAnime(searchArr) : searchErrorMessage();
}
function searchErrorMessage() {
  document.getElementById(
    "anime_con"
  ).innerHTML = `<h1 class="display-1 text-white text-center">No search results</h1>`;
}
