fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((res) => addProduct(res));

// Boucle pour récup tout les products dans le panier
function findId() {
  const storageProducts = localStorage.length;
  for (let i = 0; i < storageProducts; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    const object = JSON.parse(item);
    cart.push(object);
  }
}

function addProduct(products) {
  const section = document.querySelector("#cart__items");

  // article cart__item
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = product.addId;
  article.dataset.colors = product.color;

  // div + img
  const dImg = document.createElement("div");
  dImg.classList.add("cart__item__img");
  const image = document.createElement("img");
  image.src = product.imageUrl;

  // div cart__item__content
  const dDescription = document.createElement("div");
  dDescription.classList.add("cart__item__content");

  // div cart__item__content__description
  const dContentDescription = document.createElement("div");
  dContentDescription.classList.add("cart__item__content__description");

  // h2 Nom du product
  const h2 = document.createElement("h2");

  // p Couleur
  const pColor = document.createElement("p");
  pColor.textContent = product.color;

  // p Prix
  const pPrix = document.createElement("p");

  // div cart__item__content__settings
  const dSettings = document.createElement("div");
  dSettings.classList.add("cart__item__content__settings");

  // div cart__item__content__settings__quantity
  const dQuantity = document.createElement("div");
  dQuantity.classList.add("cart__item__content__settings__quantity");

  // p Qté (Quantité)
  const pQuantity = document.createElement("p");
  pQuantity.innerText = "Qté : " + product.quantité + "  ";

  // input type number itemQuantity
  const itemsQuantity = document.createElement("input");
  itemsQuantity.type = "number";
  itemsQuantity.classList.add("itemQuantity");
  itemsQuantity.name = "itemQuantity";
  itemsQuantity.min = "1";
  itemsQuantity.max = "100";
  itemsQuantity.value = product.quantity;
  itemsQuantity.addEventListener("change", () =>
    updateArticleQuantity(product.addId, itemsQuantity.value)
  );

  // div cart__item__content__setting__delete
  const dDelete = document.createElement("div");
  dDelete.classList.add("cart__item__content__setting__delete");

  // p deleteItem supprimer
  const deleteSetting = document.createElement("p");
  deleteSetting.classList.add("deleteItem");
  deleteSetting.innerText = "Supprimer";

  section.appendChild(article);

  article.appendChild(dImg);

  article.appendChild(dDescription);

  article.appendChild(dContentDescription);

  article.appendChild(dSettings);

  dImg.appendChild(image);

  dDescription.appendChild(dContentDescription);

  dDescription.appendChild(dSettings);

  dContentDescription.appendChild(h2);

  dContentDescription.appendChild(pColor);

  dContentDescription.appendChild(pPrix);

  dSettings.appendChild(pQuantity);

  dSettings.appendChild(dQuantity);

  dSettings.appendChild(itemsQuantity);

  dSettings.appendChild(dDelete);

  dQuantity.appendChild(pQuantity);

  dQuantity.appendChild(itemsQuantity);

  dDelete.appendChild(deleteSetting);
}
