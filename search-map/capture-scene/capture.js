let spawnPoke;
let tries;
let capture;
const capturedPokemon = [];
function mainCaptureScene(pokemon) {
  document.getElementById("map_scene").style.display = "none";
  document.getElementById("battle_con").style.display = "block";
  spawnPoke = pokemon;
  document.getElementById("spawn_poke").src = spawnPoke.front_pic;
  document.getElementById(
    "text_box"
  ).innerText = `You encoutered a wild ${pokemon.name}`;
  tries = 3;
  document.getElementById("tries").innerText = `X${tries}`;
}

//Animation of throw to Pokemon
function throwAnimation() {
  let pokemonBall = document.getElementById("catch_pokemon_ball");
  let ballXY = 0;
  let ballWidth = 10;
  pokemonBall.style.display = "block";
  let intervalId = setInterval(() => {
    pokemonBall.style.transform = `translate(-${ballXY}%,-${ballXY}%)`;
    ballXY = ballXY + 2;
    pokemonBall.style.width = `${ballWidth}%`;
    ballWidth = ballWidth - 0.005;
    if (ballXY == 310) {
      clearInterval(intervalId);
      setTimeout(() => {
        catchAnimation();
      }, 25);
    }
  }, 2);
}
//Animation of jump from pokemon
function catchAnimation() {
  catchEfect();
  let pokemonBall = document.getElementById("catch_pokemon_ball");
  pokemonBall.src = "../../images/open_pokeball.png";
  let ballX = 310;
  let ballY = 310;
  let intervalId = setInterval(() => {
    pokemonBall.style.transform = `translate(-${ballX--}%,-${ballY}%)`;
    ballY = ballY + 0.5;
    if (ballX == 250) {
      clearInterval(intervalId);
      pokemonBall.style.display = "none";
      switchToShowResult();
    }
  }, 10);
}

//visibility effect
function catchEfect() {
  let pokemon = document.getElementById("spawn_poke");
  let opacity = 1;
  let intervalId = setInterval(() => {
    pokemon.style.opacity = `${opacity}`;
    opacity = opacity - 0.02;
    if (opacity < 0) clearInterval(intervalId);
  }, 10);
}
//screen reset
function returnScreenToNormal() {
  let pokemonBall = document.getElementById("catch_pokemon_ball");
  pokemonBall.src = "../../images/pokemon_ball.png";
  pokemonBall.style.transform = `translate(0px,0px)`;
  pokemonBall.style.display = "none";
  let pokeball = document.getElementById("capture_pokeball");
  pokeball.src = "../../images/final_closeball.png";
  pokeball.style.transform = `scale(1)`;
  let pokemon = document.getElementById("pokemon_capturedCon");
  pokemon.style.display = "none";
  document.getElementById("continue_div").style.display = "none";
  document.getElementById("spawn_poke").style.opacity = "1";
}

//show result animation
function switchToShowResult() {
  document.getElementById("overlay").style.display = "block";
  captureAnimation();
}

//back to scene
function switchBackToScreen() {
  document.getElementById("overlay").style.display = "none";
  returnScreenToNormal();
}
//new screen wiggle pokeball
function wiggleAnimation() {
  let pokeball = document.getElementById("capture_pokeball");
  let rotate = 0;
  let side = true;
  let intervalId = setInterval(() => {
    pokeball.style.transform = `rotate(${rotate}deg)`;
    side ? rotate++ : rotate--;
    if (rotate == -7 || rotate == 7) side = !side;
  }, 3);
  return intervalId;
}

//wiggle timing
function controlWiggleAnimation() {
  let pokeball = document.getElementById("capture_pokeball");
  let wiggleId = null;
  let intervalId = setInterval(() => {
    if (wiggleId) {
      clearInterval(wiggleId);
      pokeball.style.transform = `rotate(0deg)`;
      wiggleId = null;
    } else {
      wiggleId = wiggleAnimation();
    }
  }, 2000);
  return intervalId;
}
//start and stop wiggle
function captureAnimation() {
  let captureAnimationId = controlWiggleAnimation();
  setTimeout(() => {
    clearInterval(captureAnimationId);
    showPokemonCaptureAnimation();
  }, 12100);
}
//Big oppening
function showPokemonCaptureAnimation() {
  let pokeball = document.getElementById("capture_pokeball");
  pokeball.src = "../../images/final_openball.png";
  let scale = 1;
  let intervalId = setInterval(() => {
    pokeball.style.transform = `scale(${scale})`;
    scale = scale + 0.005;
    if (scale > 2) {
      clearInterval(intervalId);
      showCapuredPokemon();
    }
  }, 8);
}
//show pokemon
function showCapuredPokemon() {
  let pokemon = document.getElementById("pokemon_capturedCon");
  let img = getCaptureOrFail();
  document.getElementById("pokemon_capturedImg").src = img;
  pokemon.style.display = "block";
  capture = img == spawnPoke.front_pic;
  document.getElementById("continue_div").style.display = "block";
}
//lucky function
function getCaptureOrFail() {
  let luckyNumber = Math.floor(Math.random() * 10);
  return luckyNumber > 6 ? spawnPoke.front_pic : "../../images/fail.png";
}
function continueScene() {
  switchBackToScreen();
  if (!capture) {
    tries--;
    document.getElementById("tries").innerText = `X${tries}`;
  } else {
    document.getElementById("capture_btn").style.display = "none";
    capturedPokemon.push(spawnPoke);
  }

  if (tries == 0) document.getElementById("capture_btn").style.display = "none";
}

function returnToMapScene() {
  document.getElementById("capture_btn").style.display = "block";
  document.getElementById("battle_con").style.display = "none";
  document.getElementById("map_scene").style.display = "block";
}
