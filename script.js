// https://fakestoreapi.com/

//* 1. fetch list of items to sale
//* 2. logic to cart:
//* 2.1. add item, price, quality
//* 2.2. add listener to the button on every item with function add to cart
//* 2.3. add items properties to the cart
//* 2.4. add items quantity counter to cart (with change quantity ability)
//* 2.5. add remove button to every item of cart
//* 2.6. add total to cart

const url = "https://fakestoreapi.com/products?limit=9";

async function getData(url) {
  const result = await fetch(url);
  const json = await result.json();
  return json;
}

const cartsUlNode = document.querySelector(".cart-list");
const cartEmptyTitleNode = document.querySelector(".cart-empty-title");
const cartSection = document.querySelector(".cart-list-titles");
const cartTotal = document.querySelector(".total-amount");
const totalSpanNode = document.querySelector("span");
cartSection.style.display = "none";
cartTotal.style.display = "none";
let arrCart = [];
let counter = 1;

async function setData() {
  try {
    const data = await getData(url);
    const productsUl = document.querySelector(".products-container");
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
}
setData();

function updateCartDisplay() {
  if (arrCart.length > 0) {
    cartEmptyTitleNode.style.display = "none";
    cartSection.style.display = "flex";
    cartTotal.style.display = "block";

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
}
