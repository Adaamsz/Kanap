fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    return addProducts(data);
  });

function addProducts(donnees) {
  const id = donnees[0]._id;
  const baliseA = creeBaliseA(id);
  appendChild(baliseA);
}

function creeBaliseA(id) {
  const baliseA = document.createElement("a");
  baliseA.href = "./product.html?id=" + id;
  return baliseA;
}

function appendChild(baliseA) {
  const items = document.querySelector("#items");
  items.appendChild(baliseA);
}
