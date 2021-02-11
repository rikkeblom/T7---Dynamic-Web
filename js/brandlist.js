const url = "https://kea-alt-del.dk/t7/api/brands";

fetch(url)
  .then((res) => res.json())
  .then((data) => handleProductList(data));

function handleProductList(data) {
  data.forEach(printBrand);
}

function printBrand(brand) {
  console.log(brand);
  // grab the template
  const template = document.querySelector("template").content;
  //clone the template
  const copy = template.cloneNode(true);
  //change the content
  copy.querySelector("a").textContent = brand.brandname;
  copy.querySelector("a").href = `productlist.html?brand=${brand.brandname}`;
  //grab the parent
  const parent = document.querySelector("#brandlist");
  //apend
  parent.appendChild(copy);
}
