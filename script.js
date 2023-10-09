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
    data.map((element) => {
      productsUl.insertAdjacentHTML(
        "beforeend",
        `<li><div class='li-wrapper'><img src=${
          element.image
        } alt='item'><h2 class='title'>${
          element.title
        }</h2><p class='description'>${
          element.description
        }</p><div class='price-cart'><span class='price'>${new Intl.NumberFormat(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        ).format(
          element.price
        )}</span><button>Add to cart</button></div></div></li>`
      );
    });
  } catch (error) {
    console.log(error.message); //
  }
}

setData();
