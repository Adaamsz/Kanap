// Données API
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())

  // Liste de produits depuis le back
  .then(function (products) {
    for (let product of products) {
      // Loop marche pas?
      // let i = 0;
      // i < product.length;
      // i++;
      document.getElementById(
        "items"
      ).innerHTML += `<a href="./product.html?id=${product._id}">
       <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
         <h3 class="productName">${product.name}</h3>
           <p class="productDescription">${product.description}</p>
      </article>
           </a>`;
    }
  });
