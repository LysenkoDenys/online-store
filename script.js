// https://fakestoreapi.com/

//* 1. fetch list of items to sale
// 2. logic to cart:
// 2.1. add item, price, quality
// 2.2. add listener to the button on every item with function add to cart (every time it pushed item++)
// 2.3. add items properties to the cart
// 2.4. add items quantity counter to cart (with change quantity ability)
// 2.5. add remove button to every item of cart
// 2.6. add total to cart
// 2.7. if cart is empty by removing all of items --> 'cart is empty'

const url = "https://fakestoreapi.com/products?limit=9";

async function getData(url) {
  const result = await fetch(url);
  const json = await result.json();
  return json;
}

async function setData() {
  try {
    const data = await getData(url);
    const productsUl = document.querySelector(".products-container");
    const itemBoxes = data.map((element) => {
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
        ).format(
          element.price
        )}</span><button class='button-box'>Add to cart</button></div></div></li>`
      );
    });
    //cart======================================================
    const cartsUl = document.querySelector(".cart-list");
    const cartsButton = document.querySelector(".button-cart");
    const addItemHandler = data
      .filter((element) => element.id === 9)
      .map((element) => {
        cartsUl.insertAdjacentHTML(
          "beforeend",
          `<li class='item-cart'><div class='li-cart-wrapper'><div class='li-cart-img-title'><img src=${
            element.image
          } alt='item' class=img-cart><h2 class='title-cart'>${
            element.title
          }</h2></div><p class='price-cart'>${new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(
            element.price
          )}</p><div class='li-cart-qty-btn'><input type='number' id='qty'><button class='button-cart'>Remove</button></div></div></li>`
        );
        console.log(element.id); //
      });
    //cart======================================================
    cartsButton.addEventListener("click", function () {
      return (addItemHandler = []);
    });

    console.log(addItemHandler);
    console.log(data);
  } catch (error) {
    console.log(error.message); //
  }
}

setData();
