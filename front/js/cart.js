const cart = [];

findId();
cart.forEach((item) => displayItem(item));

const orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (e) => submit(e));

// Boucle pour récup tout les products dans le panier
function findId() {
  const numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || "";
    const itemObject = JSON.parse(item);
    cart.push(itemObject);
  }
}

function displayItem(item) {
  const article = createArticle(item);
  const imageDiv = createImageDiv(item);
  article.appendChild(imageDiv);
  const displayItem = createDisplay(item);
  article.appendChild(displayItem);
  displayArticle(article);
  displayTotalQuantity();
  displayTotalPrice();
}

function displayTotalQuantity() {
  const totalQuantity = document.querySelector("#totalQuantity");
  const total = cart.reduce((total, item) => total + item.quantity, 0);
  totalQuantity.textContent = total;
}

function displayTotalPrice() {
  const totalPrice = document.querySelector("#totalPrice");
  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  totalPrice.textContent = total;
}

function createDisplay(item) {
  const displayItem = document.createElement("div");
  displayItem.classList.add("cart__item__content");

  const description = createDescription(item);
  const settings = createSettings(item);

  displayItem.appendChild(description);
  displayItem.appendChild(settings);
  return displayItem;
}

function createSettings(item) {
  const settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");

  changeQuantity(settings, item);
  removeSettings(settings, item);
  return settings;
}

function removeSettings(settings, item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__content__settings__delete");
  div.addEventListener("click", () => deleteItem(item));

  const p = document.createElement("p");
  p.textContent = "Supprimer";
  div.appendChild(p);
  settings.appendChild(div);
}

function deleteItem(item) {
  const deleteIt = cart.findIndex(
    (product) => product.id === item.id && product.color === item.color
  );
  cart.splice(deleteIt, 1);
  displayTotalPrice();
  displayTotalQuantity();
  deleteItemStorage(item);
  deleteArticle(item);
}

function deleteArticle(item) {
  const articleToDelete = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`
  );
  articleToDelete.remove();
}

function changeQuantity(settings, item) {
  const quantity = document.createElement("div");
  quantity.classList.add("cart__item__content__settings__quantity");
  const p = document.createElement("p");
  p.textContent = "Qté : ";
  quantity.appendChild(p);

  const input = document.createElement("input");
  input.name = "itemQuantity";
  input.classList.add("itemQuantity");
  input.type = "number";
  input.min = "1";
  input.max = "100";
  input.value = item.quantity;
  input.addEventListener("input", () =>
    updatePrice(item.id, input.value, item)
  );

  quantity.appendChild(input);
  settings.appendChild(quantity);
}

function updatePrice(id, newValue, item) {
  const itemToUpdate = cart.find((item) => item.id === id);
  itemToUpdate.quantity = Number(newValue);
  item.quantity = itemToUpdate.quantity;
  displayTotalQuantity();
  displayTotalPrice();
  updateStorage(item);
}

//Supprime une fois sur deux
function deleteItemStorage(item) {
  const key = `${item.id}-${item.color}`;
  localStorage.removeItem(key);
}

function updateStorage(item) {
  const dataToSave = JSON.stringify(item);
  const key = `${item.id}-${item.color}`;
  localStorage.setItem(key, dataToSave);
}

function createDescription(item) {
  const description = document.createElement("div");
  description.classList.add("cart__item__content__description");

  const h2 = document.createElement("h2");
  h2.textContent = item.name;
  const p = document.createElement("p");
  p.textContent = item.color;
  const p2 = document.createElement("p");
  p2.textContent = item.price + " €";

  description.appendChild(h2);
  description.appendChild(p);
  description.appendChild(p2);
  return description;
}

function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article);
}

function createArticle(item) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  return article;
}

function createImageDiv(item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__img");

  const image = document.createElement("img");
  image.alt = item.altTxt;
  image.src = item.imageUrl;
  div.appendChild(image);
  return div;
}

function submit(e) {
  e.preventDefault();
  if (cart.length === 0) {
    alert("Veuillez sélectionner les articles à acheter");
    return false;
  }

  if (unvalidEmail()) return;
  if (unvalidForm()) return;

  const body = createRequestedInfo();
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId;
      window.location.href = "./confirmation.html" + "?orderId=" + orderId;
    })
    .catch((err) => console.error(err));
}

function createRequestedInfo() {
  const form = document.querySelector(".cart__order__form");
  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;
  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: getIdsStorage(),
  };
  return body;
}

function unvalidEmail() {
  const email = document.querySelector("#email").value;
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  if (regex.test(email) === false) {
    alert("Veuillez saisir une adresse e-mail valide");
    return true;
  }
  return false;
}

function unvalidForm() {
  const form = document.querySelector(".cart__order__form");
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value === "") {
      alert("Veuillez remplir tous les champs");
      return true;
    }
    return false;
  });
}

function getIdsStorage() {
  const numberOfProducts = localStorage.length;
  const ids = [];
  for (let i = 0; i < numberOfProducts; i++) {
    const key = localStorage.key(i);
    const id = key.split("-")[0];
    ids.push(id);
  }
  return ids;
}
