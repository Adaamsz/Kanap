fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => addProducts(data));

function addProducts(data2) {
  const baliseA = document.createElement("a");
  baliseA.href = "http://localhost:3000/images/kanap01.jpeg";
  baliseA.text = "Kanap Sinopé";

  const items = document.querySelector("#items");
  items.appendChild(baliseA);
}
