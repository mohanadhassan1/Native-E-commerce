var xhr = new XMLHttpRequest();
xhr.open("get", "../data.json", true);
xhr.send();

xhr.addEventListener("load", function () {
  var users = JSON.parse(xhr.response);

  document.getElementById("login").addEventListener("click", () => {
    var isValid = false;

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email == "" || password == "") {
      alert("Please enter your details below");
      return;
    }

    users.forEach((user) => {
      if (email == user.email && password == user.password) {
        isValid = true;
        isLoggedIn = true;

        localStorage.setItem("userData", JSON.stringify(user));

        // Append user data to the URL
        window.location.href = "index.html?";
      }
    });

    if (!isValid) {
      alert("Invalid email or password");
    }
  });
});
