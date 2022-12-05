const getProductId = () => {
  return new URL(location.href).searchParams.get("id");
};
const productId = getProductId();
if (productId != null) {
  let itemPrice = 0;
  let imgUrl, d, altText, itemName;
}

fetch(`http://localhost:3000/api/products/${productId}`)
  .then((response) => response.json())
  .then((res) => addProduct(res));

// Ajout du produit

function addProduct(article) {
  const productImg = document.createElement("img");
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  const h1 = document.getElementById("title");
  h1.innerHTML = article.name;

  const price = document.getElementById("price");
  price.innerHTML = article.price;

  const description = document.getElementById("description");
  description.innerHTML = article.description;

  for (colors of article.colors) {
    const productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }

  // Récupère tous les data depuis l'api pour les transférer a la variable ligne 6/7?
  altText = article.altTxt;
  imgUrl = article.imageUrl;
  itemName = article.name;
  itemPrice = article.price;
  d = article.description;

  document.querySelector(".item__img").appendChild(productImg);
}

// Ajout au panier

const button = document.querySelector("#addToCart");
button.addEventListener("click", click);

function click() {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;
  if (unvalidCart(color, quantity)) return;
  productsId(color, quantity);
}

function unvalidCart(color, quantity) {
  if (color == null || color === "" || quantity == null || quantity == "0") {
    alert(
      "Veuillez sélectionner une couleur et le nombre d'articles souhaités."
    );
    // ne vas quaand même pas mettre ajouter panier suite à une erreur
    return true;
  }
}

function productsId(color, quantity) {
  const productParams = {
    id: productId,
    name: itemName,
    quantity: Number(quantity),
    color: color,
    price: itemPrice,
    title: itemName,
    imageUrl: imgUrl,
    altTxt: altText,
    description: d,
  };
  localStorage.setItem(productId, JSON.stringify(productParams));

  alert("Article ajouter au panier !");
}
