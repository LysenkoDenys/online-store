const CART_ITEMS_LABEL = "cart-items";
const CART_ITEMS_TOTAL = "total";

const selectNode = document.getElementById("items").value;
let url = `https://fakestoreapi.com/products?limit=${selectNode}`;

async function getData(url) {
  showSpinner();
  const result = await fetch(url);
  const json = await result.json();
  hideSpinner();
  return json;
}

const loadingSpinner = document.getElementById("loading-spinner");
const cartsUlNode = document.querySelector(".cart-list");
const cartEmptyTitleNode = document.querySelector(".cart-empty-title");
const cartSection = document.querySelector(".cart-list-titles");
const cartTotal = document.querySelector(".total-amount");
const totalSpanNode = document.querySelector("span");

const cartClearAllButtonNode = document.createElement("button");
cartClearAllButtonNode.innerText = "Clear cart";
cartClearAllButtonNode.setAttribute("class", "button-clear");
cartClearAllButtonNode.addEventListener("click", removeAllFromCartHandler);

cartSection.style.display = "none";
cartTotal.style.display = "none";
let arrCart = [];
let counter = 1;

async function setData() {
  try {
    const data = await getData(url);
    const productsUl = document.querySelector(".products-container");
    productsUl.innerHTML = "";
    data.map((element) => {
      productsUl.insertAdjacentHTML(
        "beforeend",
        `<li class='item-box'><div class='li-wrapper'><img src=${
          element.image
        } alt='item' class='img-box'><h2 class='title'>${
          element.title
        }</h2><p class='description'>${
          element.description
        }</p><div class='price-box'><span class='price'>${new Intl.NumberFormat(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        ).format(element.price)}</span><button class='button-box' id=${
          element.id
        } onclick="addToCartHandler(${JSON.stringify(element)
          .split('"')
          .join("&quot;")})">Add to cart</button></div></div></li>`
      );
    });
  } catch (error) {
    console.log(error.message); //
  }
  //localStorage:
  renderInitialCart();
}
setData();

function updateCartDisplay() {
  if (arrCart.length > 0) {
    cartEmptyTitleNode.style.display = "none";
    cartSection.style.display = "flex";
    cartTotal.style.display = "block";
    cartClearAllButtonNode.style.display = "block";

    if (cartsUlNode.hasChildNodes()) {
      cartsUlNode.innerHTML = "";
    }
    arrCart.map((element) => {
      cartsUlNode.insertAdjacentHTML(
        "beforeend",
        `<li class='item-cart' id=${
          element.id
        }><div class='li-cart-wrapper'><div class='li-cart-img-title'><img src=${
          element.image
        } alt='item' class=img-cart><h2 class='title-cart'>${
          element.title
        }</h2></div><p class='price-cart'>${new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(
          element.price
        )}</p><div class='li-cart-qty-btn'><input type='number' class= 'li-cart-qty-input' id='qty${
          element.id
        }' onchange="changeInputHandler(${element.id})" value="${
          element.counter
        }" min="1"><button class='button-cart'  onclick="removeFromCartHandler(${
          element.id
        })">Remove</button></div></div></li>`
      );
    });
  }
}

function addToCartHandler(element) {
  arrCart.length === 0 &&
    cartsUlNode.insertAdjacentElement("afterend", cartClearAllButtonNode);

  //if we pick the same item multiple times:
  if (arrCart.find((elementArr) => elementArr.id === element.id)) {
    arrCart.find((elementArr) => elementArr.id === element.id).counter++;

    updateCartDisplay();
    getTotalCosts(arrCart);
    return;
  }

  arrCart.push({
    id: element.id,
    image: element.image,
    title: element.title,
    price: element.price,
    counter: counter,
  });
  updateCartDisplay();
  getTotalCosts(arrCart);
}

function removeFromCartHandler(id) {
  const arrFiltered = arrCart.filter((element) => element.id !== id);
  arrCart = arrFiltered;
  updateCartDisplay();
  getTotalCosts(arrCart);
  if (arrCart.length == 0) {
    cartsUlNode.innerHTML = "";
    cartEmptyTitleNode.style.display = "block";
    cartSection.style.display = "none";
    cartTotal.style.display = "none";
    cartClearAllButtonNode.style.display = "none";
  }
}

function changeInputHandler(id) {
  const idForNode = `qty${id}`;
  const cartInputNode = document.getElementById(idForNode);
  arrCart.find((elementArr) => elementArr.id === id).counter =
    cartInputNode.value;
  updateCartDisplay();
  getTotalCosts(arrCart);
}

function getTotalCosts(arrCart) {
  const numTotalSum = arrCart.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.counter * currentValue.price;
  }, 0);

  totalSpanNode.innerText = `${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numTotalSum)}`;

  //localStorage:
  localStorage.setItem(CART_ITEMS_LABEL, JSON.stringify(arrCart));
}

//spinner==========================================
function showSpinner() {
  loadingSpinner.style.display = "block";
}

function hideSpinner() {
  loadingSpinner.style.display = "none";
}

function changeSelectHandler() {
  const selectNode = document.getElementById("items").value;
  url = `https://fakestoreapi.com/products?limit=${selectNode}`;
  getData(url);
  setData();
}

// localStorage===========================================================:
const renderInitialCart = () => {
  const currentCartProducts = getCurrentCartItems();
  if (!currentCartProducts.length) {
    return;
  }
  //core:
  arrCart = currentCartProducts;
  cartsUlNode.insertAdjacentElement("afterend", cartClearAllButtonNode);
  getTotalCosts(arrCart);
  updateCartDisplay();
};

//get cart items from localStorage:
const getCurrentCartItems = () =>
  JSON.parse(localStorage.getItem(CART_ITEMS_LABEL)) || [];
// localStorage===========================================================:

function removeAllFromCartHandler() {
  arrCart = [];
  getTotalCosts(arrCart);

  cartsUlNode.innerHTML = "";
  cartEmptyTitleNode.style.display = "block";
  cartSection.style.display = "none";
  cartTotal.style.display = "none";
  cartClearAllButtonNode.style.display = "none";

  localStorage.clear();
}
