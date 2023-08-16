
    const contElement = document.querySelector(".productdata");
    const editForm = document.querySelector(".edit-form");
    const editNameInput = document.getElementById("edit-name");
    const editTitleInput = document.getElementById("edit-title");
    const editPriceInput = document.getElementById("edit-price");
    const updateButton = document.getElementById("update-button");

    let currentProductId = null; // To keep track of the product being edited

    function displayProducts() {
        fetch("https://sephora-ul8o.onrender.com/product")
            .then(response => response.json())
            .then(data => {
                display(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function display(data) {
        contElement.innerHTML = "";

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
                titleElement.textContent = product.title;
                productElement.appendChild(titleElement);

                const priceElement = document.createElement("h2");
                priceElement.classList.add("product-price");
                priceElement.textContent = `₹${product.price}`;
                productElement.appendChild(priceElement);

                // Edit button
                const editButton = document.createElement("button");
                editButton.classList.add("edit-button");
                editButton.textContent = "Edit";
                editButton.addEventListener("click", () => {
                    currentProductId = product._id;
                    editNameInput.value = product.name;
                    editTitleInput.value = product.title;
                    editPriceInput.value = product.price;
                    editForm.style.display = "block";
                    // console.log(currentProductId)
                });
                productElement.appendChild(editButton);

                // Delete button
                const deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-button");
                deleteButton.textContent = "Delete";
                deleteButton.dataset.productId = product._id; // Assign the product ID as a data attribute

                // Add click event listener for delete button
                deleteButton.addEventListener("click", async () => {
                    try {
                        const token = localStorage.getItem("adminToken");
                        if (!token) {
                            console.error("Token not found in localStorage.");
                            return;
                        }

                        const productId = deleteButton.dataset.productId;

                        const response = await fetch(`https://sephora-ul8o.onrender.com/product/delete/${productId}`, {
                            method: "DELETE",
                            headers: {
                                "Authorization": token
                            }
                        });

                        if (response.ok) {
                            const data = await response.json();
                            console.log(data);
                            alert(data.msg);

                            // Remove the product element from the UI after deletion
                            productElement.remove();
                        } else {
                            console.error("Failed to delete product");
                        }
                    } catch (error) {
                        console.error(error);
                        alert("Product deletion failed. Please try again later.");
                    }
                });

                // Append delete button to the product element
                productElement.appendChild(deleteButton);

                productElement.dataset.productId = product._id;

                contElement.appendChild(productElement);
            });
        }
    }

    // ... (previous code)

    updateButton.addEventListener("click", () => {
        const updatedName = editNameInput.value;
        const updatedTitle = editTitleInput.value;
        const updatedPrice = editPriceInput.value;

        if (!updatedName || !updatedTitle || !updatedPrice) {
            alert("Please fill in all fields.");
            return;
        }

        const updatedProduct = {
            name: updatedName,
            title: updatedTitle,
            price: updatedPrice
        };

        // Retrieve the token from local storage
        const token = localStorage.getItem("adminToken");
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }

        // console.log(token)

        // Perform the actual API call to update the product on the server
        fetch(`https://sephora-ul8o.onrender.com/product/update/${currentProductId}`, {
            method: 'PATCH', // Use the appropriate HTTP method (PUT, PATCH, POST, etc.)
            body: JSON.stringify(updatedProduct),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token // Include the token in the Authorization header
            }
        })
            .then(response => response.json())
            .then(updatedProductData => {
                console.log("Updated product:", updatedProductData);

                updateDisplayedProduct(currentProductId, updatedProductData);
                window.location.reload()
                editForm.style.display = "none";
            })
            .catch(error => {
                console.error("Error updating product:", error);
            });
    });

    function updateDisplayedProduct(productId, updatedProduct) {
        const productElement = document.querySelector(`[data-product-id="${productId}"]`);
        if (productElement) {
            const nameElement = productElement.querySelector(".product-name");
            const titleElement = productElement.querySelector(".product-title");
            const priceElement = productElement.querySelector(".product-price");

            nameElement.textContent = updatedProduct.name;
            titleElement.textContent = updatedProduct.title;
            priceElement.textContent = `₹${updatedProduct.price}`;
        }
    }

    // Initial fetch to populate the product list
    displayProducts();


    const addProductForm = document.getElementById("add-product-form");
    if (addProductForm) {
        addProductForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const image = document.getElementById("add-image").value;
            const name = document.getElementById("add-name").value;
            const title = document.getElementById("add-title").value;
            const price = parseFloat(document.getElementById("add-price").value);

            const payload = {
                image: image,
                name: name,
                title: title,
                price: price
            };

            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    console.error("Token not found in localStorage.");
                    return;
                }

                const response = await fetch("https://sephora-ul8o.onrender.com/product/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token // Corrected header key
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();
                console.log(data);
                alert(data.msg);
                window.location.reload();
                //   window.location.href = "login.html";
            } catch (error) {
                console.error(error);
                alert("Product creation failed. Please try again later.");
            }
        });
    }

    // Function to perform logout
    function logout() {
        // Clear the token from localStorage
        localStorage.removeItem("adminToken");
        // You can also perform any additional cleanup or redirection here if needed
        alert("Logged out successfully");
    }

    // Add an event listener to the logout button or link
    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", () => {
        logout();
    });
