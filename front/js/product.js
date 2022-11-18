const getProductId = () => {
  return new URL(location.href).searchParams.get("id");
};
const productId = getProductId();

fetch(`http://localhost:3000/api/products/${productId}`)
  .then((response) => response.json())
  .then((res) => addProduct(res));

// Ajout du produit

function addProduct(article) {
  const productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  for (colors of article.colors) {
    const productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }

  const h1 = document.getElementById("title");
  h1.innerHTML = article.name;

  const price = document.getElementById("price");
  price.innerHTML = article.price;

  const description = document.getElementById("description");
  description.innerHTML = article.description;
}

// Ajout au panier
