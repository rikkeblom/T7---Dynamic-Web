const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);
const url = "http://kea-alt-del.dk/t7/api/products/" + id;

//fetch the data
fetch(url)
  .then((res) => res.json())
  .then((data) => showProduct(data));
//populate the page

function showProduct(product) {
  console.log(product);
  document.querySelector(".brand").textContent = product.brandname;
  document.querySelector(".productname").textContent =
    product.productdisplayname;
  document.querySelector(
    "#product img"
  ).src = `https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp`;

  document.querySelector(".price").textContent = `DKK ${Math.round(
    (product.price / 100) * (100 - product.discount)
  )},-`;

  document.querySelector("div.savings").textContent = `YOU SAVE DKK ${
    product.price - Math.round((product.price / 100) * (100 - product.discount))
  },-`;

  if (product.discount) {
    document.querySelector("div.savings").classList.remove("hidden");
  }

  document.querySelector(".color").textContent = product.basecolour;
  document.querySelector(".description").innerHTML = product.description;
  document.querySelector(".type").textContent = product.category;
  document.querySelector(
    ".inventorynumber"
  ).textContent = `Inventory #${product.id}`;
}
