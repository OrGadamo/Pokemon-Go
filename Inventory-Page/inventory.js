function loadInventoryPage() {
  document.getElementById("change_main").innerHTML = `
  <div class="container-fluid mb-5 d-flex justify-content-center">
  <h1 id="headline_inven">Inventory</h1>
</div>
<div class="container-fluid mt-5 d-flex justify-content-center">
  <h1 class="display-2 text-white">
    Here you can see all your Pokemons
  </h1>
</div>
<div class="container d-flex justify-content-center">
<div class="row d-flex justify-content-center" id="badge_con">
</div>
</div>
<div class="container-fluid d-flex justify-content-center" id="inven_con">
</div>
<div class="container-fluid d-flex justify-content-center mb-5">
  <div class="row inven_poke stage_con text-white" id="poke_div">
  </div>
</div>
  `;
  if (capturedPokemon.length > 0) {
    displayStage();
    captureDisplay(0);
    displayInventory();
  } else printErrorMessage();
  displayBadges();
}
function displayCapturedPokemon(index) {
  document.getElementById("poke_div").innerHTML += `
    <div onclick="captureDisplay(${index})" class="border border-dark col-6 col-sm-4 col-lg-2 d-flex justify-content-center align-items-center">
    <img class="poke_box" src="${capturedPokemon[index].front_pic}" alt="">
  </div>
    `;
}
function captureDisplay(index) {
  document.getElementById("stage_poke").src = capturedPokemon[index].front_pic;
  document.getElementById("poke_detail").innerHTML = getCapturedInfo(index);
}
function getCapturedInfo(index) {
  let pokemon = capturedPokemon[index];
  return `
  <div class="p-2">
  <h1 id="poke_title">${pokemon.name}</h1>
  <h2 class="poke_info"><strong>Species</strong>: ${pokemon.species}</h2>
  <h2 class="poke_info"><strong>Type</strong>: ${pokemon.getStringTypes()}</h2>
  <h2 class="poke_info"><strong>Stats</strong>: ${pokemon.getStringStats()}</h2>
  <h2 class="poke_info"><strong>Abilities</strong>: ${pokemon.getStringAbilities()}</h2>
  <h2 class="poke_info"><strong>Moves</strong>: ${pokemon.getStringMoves()}</h2>
  <h2 class="poke_info"><strong>Last Type</strong>: ${
    pokemon.pastType ? pokemon.pastType : "none"
  }</h2>
  </div>
    `;
}
function displayInventory() {
  capturedPokemon.forEach((item, index) => {
    displayCapturedPokemon(index);
  });
}
function printErrorMessage() {
  document.getElementById(
    "inven_con"
  ).innerHTML = `<h1 class="text-white">No Pokemons Found</h1>`;
}
function displayStage() {
  document.getElementById("inven_con").innerHTML = `
    <div class="row p-5 inven_poke stage_con border border-dark">
          <div id="poke_detail" class="col-12 col-lg-7">
  
          </div>
          <div class="col-12 col-lg-5 p-5 d-flex flex-column justify-content-end align-items-center">
            <img id="stage_poke" src="" alt="">
            <img id="stage" src="../images/stage.png" alt="">
          </div>
        </div>
    `;
}
function displayBadges() {
  if (userBadge.length > 0) {
    userBadge.forEach((badge) => {
      document.getElementById("badge_con").innerHTML += `
      <div class="col-3 border border-dark">
      <img src="../images/${badge}_badge.png" alt="" class="img-fluid">
    </div>
      `;
    });
  }
}
