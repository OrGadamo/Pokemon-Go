let capturedPokemon = [
  {
    back_pic:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png",
    front_pic:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
    name: "blastoise",
  },
  {
    back_pic:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png",
    front_pic:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/9.svg",
    name: "blastoise",
  },
  {
    back_pic:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png",
    front_pic:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/9.svg",
    name: "blastoise",
  },
  {
    back_pic:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png",
    front_pic:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/9.svg",
    name: "blastoise",
  },
  {
    back_pic:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png",
    front_pic:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/9.svg",
    name: "blastoise",
  },
  {
    back_pic:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png",
    front_pic:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/9.svg",
    name: "blastoise",
  },
  {
    back_pic:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png",
    front_pic:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/9.svg",
    name: "blastoise",
  },
  {
    back_pic:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png",
    front_pic:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/9.svg",
    name: "blastoise",
  },
];
window.onload = () => {
  if (capturedPokemon.length > 0) {
    displayStage();
    captureDisplay(0);
    displayInventory();
  } else printErrorMessage();
};
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
  return `
    <h1>${capturedPokemon[index].name}</h1>
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
