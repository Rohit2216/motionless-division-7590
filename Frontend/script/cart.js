
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let totalPrice = 0;
// console.log(cartItems);

// Display cart items and total price
const cartItemsContainer = document.querySelector(".cart-items");
const totalPriceElement = document.querySelector("#grandTotal");

displayCartItems(cartItems);

function displayCartItems(cartItems) {
  cartItemsContainer.innerHTML = "";
  totalPrice=0;
  cartItems.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");

    const imageElement = document.createElement("img");
    imageElement.classList.add("item-image");
    imageElement.src = item.image;
    imageElement.alt = item.name;
    itemElement.appendChild(imageElement);

    const nameElement = document.createElement("h2");
    nameElement.classList.add("item-name");
    nameElement.textContent = item.name;
    itemElement.appendChild(nameElement);

    const titleElement = document.createElement("p");
    titleElement.classList.add("item-title");
    titleElement.textContent = item.title;
    itemElement.appendChild(titleElement);

    const priceElement = document.createElement("h2");
    priceElement.classList.add("item-price");
    priceElement.textContent = `₹${item.price}`;
    itemElement.appendChild(priceElement);
    totalPrices(item)
    // totalPrice += Number(item.price) * item.quantity;

    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("quantity-container");

    const decreaseQuantityButton = document.createElement("button");
    decreaseQuantityButton.classList.add("quantity-button", "decrease-button");
    decreaseQuantityButton.textContent = "-";
    decreaseQuantityButton.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        displayCartItems(cartItems);
        totalPrices(item)
      }
      
    });

    // totalPrice = Number(item.price) * Number(item.quantity);
    // totalprice++;
    quantityContainer.appendChild(decreaseQuantityButton);

    const quantityElement = document.createElement("span");
    quantityElement.classList.add("quantity");
    quantityElement.textContent = item.quantity;
    quantityContainer.appendChild(quantityElement);

    const increaseQuantityButton = document.createElement("button");
    increaseQuantityButton.classList.add("quantity-button", "increase-button");
    increaseQuantityButton.textContent = "+";
    increaseQuantityButton.addEventListener("click", () => {
      item.quantity++;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      displayCartItems(cartItems);
      totalPrices(item)
    });
    quantityContainer.appendChild(increaseQuantityButton);

    itemElement.appendChild(quantityContainer);

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      const itemIndex = cartItems.indexOf(item);
      cartItems.splice(itemIndex, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      displayCartItems(cartItems);
    });
    itemElement.appendChild(removeButton);

    cartItemsContainer.appendChild(itemElement);
  });
  
  totalPriceElement.textContent = ` ₹${totalPrice.toFixed(2)}`;
}

function totalPrices(item){

  
  totalPrice += Number(item.price) * item.quantity;
  // window.location.reload()
}


console.log(grandTotal)