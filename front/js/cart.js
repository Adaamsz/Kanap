// Récupération des données du panier depuis le LocalStorage.
cart = JSON.parse(localStorage.getItem("cart"));

displayCart();
// Fonction pour afficher les produits du panier.
function displayCart() {
  // Boucle pour afficher les produits du cart.
  cart.forEach((product) => {
    console.table(product);
  });

  // Récupere les data des produits et les affiches dans le DOM.
  fetch("http://localhost:3000/api/products") // Fetch les données depuis l'API.
    .then((response) => response.json())
    .then((data) => {
      console.table(data);
      data.forEach((product) => {
        // Crée une boucle pour chaque produit.
        cart.forEach((item) => {
          // Pareil mais pour chaque produit du panier.
          if (product._id === item.id) {
            // Vérification si l'id du produit est identique à l'id du produit du panier.
            document.querySelector("#cart__items").innerHTML += `
                    <article class="cart__item" data-id="${product._id}">
                        <div class="cart__item__img">
                            <img src="${product.imageUrl}" alt="${product.altTxt}">
                        </div>
                        <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${product.name}</h2>
                                <p>${item.color}</p>
                                <p>${product.price} €</p>
                            </div>
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                    <p>Qté : </p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem">Supprimer</p>
                                </div>
                            </div>
                        </div>
                    </article>`;
          }
        });
      });
    });
}

// Fonction pour calculer le prix total du panier.
displayTotalPrice();
function displayTotalPrice() {
  let totalPrice = 0;
  cart.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });
  document.querySelector(
    "#totalPrice"
    // Affichage du prix total du panier sur la page.
  ).innerHTML += `<span id="totalPrice">${totalPrice}</span>`;

  let totalQuantity = 0;
  cart.forEach((product) => {
    totalQuantity += parseInt(product.quantity);
  });
  document.querySelector(
    "#totalQuantity"
    // Affichage du nombre d'articles dans le panier sur la page.
  ).innerHTML += `<span id="totalQuantity">${totalQuantity}</span>`;
}

// Fonction pour recuperer le nom du produit.
function getProductName(productId) {
  let productName = "";
  cart.forEach((product) => {
    if (product.id === productId) {
      productName = product.name;
    }
  });
  return productName;
}

// Fonction pour récuperer le prix du produit.
function getProductPrice(productId) {
  let productPrice = 0;
  cart.forEach((product) => {
    if (product.id === productId) {
      productPrice = product.price;
    }
  });
  return productPrice;
}

// Fonction pour mettre a jour le panier.
function updateCart() {
  let cartItems = document.querySelector("#cart__items"); //Récupération de la div cart__items.
  let cartItem = cartItems.querySelectorAll(".cart__item"); //Sélectionne tous les éléments avec la classe cart__item.
  let products = [];
  cartItem.forEach((item) => {
    // Recup toutes les données du produit.
    let productId = item.getAttribute("data-id");
    let productName = getProductName(productId);
    let productQuantity = item.querySelector(".itemQuantity").value;
    let productColor = item.querySelector("p:nth-child(2)").textContent;
    let productPrice = getProductPrice(productId); // Recup le prix du produit depuis l'API.
    products.push({
      id: productId,
      name: productName,
      quantity: productQuantity,
      color: productColor,
      price: productPrice,
    });
  });
  localStorage.setItem("cart", JSON.stringify(products));
  // Recharge les données du panier et le prix total sans recharger la page.
  cart = JSON.parse(localStorage.getItem("cart"));
  document.querySelector("#totalPrice").innerHTML = "";
  document.querySelector("#totalQuantity").innerHTML = "";
  displayTotalPrice();
}

//Fonction pour Modifier la quantité d'un produit.
displayQuantity();
function displayQuantity() {
  addEventListener("change", (event) => {
    event.preventDefault();
    if (event.target.classList.contains("itemQuantity")) {
      //Si l'élément cliqué a la classe itemQuantity.
      const quantity = event.target;
      if (quantity.value == 0) {
        quantity.value = 1;
      } // Si la quantité est inférieur à 1 ont met la quantité à 1
      updateCart();
    }
  });
}

// Fonction pour supprimer un produit du panier.
deleteItem();
function deleteItem() {
  addEventListener("click", (event) => {
    if (event.target.classList.contains("deleteItem")) {
      const deleteproduct = event.target;
      // Supprime le produit du panier.
      deleteproduct.parentElement.parentElement.parentElement.parentElement.remove();
      updateCart();
    }
  });
}

sendOrder();
function sendOrder() {
  addEventListener("submit", (event) => {
    event.preventDefault();
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const address = document.querySelector("#address").value;
    const city = document.querySelector("#city").value;
    const email = document.querySelector("#email").value;
    const products = [];
    cart.forEach((product) => {
      products.push(product.id);
    });

    // Vérification du Prénom
    if (
      firstName.length < 2 ||
      !isNaN(firstName) ||
      firstName.match(/[^a-zA-Z-çñàéèêëïîôüù - ]/)
    ) {
      document.querySelector("#firstNameErrorMsg").innerHTML =
        "Veuillez entrer un Prénom valide.";
      return false;
    }

    // Verification du Nom
    if (
      lastName.length < 2 ||
      !isNaN(lastName) ||
      lastName.match(/[^a-zA-Z-çñàéèêëïîôüù - ]/)
    ) {
      document.querySelector("#lastNameErrorMsg").innerHTML =
        "Veuillez entrer un Nom valide.";
      return false;
    }

    // Vérification de l'adresse
    if (
      address.length < 5 ||
      !isNaN(address) ||
      address.match(/[^a-zA-Z0-9-çñàéèêëïîôüù\s-']/)
    ) {
      document.querySelector("#addressErrorMsg").innerHTML =
        "Veuillez entrer une adresse valide.";
      return false;
    }

    // Vérification de la ville
    if (city.length < 2 || !isNaN(city) || city.match(/[^a-zA-ZÀ-ÿ\s-']/)) {
      document.querySelector("#cityErrorMsg").innerHTML =
        "Veuillez entrer une ville valide.";
      return false;
    }

    // Vérification de l'email
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/)) {
      document.querySelector("#emailErrorMsg").innerHTML =
        "Veuillez entrer une adresse email valide.";
      return false;
    }

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contact: {
          firstName: firstName,
          lastName: lastName,
          address: address,
          city: city,
          email: email,
        },
        products: products,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem("order", JSON.stringify(json));
        let orderId = json.orderId; // Récupere l'orderId de la commande.
        localStorage.setItem("orderId", orderId);
        window.location.href = "confirmation.html" + "?orderId=" + orderId;
        localStorage.removeItem("cart"); // Supprime le panier.
        console.log(json);
      });
  });
}
