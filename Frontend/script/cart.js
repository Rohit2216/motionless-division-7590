// let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
// let grandTotal=0
// // Display cart items and total price
// const cartItemsContainer = document.querySelector(".cart-items");
// const totalPriceElement = document.querySelector("#grandTotal");

// displayCartItems(cartItems);
// function displayCartItems(cartItems) {

//   cartItemsContainer.innerHTML = "";
//   let totalPrice = 0;

//   cartItems.forEach((item) => {
//     const itemElement = document.createElement("div");
//     itemElement.classList.add("cart-item");

//     const imageElement = document.createElement("img");
//     imageElement.classList.add("item-image");
//     imageElement.src = item.image;
//     imageElement.alt = item.name;
//     itemElement.appendChild(imageElement);

//     const nameElement = document.createElement("h2");
//     nameElement.classList.add("item-name");
//     nameElement.textContent = item.name;
//     itemElement.appendChild(nameElement);

//     const titleElement = document.createElement("p");
//     titleElement.classList.add("item-title");
//     titleElement.textContent = item.title;
//     itemElement.appendChild(titleElement);

//     const priceElement = document.createElement("h2");
//     priceElement.classList.add("item-price");
//     priceElement.textContent = `Rs. ${item.price}`;
//     itemElement.appendChild(priceElement);

//     grandTotal = grandTotal + Number(item.price);


//     const quantityContainer = document.createElement("div");
//     quantityContainer.classList.add("quantity-container");

//     const decreaseQuantityButton = document.createElement("button");
//     decreaseQuantityButton.classList.add("quantity-button", "decrease-button");
//     decreaseQuantityButton.textContent = "-";
//     decreaseQuantityButton.addEventListener("click", () => {
//       if (item.quantity > 1) {
//         item.quantity--;
//         localStorage.setItem("cartItems", JSON.stringify(cartItems));
//         displayCartItems();
//       }
//     });
//     quantityContainer.appendChild(decreaseQuantityButton);

//     const quantityElement = document.createElement("span");
//     quantityElement.classList.add("quantity");
//     quantityElement.textContent = item.quantity;
//     quantityContainer.appendChild(quantityElement);

//     const increaseQuantityButton = document.createElement("button");
//     increaseQuantityButton.classList.add("quantity-button", "increase-button");
//     increaseQuantityButton.textContent = "+";
//     increaseQuantityButton.addEventListener("click", () => {
//       item.quantity++;
//       localStorage.setItem("cartItems", JSON.stringify(cartItems));
//       displayCartItems();
//     });
//     quantityContainer.appendChild(increaseQuantityButton);

//     itemElement.appendChild(quantityContainer);

  

//     const removeButton = document.createElement("button");
//     removeButton.classList.add("remove-button");
//     removeButton.textContent = "Remove";
//     removeButton.addEventListener("click", () => {
//       const itemIndex = cartItems.indexOf(item);
//       cartItems.splice(itemIndex, 1);
//       localStorage.setItem("cartItems", JSON.stringify(cartItems));
//       displayCartItems();
//     });
//     itemElement.appendChild(removeButton);

    

//     const buyNowButton = document.createElement('button');
//   buyNowButton.classList.add('buy-now-button');
  
//   buyNowButton.textContent = 'Buy Now';


//   // Add event listener to the button
//   buyNowButton.addEventListener('click', () => {
//     // window.location.href="payment.html"
//     // Implement logic to handle the "Buy Now" functionality
//     window.location.href="payment2.html"
//     console.log('Buy Now clicked');
    
//   });

//   // Append the button to the item element
//   itemElement.appendChild(buyNowButton);

//     cartItemsContainer.appendChild(itemElement);

//     totalPrice += item.price * item.quantity;
//   });
//   // totalPriceElement.textContent = `Rs. ${totalPrice.toFixed(2)}`;
//   totalPriceElement.innerHTML=grandTotal;
// }




// const productCardsContainer = document.querySelector('.product-cards');

// // Create and append product cards
// cartItems.forEach(product => {
//   const card = document.createElement('div');
//   card.classList.add('product-card');

//   const image = document.createElement('img');
//   image.classList.add('product-image');
//   image.src = product.image;
//   image.alt = product.name;
//   card.appendChild(image);

//   const name = document.createElement('h2');
//   name.classList.add('product-name');
//   name.textContent = product.name;
//   card.appendChild(name);

//   const price = document.createElement('h3');
//   price.classList.add('product-price');
//   price.textContent = `$${product.price}`;
//   card.appendChild(price);

//   const buttonContainer = document.createElement('div');
//   buttonContainer.classList.add('product-button-container');

  
//   grandTotal = grandTotal + Number(product.price);


//   const addButton = document.createElement('button');
//   addButton.classList.add('add-to-cart-button');
//   addButton.textContent = 'Add to Cart';


//   const buyNowButton = document.createElement('button');
//   buyNowButton.classList.add('buy-now-button');
//   buyNowButton.textContent = 'Buy Now';

//   // Add event listener to the button
//   buyNowButton.addEventListener('click', () => {
//     // Implement logic to handle the "Buy Now" functionality
//     console.log('Buy Now clicked');
//   });

//   // Append the button to the item element
//   itemElement.appendChild(buyNowButton);
  

//   addButton.addEventListener('click', () => {
//     const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

//     if (existingItemIndex !== -1) {
//       // Increment the quantity of an existing item in the cart
//       cartItems[existingItemIndex].quantity++;
//     } else {
//       // Add a new item to the cart
//       cartItems.push({ ...product, quantity: 1 });
//     }

//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   });

//   buttonContainer.appendChild(addButton);
//   card.appendChild(buttonContainer);

//   productCardsContainer.appendChild(card);
// });





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
    priceElement.textContent = `Rs. ${item.price}`;
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

    // const buyNowButton = document.createElement('button');
    // buyNowButton.classList.add('buy-now-button');
    // buyNowButton.textContent = 'Buy Now';

    // buyNowButton.addEventListener('click', () => {
    //   window.location.href="payment2.html"
    //   console.log('Buy Now clicked');
    // });

    // itemElement.appendChild(buyNowButton);

    cartItemsContainer.appendChild(itemElement);
  });
  
  totalPriceElement.textContent = `Rs. ${totalPrice.toFixed(2)}`;
}

function totalPrices(item){

  
  totalPrice += Number(item.price) * item.quantity;
  // window.location.reload
}


console.log(grandTotal)