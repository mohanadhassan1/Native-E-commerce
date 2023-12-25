document.getElementsByClassName("btn")[0].addEventListener("click", () => {
  if (localStorage.getItem("userData") === null) {
    alert("you need to be logged in");
    window.open("login.html", "_self");
    return;
  }

  const country = document.getElementById("country");
  const first_name = document.getElementById("fName");
  const last_name = document.getElementById("lName");
  const company_name = document.getElementById("cName");
  const address = document.getElementById("addr");

  if (country.value == "" || first_name.value == "" || last_name.value == "" || company_name.value == "" || address.value == "") {
    alert("Please enter your details below");
    return;
  }
  
  // Iterate through local storage keys
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);

    // Check if the key starts with "product_"
    if (key.startsWith("product_")) {
      localStorage.removeItem(key);
      localStorage.setItem("cartCount", 0);
    }
    window.open("index.html", "_self");
  }
});


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