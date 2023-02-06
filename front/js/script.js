// Récupére les produits depuis l'API
fetch("http://localhost:3000/api/products") // Fetch les données depuis l'API.
  // Transforme la réponse en JSON puis récupére les données.
  .then((response) => response.json())
  .then((data) => {
    // Transfères les donnés récuperer a la fonction "displayProducts"
    displayProducts(data); // Appel de la fonction d'affichage "displayProducts".
  });

// Ajouts des produits dans le DOM
function displayProducts(data) {
  // Fonction d'affichage des produits.
  data.forEach(function (products) {
    // Création d'une boucle pour chaque produit.
    document.querySelector("#items").innerHTML += `
        <a href="./product.html?_id=${products._id}"> 
        <article>
            <img src="${products.imageUrl}" alt="${products.altTxt}">
            <h3 class="productName">${products.name}</h3>
            <p class="productDescription">${products.description}</p>
        </article>
        </a>`;
  });
}
