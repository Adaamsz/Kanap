// Recupere l'id du produit depuis l'url.
const url = new URLSearchParams(document.location.search);
const id = url.get("_id");

displayProduct(); // Appel de la fonction d'affichage des produits.

function displayProduct() {
  fetch("http://localhost:3000/api/products/" + id)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("title").textContent = `${data.name}`;
      document.querySelector(
        ".item__img"
      ).innerHTML += `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
      document.querySelector(
        "#title"
      ).innerHTML += `<h1 id="title">${data.name}</h1>`;
      document.querySelector(
        "#price"
      ).innerHTML += `<span id="price">${data.price}</span>`;
      document.querySelector(
        "#description"
      ).innerHTML += `<p id="description">${data.description}</p>`;

      // Boucle pour afficher les options de couleurs.
      data.colors.forEach((color) => {
        document.querySelector(
          "#colors"
        ).innerHTML += `<option value="${color}">${color}</option>`;
      });
    })
    .catch((error) => {
      alert("Une erreur est survenue.");
    });
}

productToCart();
function productToCart() {
  const addToCart = document.querySelector("#addToCart");
  addToCart.addEventListener("click", (event) => {
    event.preventDefault();
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart === null) {
      cart = [];
    }
    // Recup les données du produit.
    const product = {
      id: id,
      name: document.querySelector("#title").textContent,
      price: document.querySelector("#price").textContent,
      quantity: document.querySelector("#quantity").value,
      color: document.querySelector("#colors").value,
    };
    // Alerte si la quantité est inférieur à 1.
    if (product.quantity < 1) {
      alert("Veuillez choisir une quantité");
      return; // s'arrête ici.
    }
    // Si la quantité est supérieur à 100.
    if (product.quantity > 100) {
      alert("Veuillez choisir une qualité inferieur à 100");
      return;
    }
    // Si une couleur n'est pas choisie.
    if (product.color === "" || product.color == null) {
      alert("Veuillez choisir une couleur");
      return;
    }
    // Ajoute le produit au panier dans le LocalStorage après vérification.
    if (
      product.quantity > 0 &&
      product.quantity <= 100 &&
      product.color !== "" &&
      product.color !== null
    ) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      // Regroupe les produits identiques dans le panier.
      let sameProduct = [];
      cart.forEach((product) => {
        // Recherche si le produit n'existe déjà pas dans le panier
        let productFound = sameProduct.find(
          (productGrouped) =>
            productGrouped.id === product.id &&
            productGrouped.color === product.color
        );
        //Si le produit a deja une quantité de 100, on ne peut pas ajouter plus.
        if (productFound && productFound.quantity >= 100) {
          alert(
            "Vous ne pouvez pas ajouter plus de 100 produits identiques dans le panier"
          );
        } else if (productFound) {
          // Si le produit existe déjà dans le panier, on ajoute la quantité.
          productFound.quantity =
            parseInt(productFound.quantity) + parseInt(product.quantity);
        } else {
          // Si le produit n'existe pas dans le panier, on l'ajoute.
          sameProduct.push(product);
        }
      });
      localStorage.setItem("cart", JSON.stringify(sameProduct));
      window.location.href = "index.html"; // Redirige vers la page index (après l'achat).
      alert("Article ajouter au panier !");
    }
  });
}
