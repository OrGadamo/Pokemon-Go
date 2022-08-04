let berryArr = [];
async function getBerriesAPI() {
  try {
    return await fetch(`https://pokeapi.co/api/v2/berry?offset=20&limit=50`)
      .then((res) => res.json())
      .then((res) => res.results);
  } catch (error) {
    console.log(error);
  }
}
async function getBerry(API) {
  try {
    return await fetch(API).then((res) => res.json());
  } catch (e) {
    console.log(e);
  }
}
class Berry {
  constructor(id, name, power, type, size) {
    this.id = id;
    this.power = power;
    this.name = name;
    this.type = type;
    this.size = size;
    this.cost = power / 2;
  }
  static getBerriesArr(data) {
    let arr = [];
    for (let berry of data) {
      arr.push(
        new Berry(
          berry.id,
          berry.name,
          berry.natural_gift_power,
          berry.natural_gift_type.name,
          berry.size
        )
      );
    }
    return arr;
  }
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
getBerriesArr();
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
