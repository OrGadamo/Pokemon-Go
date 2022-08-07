let gymPokemon;
let userPokemon;
let gymType;
// window.onload = () => {
//   getPokemonById(1).then((res) => {
//     userPokemon = Pokemon.switchAPIPokemonToClass(res);
//   });
//   getPokemonById(3).then((res) => {
//     gymPokemon = Pokemon.switchAPIPokemonToClass(res);
//     displayArena();
//     displayAttackOption();
//   });
// };
function loadBattlePage() {
  document.getElementById("change_main").innerHTML = `
  <div class="container-fluid my-5 text-center">
  <h1 id="headline_battle">Battle Center<i id="battle_icon" class="fab fa-battle-net"></i></h1>
  <h1 class="display-4 text-white">Here in the Battle Center you can battle Gym Leaders and earn Gym Badges</h1>
</div>
<div class="gif_con d-flex flex-wrap justify-content-center my-5 mx-auto">  
<img class="w-50" src="https://thumbs.gfycat.com/BoilingFrankIbizanhound-size_restricted.gif" alt="">
<img class="w-50" src="https://i.pinimg.com/originals/e3/6d/bb/e36dbb0d5300dfbde939537b61a2f7a3.gif" alt="">
<img class="w-50" src="https://media4.giphy.com/media/Y3XoVhrbRfOkhnzFf9/giphy.gif" alt="">
<img class="w-50" src="https://i.makeagif.com/media/10-14-2016/9YPJq4.gif" alt="">
</div>
<div id="arena_con" class="my-3">
  <h1 class="display-1 text-center text-white my-5">Choose Gym Leader</h1>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="col-12 col-md-6 col-lg-4 mb-3 d-flex align-items-strech">
        <div id="water_leader" class="card">
          <img class="gym_badge" src="../images/water_badge.png" alt="">
          <img src="../images/leader1.png" class="card-img-top" alt="Fissure in Sandstone"/>
          <button onclick="pickUserPokemon('water')" class="btn btn-warning battle_btn btn-lg mb-5">Challenge</button>
          </div>
      </div>
      <div class="col-12 col-md-6 col-lg-4  mb-3 d-flex align-items-strech">
        <div id="grass_leader" class="card">
          <img class="gym_badge" src="../images/grass_badge.png" alt="">
          <img src="../images/leader2.png" class="card-img-top" alt="Fissure in Sandstone"/>
          <button onclick="pickUserPokemon('water')" class="btn btn-warning battle_btn btn-lg mb-5">Challenge</button>
          </div>
      </div>
      <div onclick="pickUserPokemon('water')" class="col-12 col-md-6 col-lg-4 mb-3 d-flex align-items-strech">
        <div id="fire_leader" class="card">
          <img class="gym_badge" src="../images/fire_badge.png" alt="">
          <img src="../images/leader3.png" class="card-img-top" alt="Fissure in Sandstone"/>
          <button class="btn btn-warning battle_btn btn-lg mb-5">Challenge</button>
          </div>
      </div>
      </div>
    </div>
</div>
</div>
  `;
}
function changeHP(dmg, poke) {
  let total = document.getElementById(`hp_${poke}`).dataset.total;
  let value = document.getElementById(`hp_${poke}`).dataset.value;
  let newValue = value - dmg;
  if (newValue < 1) {
    document.getElementById(`hit_${poke}`).style.width = "100%";
  } else {
    document.getElementById(`hit_${poke}`).style.width =
      (dmg / value) * 100 + "%";
  }
  document.getElementById(`hp_${poke}`).dataset.value = newValue;
  setTimeout(() => {
    document.getElementById(`hit_${poke}`).style.width = "0%";
    if (newValue < 1)
      document.getElementById(`hpbar_${poke}`).style.width = "0%";
    else
      document.getElementById(`hpbar_${poke}`).style.width =
        (newValue / total) * 100 + "%";
  }, 500);
  if (newValue < 0) return false;
  return true;
}
function isSpecialAttack() {
  let rnd = Math.floor(Math.random() * 11);
  return rnd < 5;
}
function isHit(attSpeed, defSpeed) {
  let diff = attSpeed - defSpeed;
  if (diff > 0) return true;
  let rnd = Math.floor(Math.random() * 11);
  return rnd < 5;
}
function calcDamage(attStat, defStat) {
  let dmg = attStat - defStat / 2;
  return dmg < 5 ? 5 : dmg;
}
function displayAttackOption() {
  document.getElementById("battle_txt").innerHTML = `
    <h3>Its Your Turn To Attack</h3>
                    <h3>Choose a move:</h3>
                    <div class="container p-3">
                        <div class="row">
                        <h5 onclick="playerAttack('${userPokemon.name}','${userPokemon.moves[0]}')" class="col-6 py-2 text-center"><i class="arrow_right"></i>  ${userPokemon.moves[0]}</h5>
                        <h5 onclick="playerAttack('${userPokemon.name}','${userPokemon.moves[1]}')" class="col-6 py-2 text-center"><i class="arrow_right"></i>  ${userPokemon.moves[1]}</h5>
                        <h5 onclick="playerAttack('${userPokemon.name}','${userPokemon.moves[2]}')" class="col-6 py-2 text-center"><i class="arrow_right"></i>  ${userPokemon.moves[2]}</h5>
                        <h5 onclick="playerAttack('${userPokemon.name}','${userPokemon.moves[3]}')" class="col-6 py-2 text-center"><i class="arrow_right"></i>  ${userPokemon.moves[3]}</h5>
                        </div>
                    </div>
    `;
}
function playerAttack(pokeName, pokeMove) {
  let gameContinue = true;
  displayAttack(pokeName, pokeMove);
  let special = isSpecialAttack();
  let damage = special
    ? calcDamage(
        userPokemon.getSpecificStats("special-attack"),
        gymPokemon.getSpecificStats("defense")
      )
    : calcDamage(
        userPokemon.getSpecificStats("attack"),
        gymPokemon.getSpecificStats("defense")
      );
  let hit = isHit(
    userPokemon.getSpecificStats("speed"),
    gymPokemon.getSpecificStats("speed")
  );
  setTimeout(() => {
    if (!hit) {
      displayResult(false);
    } else {
      displayResult(true, false, special, damage);
      gameContinue = changeHP(damage, "gym");
    }
    setTimeout(() => {
      gameContinue ? gymAttack() : endGame("user");
    }, 3000);
  }, 3000);
}
function displayAttack(pokeName, pokeMove) {
  document.getElementById(
    "battle_txt"
  ).innerHTML = `<h1>${pokeName} used ${pokeMove}</h1>`;
}
function displayResult(success, toUser = null, special = null, damage = null) {
  if (!success) {
    document.getElementById("battle_txt").innerHTML = `<h1>Attack Failed</h1>`;
  } else {
    document.getElementById("battle_txt").innerHTML = `
        <h1>Attack success</h1>
        <h3> ${special ? "Special" : "Normal"} Attack</h3>
        <h3>${toUser ? userPokemon.name : gymPokemon.name} -${damage}HP</h3>
        `;
  }
}
function gymAttack() {
  let gameContinue = true;
  let move = getRandomGymMove();
  displayAttack(gymPokemon.name, move);
  let special = isSpecialAttack();
  let damage = special
    ? calcDamage(
        gymPokemon.getSpecificStats("special-attack"),
        userPokemon.getSpecificStats("defense")
      )
    : calcDamage(
        userPokemon.getSpecificStats("attack"),
        gymPokemon.getSpecificStats("defense")
      );
  let hit = isHit(
    gymPokemon.getSpecificStats("speed"),
    userPokemon.getSpecificStats("speed")
  );
  setTimeout(() => {
    if (!hit) {
      displayResult(false);
    } else {
      displayResult(true, true, special, damage);
      gameContinue = changeHP(damage, "user");
    }
    setTimeout(() => {
      gameContinue ? displayAttackOption() : endGame("gym");
    }, 3000);
  }, 3000);
}
function getRandomGymMove() {
  let rnd = Math.floor(Math.random() * 5);
  return gymPokemon.moves[rnd];
}
function startBattle(userPoke) {
  userPokemon = capturedPokemon[userPoke];
  getPokemonById(getPokemonByGym(gymType)).then((res) => {
    gymPokemon = Pokemon.switchAPIPokemonToClass(res);
    displayArena();
    battleOpenerMessage();
    setTimeout(() => {
      displayAttackOption();
    }, 4000);
  });
}
function getPokemonByGym(gym) {
  switch (gym) {
    case "water":
      return "lapras";
    case "fire":
      return "entei";
    case "grass":
      return "celebi";
  }
}
function displayArena() {
  document.getElementById("arena_con").innerHTML = `
    <div id="arena" class="container d-flex flex-column justify-content-between">
                <div class="row d-flex justify-content-end">
                    <div class="col-1 px-0"><h1 class="text-end text-white"><strong>HP</strong></h1></div>
                    <div class="col-11 px-0">
                        <div class="health-bar" id="hp_gym" data-total="${gymPokemon.getSpecificStats(
                          "hp"
                        )}" data-value="${gymPokemon.getSpecificStats("hp")}">
                            <div id="hpbar_gym" class="bar">
                                  <div id="hit_gym" class="hit"></div>
                            </div>
                          </div>
                    </div>
                    <div class="col-8"></div>
                    <div class="col-3">
                        <img class="pokeImg_battle" src="${
                          gymPokemon.front_pic
                        }" alt="">        
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <img class="pokeImg_battle" src="${
                          userPokemon.front_pic
                        }" alt="">        
                    </div>
                    <div class="col-9"></div>
                    <div class="col-1 px-0"><h1 class="text-end text-white"><strong>HP</strong></h1></div>
                    <div class="col-11 px-0">
                        <div class="health-bar" id="hp_user" data-total="${userPokemon.getSpecificStats(
                          "hp"
                        )}" data-value="${userPokemon.getSpecificStats("hp")}">
                            <div id="hpbar_user" class="bar">
                                  <div id="hit_user" class="hit"></div>
                            </div>
                          </div>
                    </div>
                </div>
                <div id="battle_box" class="p-3">
                    <div id="battle_txt">
                    </div>
                </div>
            </div>
    `;
}
function battleOpenerMessage() {
  document.getElementById("battle_txt").innerHTML = `
    ${gymPokemon.name} VS ${userPokemon.name}
    `;
}
function pickUserPokemon(gym) {
  gymType = gym;
  displayCapturedPokemons();
}
function displayCapturedPokemons() {
  document.getElementById("arena_con").innerHTML = `
  <div class="container-fluid">
  <h1 class="display-1 text-white text-center">Choose Pokemon For Battle</h1>
  <div id="choose_poke" class="row">
  </div>
  </div>
  `;
  if (capturedPokemon.length > 0) {
    capturedPokemon.forEach((poke, index) => {
      document.getElementById("choose_poke").innerHTML += `
    <div class="col-4 col-md-2">
    <div class="card">
      <img onclick="startBattle(${index})" src="${poke.front_pic}" class="card-img-top" alt="Fissure in Sandstone"/>
    </div>
  </div>
    `;
    });
  } else {
    document.getElementById(
      "choose_poke"
    ).innerHTML = `<h1 class="display-3 text-white text-center">You Have No Pokemon</h1>`;
  }
}
function endGame(winner) {
  console.log(winner + " won");
}
