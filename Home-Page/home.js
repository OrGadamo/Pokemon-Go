//Home Page JS
//load Function to index
function loadHomePage() {
  document.getElementById("changer_main").className = "";
  document.getElementById("changer_main").innerHTML = `
  <div class="container-fluid mb-4">
  <video src="videos/pokemon-govid.webm" autoplay muted></video>
</div>
<div
  class="container-fluid d-flex justify-content-center align-items-center"
>
  <div class="home_show row" id="water_poke">
    <div class="col-12 col-lg-6">
      <div
        class="p-4 d-flex flex-column justify-content-center align-items-center h-100"
      >
        <h1 class="display-1 text-white text-center">
          Start Playing Now And Get The New Packages
        </h1>
        <button
          onclick="openSignUp()"
          type="button"
          class="my-1 btn btn-warning btn-lg start_btn"
        >
          Start Now
        </button>
      </div>
    </div>
    <div class="col-12 col-lg-6 d-flex align-items-end">
      <img class="img-fluid" src="images/water-poke.png" alt="" />
    </div>
  </div>
</div>
<div
  class="container-fluid d-flex justify-content-center align-items-center"
>
  <div class="home_show row" id="fire_poke">
    <div class="col-12 col-lg-6  d-flex align-items-end">
      <img class="img-fluid" src="images/fire-poke.png" alt="" />
    </div>
    <div class="col-12 col-lg-6">
      <div
        class="p-4 d-flex flex-column justify-content-center align-items-center h-100"
      >
        <h1 class="display-1 text-white text-center">
          Sign Up And Play With Your Friends
        </h1>
        <button
          onclick="openSignUp()"
          type="button"
          class="my-1 btn btn-warning btn-lg start_btn"
        >
          Start Now
        </button>
      </div>
    </div>
  </div>
</div>
<div
  class="container-fluid d-flex justify-content-center align-items-center"
>
  <div class="home_show row" id="grass_poke">
    <div class="col-12 col-lg-6">
      <div
        class="p-4 d-flex flex-column justify-content-center align-items-center h-100"
      >
        <h1 class="display-1 text-white text-center">
          Join Our Community And Check Out Our New Pokemons
        </h1>
        <button
          onclick="openSignUp()"
          type="button"
          class="my-1 btn btn-warning btn-lg start_btn"
        >
          Start Now
        </button>
      </div>
    </div>
    <div class="col-12 col-lg-6  d-flex align-items-end">
      <img class="img-fluid" src="images/grass-poke.png" alt="" />
    </div>
  </div>
</div>
<div
  class="container-fluid d-flex justify-content-center align-items-center mb-4"
>
  <div class="home_show row" id="normal_poke">
    <div class="col-12 col-lg-6  d-flex align-items-end">
      <img src="images/normal-poke.png" alt="" class="img-fluid" />
    </div>
    <div class="col-12 col-lg-6">
      <div
        class="p-4 d-flex flex-column justify-content-center align-items-center h-100"
      >
        <h1 class="display-1 text-white text-center">
          Explore New World And Build Out Achievements
        </h1>
        <button
          onclick="openSignUp()"
          type="button"
          class="my-1 btn btn-warning btn-lg start_btn"
        >
          Start Now
        </button>
      </div>
    </div>
  </div>
</div>
<div class="container-fluid my-5 d-flex justify-content-center">
  <div id="news_div" class="row">
    <h1 class="display-1 col-12 text-center">Our Latest News</h1>
    <hr class="divider-horizontal-blurry col-12" />
    <div class="col-12 col-lg-8 mb-3 news_card">
      <div
        class="bg-image card shadow-1-strong h-100"
        style="background-image: url('images/news1.jpg')"
      >
        <div
          class="card-body d-flex flex-column justify-content-end article_news"
        >
          <h2>Community Day- Pokemon-Go</h2>
          <h1>02 August 2022</h1>
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-4 mb-3 news_card">
      <div
        class="bg-image card shadow-1-strong h-100"
        style="background-image: url('images/news4.jpg')"
      >
        <div
          class="card-body d-flex flex-column justify-content-end article_news"
        >
          <h2>New Packages Pokemon-Go</h2>
          <h1>07 August 2022</h1>
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-4 mb-3 news_card">
      <div
        class="bg-image card shadow-1-strong h-100"
        style="background-image: url('images/news3.png')"
      >
        <div
          class="card-body d-flex flex-column justify-content-end article_news"
        >
          <h2>Summer-update Pokemon-Go</h2>
          <h1>05 August 2022</h1>
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-8 mb-3 news_card">
      <div
        class="bg-image card shadow-1-strong h-100"
        style="background-image: url('images/news2.jpg')"
      >
        <div
          class="card-body d-flex flex-column justify-content-end article_news"
        >
          <h2>Poke-Conference Pokemon-Go</h2>
          <h1>10 August 2022</h1>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="container-fluid d-flex justify-content-center">
  <div id="icon_stats">
    <section class="text-center">
      <div class="row">
        <div
          class="col-lg-3 col-md-6 mb-5 mb-md-5 mb-lg-0 position-relative"
        >
          <i class="fas fa-cubes fa-8x text-dark mb-4"></i>
          <h2 class="text-dark fw-bold mb-3">500+</h2>
          <h4 class="fw-normal mb-0">Available Pokemons</h4>
          <hr
            class="divider-vertical-blurry position-absolute my-0 h-100 d-none d-md-block"
          />
        </div>

        <div
          class="col-lg-3 col-md-6 mb-5 mb-md-5 mb-lg-0 position-relative"
        >
          <i class="fas fa-globe-americas fa-8x text-dark mb-4"></i>
          <h2 class="text-dark fw-bold mb-3">30+</h2>
          <h4 class="fw-normal mb-0">Countries Worldwide</h4>
          <hr
            class="divider-vertical-blurry position-absolute my-0 h-100 d-none d-lg-block"
          />
        </div>

        <div class="col-lg-3 col-md-6 mb-5 mb-md-0 position-relative">
          <i class="fas fa-language fa-8x text-dark mb-4"></i>
          <h2 class="text-dark fw-bold mb-3">+30</h2>
          <h4 class="fw-normal mb-0">Available Languages</h4>
          <hr
            class="divider-vertical-blurry position-absolute my-0 h-100 d-none d-md-block"
          />
        </div>

        <div class="col-lg-3 col-md-6 mb-5 mb-md-0 position-relative">
          <i class="fas fa-users fa-8x text-dark mb-4"></i>
          <h2 class="text-dark fw-bold mb-3">+10,000</h2>
          <h4 class="fw-normal mb-0">Active Users</h4>
        </div>
      </div>
    </section>
  </div>
</div>
<div class="container-fluid my-5 d-flex justify-content-center">
  <div id="sign_div" class="row d-flex justify-content-center">
    <div class="col-12 col-xxl-6 px-0 d-flex justify-content-end align-items-center">
      <img src="images/signupPoke.jpg" alt="" class="img-fluid" />
    </div>
    <div class="col-12 col-xxl-6 px-0 bg-white d-flex align-items-center justify-content-center">
      <div class="p-3 text-center d-flex flex-column align-items-center bg-white">
        <h1 class="display-4">Your Mission?</h1>
        <h2 class="display-6">GO And Catch Them All</h2>
        <h1 class="display-4">What Are You Waiting For?</h1>
        <h2 class="display-6">Start Now</h2>
        <button
          type="button"
          onclick="openSignUp()"
          class="btn btn-primary start_btn btn-lg"
        >
          Sign-Up
        </button>
      </div>
    </div>
  </div>
</div>
  
  `;
}
//global user
let user;
function openSignUp() {
  document.getElementById("overlay").style.display = "block";
}
function closeSignUp() {
  document.getElementById("overlay").style.display = "none";
}
function createUser(fName, lName, email, password) {
  user = new User(fName, lName, email, password);
}
function submitForm(e) {
  e.preventDefault();
  createUser(
    document.getElementById("f_name").value,
    document.getElementById("l_name").value,
    document.getElementById("sign_email").value,
    document.getElementById("password").value
  );
  closeSignUp();
  changeToStartButton();
}
function changeToStartButton() {
  document.getElementById(
    "login_btncol"
  ).innerHTML = `<h1 class="mx-md-5">Hello, ${user.firstName} ${user.lastName}</h1><button type="button" class="nav_btn btn btn-lg btn-warning me-3 start_btn">Start Game</button>`;
  let btnArray = document.getElementsByClassName("start_btn");
  for (let btn of btnArray) {
    btn.innerText = "Start Game";
    btn.onclick = () => {
      StartGamePhase();
    };
  }
}
function StartGamePhase() {
  location.href = "search-map/PokeMap.html";
}
