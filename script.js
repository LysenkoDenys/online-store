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

const arrCart = [1];

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
        ).format(
          element.price
        )}</span><button class='button-box'>Add to cart</button></div></div></li>`
      );
    });
    //cart======================================================
    const cartSection = document.querySelector(".cart-list-titles");
    const cartTotal = document.querySelector(".total-amount");
    cartSection.style.display = "none";
    cartTotal.style.display = "none";

    const cartsUl = document.querySelector(".cart-list");
    if (arrCart.length > 0) {
      cartSection.style.display = "flex";
      cartTotal.style.display = "block";
      data
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
      const cartsButton = document.querySelector(".button-cart");
      console.log(cartsButton); //
      cartsButton.addEventListener("click", function () {
        cartsUl.innerHTML = "";
        cartSection.style.display = "none";
        cartTotal.style.display = "none";
      });
    }
    //cart======================================================

    //!buttons======================================================
    console.log(arrCart);
    const boxButton = document.querySelector(".button-box");
    console.log(boxButton); //
    boxButton.addEventListener("click", function () {
      console.log(arrCart);
      return arrCart.push(1);
    });

    console.log(data);

    //buttons======================================================
  } catch (error) {
    console.log(error.message); //
  }
}

setData();
