//About Page JS
//load function to index
function loadAboutPage() {
  document.getElementById("changer_main").className = "";
  document.getElementById("changer_main").innerHTML = `
  <h1 class="display-1 text-center mt-5">About Us</h1>
  <hr class="divider-horizontal-blurry" />
  <div
    class="container-fluid my-5 d-flex justify-content-center position-relative"
  >
    <div class="size_div row">
      <div class="col-12 d-flex justify-content-center">
        <img
          class="img-fluid rounded shadow-5-strong"
          src="../images/about_img.jpeg"
          alt=""
        />
      </div>
    </div>
  </div>
  <h1 class="display-1 text-center mt-5">Our Company</h1>
  <hr class="divider-horizontal-blurry" />
  <div class="container-fluid my-5 d-flex justify-content-center">
    <div class="size_div row rounded shadow-4-strong">
      <div class="col-12 col-lg-6 px-0 bg-light">
        <div class="p-4 d-flex flex-column justify-content-around h-100">
          <h3 class="display-3">
            "Even though you’re growing up, you should never stop having
            fun.”<strong>– Nina Dobrev</strong>
          </h3>
          <h4>
            Pokemon-Go Founder is Or Gadamo, the compony founded for Tech
            Career Project and been successfull ever since.
          </h4>
          <h3>Our Moto is:</h3>
          <h2><strong>Never Stop Having Fun</strong></h2>
        </div>
      </div>
      <div class="col-12 col-lg-6 px-0">
        <img
          id="img_about"
          src="https://latestgamestories.com/wp-content/uploads/2022/05/How-many-Pokemon-are-there-in-2022-All-types-and.jpg"
          alt=""
        />
      </div>
    </div>
  </div>
  <h1 class="display-1 text-center mt-5">Our Principles</h1>
  <hr class="divider-horizontal-blurry" />
  <div class="container my-5">
    <div class="card-group">
      <div class="card">
        <img
          src="../images/pokePrinciple1.jpeg"
          class="card-img-top"
          alt="Hollywood Sign on The Hill"
        />
        <div class="card-body">
          <h1 class="text-center">Help the Other, and accept everyone</h1>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
      <div class="card">
        <img
          src="../images/pokePrinciple2.jpeg"
          class="card-img-top"
          alt="Palm Springs Road"
        />
        <div class="card-body">
          <h1 class="text-center">Enjoy life to the fullest</h1>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
      <div class="card">
        <img
          src="../images/pokePrinciple3.jpeg"
          class="card-img-top"
          alt="Los Angeles Skyscrapers"
        />
        <div class="card-body">
          <h1 class="text-center">Help your community</h1>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
    </div>
  </div>
  `;
}
