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