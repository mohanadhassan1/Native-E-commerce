const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_;\@$!%*?&])[A-Za-z\d\-_;@$!%*?&]{8,}$/;

// At least 8 characters long
// Contains at least one uppercase letter
// Contains at least one lowercase letter
// Contains at least one digit (0-9)
// Contains at least one special character e.g. (-, _, ;, @, $, !, %, *, ?, or &).

document.addEventListener("DOMContentLoaded", async function () {
  fetch("data.json")
    .then((response) => response.json())
    .then((users) => {
      document
        .getElementById("register")
        .addEventListener("click", async function () {
          const name = document.getElementById("name").value;
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;

          if (name == "" || email == "" || password == "") {
            alert("Please enter your details below");
            return;
          }

          if (!emailRegex.test(email) || !passwordRegex.test(password)) {
            alert("Invalid email or password");
            return;
          }

          const emailExists = users.some((user) => user.email === email);
          if (emailExists) {
            alert("Email is already registered");
            return;
          }

          const id = users.length + 1;

          const newUser = {
            id,
            name,
            email,
            password,
          };

          users.push(newUser);
          console.log(users);

          localStorage.setItem(newUser.email, JSON.stringify(newUser));
          alert("you have registered successfully. ");
        });
    });

  var cartCountElement = document.querySelector(".cart-count");
  var storedCartCount = localStorage.getItem("cartCount");

  if (storedCartCount !== null) {
    // Update the cart count element with the stored count
    cartCountElement.innerText = storedCartCount;
  } else {
    // Initialize the cart count and update the element
    updateCartCount();
  }
});

document.getElementById("login").addEventListener("click", () => {
  window.open("Login.html", "_self");
});