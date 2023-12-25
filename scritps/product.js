// Cart Count
var cartCountElement = document.querySelector(".cart-count");
var storedCartCount = localStorage.getItem("cartCount");

if (storedCartCount !== null) {
  // Update the cart count element with the stored count
  cartCountElement.innerText = storedCartCount;
} else {
  // Initialize the cart count and update the element
  updateCartCount();
}


document.addEventListener("DOMContentLoaded", function () {


  // Function to get URL parameter by name
  function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  const productId = getUrlParameter("id");
  console.log("Product ID from URL:", productId);

  var apiEndpoint = "db.json";

  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.products && data.products.length > 0) {
        // Find the product with the matching ID
        const selectedProduct = data.products.find(
          (product) => product.id == productId
        );

        if (selectedProduct) {
          // Update the HTML structure with the selected product details
          updateProductDetails(selectedProduct);
        } else {
          console.log("No matching product found for the given ID.");
        }
      } else {
        console.log("No products found in the API response.");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  // Function to update the HTML structure with product details
  function updateProductDetails(product) {
    // Update product details in the HTML
    document.querySelector(
      ".main-thumbnail"
    ).src = `https://${product.additionalImageUrls[0]}`;

    document.querySelector(".add_btn").addEventListener("click", () => {
      var productId = product.id;
      var productName = product.name;
      var productPrice = product.price.current.text;
      var productImage = `https://${product.imageUrl}`;


      productData2 = {
        id: productId,
        name: productName,
        price: productPrice,
        imageUrl: productImage,
      };
      localStorage.setItem(
        `product_${productName}`,
        JSON.stringify(productData2)
      );
      alert("Item added to cart!");
      updateCartCount();

    });

    document.getElementsByClassName(
      "preview"
    )[0].innerHTML = `<img class="selected" src="https://${product.additionalImageUrls[0]}" />
                      <img src="https://${product.additionalImageUrls[1]}" alt /> 
                      <img src="https://${product.additionalImageUrls[2]}" alt /> 
                      <img src="https://${product.additionalImageUrls[3]}" alt />`;

    document.querySelector(".company").textContent = product.category;

    document.querySelector(".title").textContent = product.name;

    document.querySelector(".now").textContent = product.price.current.value;

    document.querySelector(".old-price").textContent =
      "$" + product.price.current.value * 2;

    document.querySelector(".info").textContent = product.description;

    document.querySelector(
      ".now"
    ).textContent = `${product.price.current.text}`;

    const mainThumbnail = document.querySelector(".main-thumbnail");
    const previewImages = document.querySelectorAll(".preview img");

    previewImages.forEach((image, index) => {
      image.addEventListener("click", () => {
        // Update the main thumbnail with the clicked image
        mainThumbnail.src = `https://${product.additionalImageUrls[index]}`;

        previewImages.forEach((img) => img.classList.remove("selected"));

        // Add the "selected" class to the clicked image
        image.classList.add("selected");
      });
    });
  }
});

function updateCartCount() {
  var cartCount = 0;

  // Iterate through local storage keys
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);

    // Check if the key starts with "product_"
    if (key.startsWith("product_")) {
      cartCount++;
    }
  }

  // Update the cart count element
  localStorage.setItem("cartCount", cartCount.toString());
  cartCountElement.innerText = localStorage.getItem("cartCount");

  console.log(cartCountElement);
}


// User Data
var userData = JSON.parse(localStorage.getItem("userData"));
var pic = document.getElementById("user");

if (userData === null) {
  pic.style.display = "none";
} else {
  if (userData.profilePicture) {
    // Assuming the profilePicture property exists in userData
    pic.src = userData.profilePicture;
    pic.style.display = "inline";
  } else {
    // Handle the case where there is no profile picture
    pic.style.display = "none";
  }
}