const containerElement = document.querySelector('.productData');
const sortElement = document.querySelector('#sort');
const filterElement = document.querySelector('#filter');

function displayProducts() {
  fetch("https://plain-jeans-cod.cyclic.app/product/")
    .then(response => response.json())
    .then(data => {
      display(data)
    })
    .catch(error => {
      console.error(error);
    });
}
displayProducts()
function display(data) {
  containerElement.innerHTML = "";

  if (Array.isArray(data)) {
    data.forEach(product => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");

      const imageElement = document.createElement("img");
      imageElement.classList.add("product-image");
      imageElement.src = product.image;
      imageElement.alt = product.name;
      productElement.appendChild(imageElement);

      const nameElement = document.createElement("h2");
      nameElement.classList.add("product-name");
      nameElement.textContent = product.name;
      productElement.appendChild(nameElement);

      const titleElement = document.createElement("p");
      titleElement.classList.add("product-title");
      titleElement.textContent = `${product.title}`;
      productElement.appendChild(titleElement);

      const priceElement = document.createElement("h2");
      priceElement.classList.add("product-price");
      priceElement.textContent = `₹${product.price}`;
      productElement.appendChild(priceElement);



      // Add "Add to Cart" button
      const buttonElement = document.createElement("button");
      buttonElement.textContent = "Add to Cart";
      buttonElement.addEventListener("click", () => {
        addToCart(product);
      });
      productElement.appendChild(buttonElement);

      containerElement.appendChild(productElement);
    });
  }

}


const sortSelect = document.getElementById('sort1');

sortSelect.addEventListener('change', async () => {
  const selectedSort = sortSelect.value;

  // fetch("http://localhost:8800/product/")
  //     .then(response => response.json())
  //     .then(data => {
  //         let sortedProducts = [];

  //         if (selectedSort === 'dec') {
  //             sortedProducts = data.sort((a, b) => b.price - a.price);
  //         } else if (selectedSort === 'asc') {
  //             sortedProducts = data.sort((a, b) => a.price - b.price);
  //         } else {
  //             sortedProducts = data;
  //         }

  //         containerElement.innerHTML = '';
  //         sortedProducts.forEach(product => {
  //             // const productElement = createProductElement(product);
  //             containerElement.appendChild(productElement);
  //         });
  // })
  try {
    let res = await fetch("https://plain-jeans-cod.cyclic.app/product/");
    let result = await res.json();
    //    result=result.sort((a,b)=>{a.price-b.price})
    if (selectedSort === 'asc') {
      let arr = result.sort((a, b) => {
        return a.price - b.price
      });
      display(arr)
    } else {
      let arr = result.sort((a, b) => {
        return b.price - a.price
      });
      display(arr)
    }

  } catch (error) {
    console.error(error);
  }
  ;
});




// function addToCart(product) {
//   // Implement adding product to cart here
//   console.log(`Product "${product.name}" added to cart`);
//   alert("product added successfully")
// }

function addToCart(product) {
// Retrieve cart items from local storage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];


// Add product to cart
product.quantity=1
console.log(product)
cartItems.push(product);

// Store cart items in local storage
localStorage.setItem('cartItems', JSON.stringify(cartItems));

console.log(`Product "${product.name}" added to cart`);
alert("Product added to cart successfully");
}




  // displayProducts();

  
  



  
    // Get all the links
const navLinks = document.querySelectorAll('nav ul li a');

// Loop through the links and add the click event listener
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    // Remove the active class from all the links
    navLinks.forEach(link => link.classList.remove('active'));
    // Add the active class to the clicked link
    link.classList.add('active');
  });
});

// Get the back to top button
const backToTopButton = document.getElementById('back');

// Add the click event listener to the back to top button
backToTopButton.addEventListener('click', function() {
  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
