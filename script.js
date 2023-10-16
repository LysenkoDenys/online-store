// https://fakestoreapi.com/

//* 1. fetch list of items to sale
// 2. logic to cart:
// 2.1. add item, price, quality
// 2.2. add listener to the button on every item with function add to cart (every time it pushed item++)
// 2.3. add items properties to the cart
// 2.4. add items quantity counter to cart (with change quantity ability)
//* 2.5. add remove button to every item of cart
//* 2.6. add total to cart
// 2.7. if cart is empty by removing all of items --> 'cart is empty'

const url = "https://fakestoreapi.com/products?limit=9";

async function getData(url) {
  const result = await fetch(url);
  const json = await result.json();
  return json;
}

const cartsUl = document.querySelector(".cart-list");
const cartSection = document.querySelector(".cart-list-titles");
const cartTotal = document.querySelector(".total-amount");
const TotalSpanNode = document.querySelector("span");
cartSection.style.display = "none";
cartTotal.style.display = "none";
let arrCart = [];
let counter = 1;

function updateCartDisplay() {
  if (arrCart.length > 0) {
    cartSection.style.display = "flex";
    cartTotal.style.display = "block";
    if (cartsUl.hasChildNodes()) {
      cartsUl.innerHTML = "";
    }
    arrCart.map((element) => {
      cartsUl.insertAdjacentHTML(
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
        )}</p><div class='li-cart-qty-btn'><input type='number' id='qty' value="${counter}"><button class='button-cart'  onclick="removeFromChartHandler(${
          element.id
        })">Remove</button></div></div></li>`
      );
    });
  }
}

function addToChartHandler(element) {
  //!working================================================================
  if (arrCart.find((elementArr) => elementArr.id === element.id)) {
    counter = ++counter;
    return;
  }
  //!working================================================================
  arrCart.push({
    id: element.id,
    image: element.image,
    title: element.title,
    price: element.price,
    counter: element.counter,
  });
  updateCartDisplay();
}

function removeFromChartHandler(id) {
  const arrFiltered = arrCart.filter((element) => element.id !== id);
  arrCart = arrFiltered;
  console.log(arrCart); //
  updateCartDisplay();

  if (arrCart.length == 0) {
    cartsUl.innerHTML = "";
    cartSection.style.display = "none";
    cartTotal.style.display = "none";
  }
}

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
        } onclick="addToChartHandler(${JSON.stringify(element)
          .split('"')
          .join("&quot;")})">Add to cart</button></div></div></li>`
      );
    });
    //Total======================================================
    function getTotalCosts(arrCart) {
      const arrNew = arrCart.map((item) => {
        return item.price * item.counter;
      });
      console.log(arrNew); //
    }
    console.log(arrCart); //
    getTotalCosts(arrCart);
    TotalSpanNode.innerText = "more";
    //Total======================================================
  } catch (error) {
    console.log(error.message); //
  }
}

setData();
