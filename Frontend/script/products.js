
const sortSelect = document.getElementById('sort1');

sortSelect.addEventListener('change', async () => {
  const selectedSort = sortSelect.value;

  try {
    let res = await fetch("https://sephora-ul8o.onrender.com/product/");
    let result = await res.json();

    if (selectedSort === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else {
      result.sort((a, b) => b.price - a.price);
    }

    displayProducts(result, currentPage);
  } catch (error) {
    console.error(error);
  }
});


const containerElement = document.querySelector('.productData');
const sortElement = document.querySelector('#sort');
const filterElement = document.querySelector('#filter');
const searchElement = document.querySelector('#search-input');
const paginationElement = document.querySelector('.pagination');
let productsData = [];
let currentPage = 1;
const productsPerPage = 6;

function displayProducts(products, page) {
  containerElement.innerHTML = "";

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  currentProducts.forEach(product => {
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

    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Add to Cart";
    buttonElement.addEventListener("click", () => {
      addToCart(product);
    });
    productElement.appendChild(buttonElement);

    containerElement.appendChild(productElement);
  });

  const totalPages = Math.ceil(products.length / productsPerPage);
  displayPaginationButtons(totalPages, page);
}

function displayPaginationButtons(totalPages, currentPage) {
  paginationElement.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.classList.add('page-button');
    if (i === currentPage) {
      button.classList.add('active');
    }

    button.addEventListener('click', () => {
      currentPage = i;
      displayProducts(productsData, currentPage);
    });

    paginationElement.appendChild(button);
  }
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
  currentPage = 1; // Reset currentPage to 1 when a new search or sort is performed
  const searchTerm = searchElement.value;
  const filteredProducts = searchProducts(productsData, searchTerm);
  const sortType = sortElement.value;
  const sortedAndFilteredProducts = sortProducts(filteredProducts, sortType);
  displayProducts(sortedAndFilteredProducts, currentPage);
}

searchElement.addEventListener("input", displayFilteredProducts);
sortElement.addEventListener("change", displayFilteredProducts);

// Fetch product data from your API
function fetchProducts() {
  fetch("https://sephora-ul8o.onrender.com/product/")
    .then(response => response.json())
    .then(data => {
      productsData = data;
      displayFilteredProducts(); // Display unsorted data initially
    })
    .catch(error => {
      console.error(error);
    });
}

fetchProducts();

// Sorting event listener
sortSelect.addEventListener('change', () => {
  const selectedSort = sortSelect.value;

  // Sort the data based on the user's selection
  if (selectedSort === 'asc') {
    productsData.sort((a, b) => a.price - b.price); // Sort in ascending order
  } else if (selectedSort === 'desc') {
    productsData.sort((a, b) => b.price - a.price); // Sort in descending order
  }

  // Display the sorted data
  displayFilteredProducts();
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


