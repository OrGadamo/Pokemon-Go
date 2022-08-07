let berryArr = [];
function loadShopPage() {
  document.getElementById("change_main").innerHTML = `
  <div class="container-fluid my-5 d-flex justify-content-center">
  <h1 id="headline_shop">Shop Center<i style="color:#f07900" class="fas fa-shopping-cart"></i></h1>
</div>
<div class="container-fluid my-5 d-flex justify-content-center">
  <h1 class="display-3 text-white">
    Here in the shop center you can buy berries to power up your pokemon
  </h1>
</div>
<div class="container my-5 d-flex justify-content-center">
  <div class="row w-100 w-md-75 w-xl-50">
    <nav class="navbar navbar-expand-lg p-3 navbar-dark" id="shop_nav">
      <div class="container-fluid ">
        <form id="search_form" class="d-flex me-auto input-group align-items-center w-auto">
          <input
          oninput="berrySearch()"
            id="search_input"
            type="search"
            class="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <span class="input-group-text border-0" id="search-addon">
            <i class="fas fa-search"></i>
          </span>
        </form>
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle hidden-arrow"
              href="#"
              id="shopping_list"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fas fa-shopping-cart cart_icon " id="cart_icon"></i>
              <span id="cart_badge" class="badge rounded-pill badge-notification bg-danger">0</span>
            </a>
            <ul
            id="user_shoppinglist"
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="shopping_list"
            >
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</div>
<div class="container-fluid my-5">
  <div class="row" id="berries_con"></div>
</div>
  `;
  getBerriesArr();
}
function getBerriesArr() {
  let arr = [];
  getBerriesAPI().then((res) => {
    res.map((berry) => {
      getBerry(berry.url).then((result) => {
        arr.push(result);
        if (arr.length == res.length) getClassArr(arr);
      });
    });
  });
}
function getClassArr(data) {
  berryArr = Berry.getBerriesArr(data);
  displayCards(berryArr);
}
function getBerryCard(berry) {
  return `
  <div class="col-12 col-lg-6 col-xl-4 mb-3">
            <div class="card text-white bg-dark">
              <div class="row g-0">
                <div class="col-xxl-4">
                  <img
                    src="../images/berries.jpeg"
                    alt="berry"
                    class="img-fluid rounded-start"
                  />
                </div>
                <div class="col-xxl-8">
                  <div class="card-body">
                    <h1 class="px-1">${berry.name} berry</h1>
                    <div class="row">
                      <h6 class="col-6">Type: ${berry.type}</h6>
                      <h6 class="col-6">Power: +${berry.power}</h6>
                      <h6 class="col-6">size: ${berry.size}cm</h6>
                      <h6 class="col-6">cost: ${berry.cost}$</h6>
                      <button onclick="buyBerry('${berry.name}')" class="btn btn-danger w-50">Purchase</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `;
}
function displayCards(arr) {
  arr.forEach((berry) => {
    document.getElementById("berries_con").innerHTML += getBerryCard(berry);
  });
}
function berrySearch() {
  let searchStr = document.getElementById("search_input").value;
  let newArr = berryArr.filter((berry) =>
    berry.name.includes(searchStr.toLowerCase())
  );
  document.getElementById("berries_con").innerHTML = "";
  displayCards(newArr);
}
function buyBerry(berryName) {
  if (confirm("Are you sure you want to buy this item?")) addToCart(berryName);
}
function addToCart(name) {
  let num = +document.getElementById("cart_badge").innerText;
  num++;
  document.getElementById("cart_badge").innerText = num;
  berryArr.map((berry, index) => {
    if (berry.name == name) {
      document.getElementById("user_shoppinglist").innerHTML +=
        getShopListItem(index);
      return;
    }
  });
}
function getShopListItem(index) {
  return `
  <li> 
   <div class="dropdown-item">
    <span>X1 <strong>${berryArr[index].name}</strong>  </span>
    <span> ${berryArr[index].cost}$ </span>
   </div>
  </li>
  `;
}
