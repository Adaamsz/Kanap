const orderId = getOrderId();
displayOrderId(orderId);
removeStorage();

function getOrderId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("orderId");
}

function displayOrderId(orderId) {
  const orderIdElement = document.getElementById("orderId");
  orderIdElement.textContent = orderId;
}

function removeStorage() {
  const cache = window.localStorage;
  cache.clear();
}
