
// const containerElement = document.querySelector('.productData');
// const sortElement = document.querySelector('#sort');
// const filterElement = document.querySelector('#filter');

// function displayProducts() {
//   fetch("https://sephora-ul8o.onrender.com/product/")
//     .then(response => response.json())
//     .then(data => {
//       display(data)
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }
// displayProducts()
// function display(data) {
//   containerElement.innerHTML = "";

//   if (Array.isArray(data)) {
//     data.forEach(product => {
//       const productElement = document.createElement("div");
//       productElement.classList.add("product");

//       const imageElement = document.createElement("img");
//       imageElement.classList.add("product-image");
//       imageElement.src = product.image;
//       imageElement.alt = product.name;
//       productElement.appendChild(imageElement);

//       const nameElement = document.createElement("h2");
//       nameElement.classList.add("product-name");
//       nameElement.textContent = product.name;
//       productElement.appendChild(nameElement);

//       const titleElement = document.createElement("p");
//       titleElement.classList.add("product-title");
//       titleElement.textContent = `${product.title}`;
//       productElement.appendChild(titleElement);

//       const priceElement = document.createElement("h2");
//       priceElement.classList.add("product-price");
//       priceElement.textContent = `₹${product.price}`;
//       productElement.appendChild(priceElement);



//       // Add "Add to Cart" button
//       const buttonElement = document.createElement("button");
//       buttonElement.textContent = "Add to Cart";
//       buttonElement.addEventListener("click", () => {
//         addToCart(product);
//       });
//       productElement.appendChild(buttonElement);

//       containerElement.appendChild(productElement);
//     });
//   }

// }





const sortSelect = document.getElementById('sort1');

sortSelect.addEventListener('change', async () => {
  const selectedSort = sortSelect.value;

  try {
    let res = await fetch("https://sephora-ul8o.onrender.com/product/");
    let result = await res.json();
    //    result=result.sort((a,b)=>{a.price-b.price})
    if (selectedSort === 'asc') {
      var arr = result.sort((a, b) => {
        return a.price - b.price
      });
      displayProducts(arr)
    } else {
      var arr = result.sort((a, b) => {
        return b.price - a.price
      });
      displayProducts(arr)
    }

  } catch (error) {
    console.error(error);
  }
  ;
});

function addToCart(product) {
  // Retrieve cart items from local storage
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];


  // Add product to cart
  product.quantity = 1
  console.log(product)
  cartItems.push(product);

  // Store cart items in local storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  console.log(`Product "${product.name}" added to cart`);
  alert("Product added to cart successfully");
}



// Get all the links
const navLinks = document.querySelectorAll('nav ul li a');

// Loop through the links and add the click event listener
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    // Remove the active class from all the links
    navLinks.forEach(link => link.classList.remove('active'));
    // Add the active class to the clicked link
    link.classList.add('active');
  });
});

// Get the back to top button
const backToTopButton = document.getElementById('back');

// Add the click event listener to the back to top button
backToTopButton.addEventListener('click', function () {
  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' });
});






const containerElement = document.querySelector('.productData');
const sortElement = document.querySelector('#sort');
const filterElement = document.querySelector('#filter');
const searchElement = document.querySelector('#search-input');
let productsData = []; // Store the fetched product data

function displayProducts(products) {
  containerElement.innerHTML = "";

  products.forEach(product => {
    // const productElement = document.createElement("div");
    // productElement.classList.add("product");

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



    // ... (rest of your display logic)

    containerElement.appendChild(productElement);
  });
}

function searchProducts(products, searchTerm) {
  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }); 
  return filteredProducts;
}

function sortProducts(products, sortType) {
  const sortedProducts = [...products];
  console.log("Sorting products...");
  if (sortType === 'asc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortType === 'desc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }
  console.log("Sorted products:", sortedProducts);
  return sortedProducts;
}


function displayFilteredProducts() {
  const searchTerm = searchElement.value;
  const filteredProducts = searchProducts(productsData, searchTerm);
  const sortType = sortElement.value;
  const sortedAndFilteredProducts = sortProducts(filteredProducts, sortType);
  displayProducts(sortedAndFilteredProducts);
}

searchElement.addEventListener("input", displayFilteredProducts);
sortElement.addEventListener("change", displayFilteredProducts);

// Fetch product data from your API
function fetchProducts() {
  fetch("https://sephora-ul8o.onrender.com/product/")
    .then(response => response.json())
    .then(data => {
      productsData = data; // Store the product data
      displayFilteredProducts(); // Display filtered and sorted products
    })
    .catch(error => {
      console.error(error);
    });
}

// Call the fetchProducts function to load and display products
fetchProducts();