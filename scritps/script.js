/// loading page
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.querySelector(".loader-wrapper").style.display = "none";
  }, 500);
});

// ================================================== Start Slider 1 ==================================================

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// ================================================== End Slider 1 ==================================================

// ================================================== Our Products ==================================================
let listCards = [];
var productData;

document.addEventListener("DOMContentLoaded", function () {
  var cartCountElement = document.querySelector(".cart-count");
  var storedCartCount = localStorage.getItem("cartCount");

  if (storedCartCount !== null) {
    // Update the cart count element with the stored count
    cartCountElement.innerText = storedCartCount;
  } else {
    // Initialize the cart count and update the element
    updateCartCount();
  }

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

  document.getElementById("logoutBtn").addEventListener("click", () => {
    
    if (localStorage.getItem("userData") == null) {
      // alert("You need to login")
    }
    else {
      alert("You will be logged out now")
    }

    localStorage.removeItem("userData");
  });

  var cartCountElement = document.querySelector(".cart-count");
  var apiEndpoint = "db.json";
  var productsGrid = document.getElementById("productsGrid");

  let currentIndex = 0;

  const productsContainer = document.querySelector(".js-products-grid");

  function showSlide(index) {
    const slideWidth = document.querySelector(".product").offsetWidth + 20; // Adjust 20 for margin
    productsContainer.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % productCounter; // Assuming productCounter is available
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + productCounter) % productCounter;
    showSlide(currentIndex);
  }

  var productCounter = 0; // Counter to limit the number of products displayed

  // Fetch data from the API
  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((products) => {
      // Iterate through the products and create HTML elements

      products.products.forEach((product) => {

        var productElement = document.createElement("div");
        productElement.className = "product";

        var productImgBox = document.createElement("div");
        productImgBox.className = "product-img-box";

        var productImg = document.createElement("img");
        productImg.src = `https://${product.imageUrl}`;
        productImg.className = "product-img js-product-img";
        productImg.alt = "Product Image";
        productImgBox.appendChild(productImg);

        var productTitle = document.createElement("div");
        productTitle.className = "product-title";
        productTitle.innerHTML = `<a href="#">${product.name}</a>`;

        var productPrice = document.createElement("div");
        productPrice.className = "product-price";
        productPrice.innerHTML = `${product.price.current.text}`;

        var productIconBtn = document.createElement("div");
        productIconBtn.className = "product-icon-btn";
        productIconBtn.innerHTML = `
                            <a href="#">
                                <i class="far fa-heart"></i>
                                <span class="product-tooltip">Wishlist</span>
                            </a>
                            <a href="#">
                                <i class="fas fa-magnifying-glass"></i>
                                <span class="product-tooltip">Quick view</span>
                            </a>
                            <a href="#" class="add-to-cart" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price.current.text}" data-product-src="${productImg.src}" >
                                <i class="fas fa-cart-shopping"></i>
                                <span class="product-tooltip">Add to cart</span>
                            </a>
                        `;

        var productColors = document.createElement("ul");
        productColors.className = "product-colors";

        productElement.appendChild(productImgBox);
        productElement.appendChild(productTitle);
        productElement.appendChild(productPrice);
        productElement.appendChild(productIconBtn);
        productElement.appendChild(productColors);

        productElement.addEventListener("click", function (e) {
          e.preventDefault();

          var isAddToCartButton = e.target.closest(".add-to-cart");

          if (!isAddToCartButton) {
            var productId = product.id;
            window.open(`product.html?id=${productId}`, "_blank");
          }
        });

        productsGrid.appendChild(productElement);

        productCounter++;
      });

      document
        .querySelector(".fa-arrow-left")
        .addEventListener("click", prevSlide);
      document
        .querySelector(".fa-arrow-right-long")
        .addEventListener("click", nextSlide);

      var addToCartButtons = document.querySelectorAll(".add-to-cart");
      addToCartButtons.forEach((button) => {
        button.addEventListener("click", function (event) {
          event.preventDefault();
          var productId = button.getAttribute("data-product-id");
          var productName = button.getAttribute("data-product-name");
          var productPrice = button.getAttribute("data-product-price");
          var productImage = button.getAttribute("data-product-src");

          productData = {
            id: productId,
            name: productName,
            price: productPrice,
            imageUrl: productImage,
          };
          localStorage.setItem(
            `product_${productName}`,
            JSON.stringify(productData)
          );

          updateCartCount();
          alert("Item added to cart!");
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
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

  }

});

// ================================================== Our Products ==================================================

// ================================================== CountDown==================================================

let CountDownDate = new Date("DEC 31, 2023 23:29:29").getTime();

let counter = setInterval(() => {
  let dateNow = new Date().getTime();
  let dateDiff = CountDownDate - dateNow;
  let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);
  document.querySelector(".days").innerHTML = days < 10 ? `0${days}` : days;
  document.querySelector(".hours").innerHTML = hours < 10 ? `0${hours}` : hours;
  document.querySelector(".minutes").innerHTML =
    minutes < 10 ? `0${minutes}` : minutes;
  document.querySelector(".seconds").innerHTML =
    seconds < 10 ? `0${seconds}` : seconds;
  if (dateDiff < 0) {
    clearInterval(counter);
  }
}, 1000);

// ================================================== CountDown==================================================
