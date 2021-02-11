const urlParams = new URLSearchParams(window.location.search);
const brand = urlParams.get("brand");
console.log(brand);
const url = "http://kea-alt-del.dk/t7/api/products?brandname=" + brand;

fetch(url)
  .then((res) => res.json())
  .then((data) => handleProductList(data));

function handleProductList(data) {
  data.forEach(showProduct);
  document.querySelector("h1").textContent = brand;
}

function showProduct(product) {
  console.log(product);
  // grab the template
  const template = document.querySelector("#smallProductTemplate").content;
  //clone the template
  const copy = template.cloneNode(true);
  //change the content
  copy.querySelector("h1").textContent = product.productdisplayname;
  copy.querySelector(
    "p:first-of-type"
  ).textContent = `${product.articletype} | ${product.brandname}`;
  copy.querySelector("p:nth-of-type(2)").textContent = `DKK ${Math.round(
    (product.price / 100) * (100 - product.discount)
  )},-`;
  copy.querySelector(
    "img"
  ).src = `https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp`;

  copy.querySelector("div.savings").textContent = `YOU SAVE DKK ${
    product.price - Math.round((product.price / 100) * (100 - product.discount))
  },-`;

  if (product.discount) {
    copy.querySelector("div.savings").classList.remove("hidden");
  }

  if (product.soldout) {
    copy.querySelector("article").classList.add("soldout");
    copy.querySelector("a").textContent = "SOLD OUT";
  }

  copy.querySelector("a").href = `product.html?id=${product.id}`;

  //grab the parent
  const parent = document.querySelector(".deals");
  //apend
  parent.appendChild(copy);
}

{
  /* <main>
<div class="deals">
  <template>
    <article class="sale-item">
      <h1>Sahara Team India Fanwear Rund Neck Jersey</h1>
      <p class="subtle">Tshirts | Nike</p>
      <p class="price">DKK 1595,-</p>
      <img src="Capture.PNG" />
      <button>BUY NOW</button>
    </article>
  </template> */
}
