fetch("http://localhost:3000/api/products/")
  .then((response) => {
    return response.json();
  })
  .then((kanap) => {
    return products(kanap);
  });

function products(product) {
  product.forEach((product) => {
    const id = product._id;
    const baliseA = document.createElement("a");
    const article = document.createElement("article");
    const image = document.createElement("img");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");

    baliseA.href = "./product.html?id=" + id;
    image.src = product.imageUrl;
    image.alt = product.altTxt + " , " + product.name;
    h3.classList.add("productName");
    h3.textContent = product.name;
    p.classList.add("productDescription");
    p.textContent = product.description;

    appendC(baliseA, article, image, h3, p);
  });
}

function appendC(baliseA, article, image, h3, p) {
  const items = document.querySelector("#items");
  // Enfant de <--
  items.appendChild(baliseA);
  baliseA.appendChild(article);
  article.appendChild(image);
  article.appendChild(h3);
  article.appendChild(p);
}
