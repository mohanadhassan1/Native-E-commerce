const keys = Object.keys(localStorage);

// Create an array to store the product data
let listCards = [];

// Iterate through keys and get product data
keys.forEach((key) => {
  if (key.startsWith("product_")) {
    const productData = JSON.parse(localStorage.getItem(key));
    listCards.push(productData);
  }
});
listCards.forEach((product) => {
  // console.log(product);
});

var table = document.getElementById("cartTable");
var subtotalSpan = document.getElementById("subtotalValue");
var totalSpan = document.getElementById("totalValue");

function renderTable() {
  // Clear existing table rows
  table.innerHTML = `<tr class="headviewProduct">
                            <th class="imgOfProduct">Product</th>
                            <th class="priceOfProduct">Price</th>
                            <th class="quantityOfProduct">Quantity</th>
                            <th class="subtotalOfProduct">Subtotal</th>
                        </tr>`;

  listCards.forEach(function (product) {
    var row = table.insertRow(-1);

    // Add cells to the row
    var imgCell = row.insertCell(0);
    imgCell.innerHTML =
      '<img src="' +
      product.imageUrl +
      '" title="' +
      product.name +
      '" alt="' +
      product.name +
      '"><p>' +
      product.name +
      "</p>";

    var priceCell = row.insertCell(1);
    priceCell.textContent = product.price;

    var quantityCell = row.insertCell(2);
    quantityCell.innerHTML = `  <td class="quantityOfProduct">
                                <div class="countNum">
                                    <div class="number">1</div>
                                    <div class="quantityBorder">
                                        <button class="plus"><i
                                                class="fa-solid fa-chevron-up"></i></button>
                                        <button class="minus"><i
                                                class="fa-solid fa-chevron-down"></i></button>
                                    </div>
                                </div>
                            </td> `;

    var subtotalCell = row.insertCell(3);
    let price = parseFloat(product.price.replace("$", ""));
    subtotalCell.textContent = "$" + (price * 1).toFixed(2); // Assuming default quantity is 1

    // Add event listeners for the plus and minus buttons within each row
    var plusButton = quantityCell.querySelector(".plus");
    var minusButton = quantityCell.querySelector(".minus");

    plusButton.addEventListener("click", function () {
      var numberElement = quantityCell.querySelector(".number");
      var currentNumber = parseInt(numberElement.innerHTML);
      numberElement.innerHTML = currentNumber + 1;
      updateSubtotal(row, price, currentNumber + 1);
      updateTotal();
    });

    minusButton.addEventListener("click", function () {
      var numberElement = quantityCell.querySelector(".number");
      var currentNumber = parseInt(numberElement.innerHTML);
      if (currentNumber > 0) {
        numberElement.innerHTML = currentNumber - 1;
        updateSubtotal(row, price, currentNumber - 1);
        updateTotal();
      }
      console.log(localStorage.getItem("cartCount"));

      // Remove the product when its quantity becomes 0
      if (currentNumber - 1 === 0) {
        removeProduct(product);
        row.remove();
        localStorage.setItem(
          "cartCount",
          localStorage.getItem("cartCount") - 1
        );

        // Cart Count
        var cartCountElement = document.querySelector(".cart-count");
        var storedCartCount = localStorage.getItem("cartCount");

        if (storedCartCount !== null) {
          // Update the cart count element with the stored count
          cartCountElement.innerText = storedCartCount;
        } else {
          // Initialize the cart count and update the element
          alert("No product in the cart")
        }
      }
    });
  });

  updateTotal();
}

function removeProduct(product) {
  // Assuming your products have unique identifiers, e.g., productId
  var productName = product.name;
  var productKey = "product_" + productName;

  // Remove the product from localStorage
  localStorage.removeItem(productKey);
}

function updateSubtotal(row, price, quantity) {
  var subtotalCell = row.cells[3];
  subtotalCell.textContent = (price * quantity).toFixed(2) + "$";
}

function updateTotal() {
  var total = 0;
  var rows = table.getElementsByTagName("tr");
  for (var i = 1; i < rows.length; i++) {
    var subtotal = parseFloat(rows[i].cells[3].textContent.replace("$", ""));
    total += subtotal;
  }
  subtotalSpan.textContent = total.toFixed(2) + "$";
  totalSpan.textContent = total.toFixed(2) + "$";
}

// Call renderTable to initialize the table and totals
renderTable();

function checkout() {
  location.replace("checkout.html");
}

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