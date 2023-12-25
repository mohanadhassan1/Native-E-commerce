// Function to fetch data from db.json using XMLHttpRequest
function fetchData(callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const jsonData = JSON.parse(xhr.responseText);
                callback(jsonData);
            } else {
                console.error('Error fetching data:', xhr.statusText);
            }
        }
    };
    xhr.open('GET', 'db.json', true);
    xhr.send();
}



// Function to handle the search
function handleSearch() {
    // Get the search input value
    const searchTerm = document.querySelector('.search-container input[name="search"]').value.toLowerCase();

    if (searchTerm === '') {
        clearSearchResults();
        return;
    }
    fetchData(function (jsonData) {
        const productsArray = jsonData.products || [];
        // console.log('Fetched Data:', jsonData);

        const searchResults = productsArray.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );

        displaySearchResults(searchResults);
    });
}


// Function to display search results in the products grid
function displaySearchResults(results) {
    const productsGrid = document.getElementById('productsGrid');

    // Clear previous results in the products grid
    productsGrid.innerHTML = '';
    // Apply grid style to the products grid
    productsGrid.style.display = 'grid';
    productsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(400px, 1fr))';
    productsGrid.style.gap = '40px';
    // Append new results to the grid
    results.forEach(result => {
        const productElement = createProductElement(result);
        productsGrid.appendChild(productElement);
    });
}

// Optionally, you can add an event listener to the search input for live search
document.querySelector('.search-container input[name="search"]').addEventListener('input', function () {
    handleSearch();
});



function clearSearchResults(e) {
    location.reload()
}

function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.classList.add('product');

    // Create product image element
    const productImg = document.createElement('img');
    productImg.src = `https://${product.imageUrl}`;
    productImg.className = 'product-img js-product-img';
    productImg.alt = 'Product Image';

    // Create other product elements
    const productTitle = document.createElement('div');
    productTitle.classList.add('product-title');
    productTitle.innerHTML = `<a href="#">${product.name}</a>`;

    const productPrice = document.createElement('div');
    productPrice.classList.add('product-price');
    productPrice.innerHTML = product.price.current.text;

    const productIconBtn = document.createElement('div');
    productIconBtn.classList.add('product-icon-btn');
    productIconBtn.innerHTML = `
        <a href="#">
            <i class="far fa-heart"></i>
            <span class="product-tooltip">Wishlist</span>
        </a>
        <a href="#">
            <i class="fas fa-magnifying-glass"></i>
            <span class="product-tooltip">quick view</span>
        </a>
        <a href="#">
            <i class="fas fa-cart-shopping"></i>
            <span class="product-tooltip">add to cart</span>
        </a>
    `;

    // Append elements to product container
    productElement.appendChild(productImg);
    productElement.appendChild(productTitle);
    productElement.appendChild(productPrice);
    productElement.appendChild(productIconBtn);

    productElement.addEventListener("click", function (e) {
        e.preventDefault();

        var isAddToCartButton = e.target.closest(".add-to-cart");

        if (!isAddToCartButton) {
          var productId = product.id;
          window.open(`product.html?id=${productId}`, "_blank");
        }
      });
    
    return productElement;
}