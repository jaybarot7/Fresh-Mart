document.addEventListener("DOMContentLoaded", (event) => {
  const searchInput = document.getElementById("faq-search");
  const faqQuestions = document.querySelectorAll(".faq-question");
  const faqAnswers = document.querySelectorAll(".faq-answer");

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();

    faqQuestions.forEach((question, index) => {
      const answer = faqAnswers[index];
      if (
        question.textContent.toLowerCase().includes(searchTerm) ||
        answer.textContent.toLowerCase().includes(searchTerm)
      ) {
        question.style.display = "block";
        answer.style.display = "block";
      } else {
        question.style.display = "none";
        answer.style.display = "none";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", (event) => {
  const searchInput = document.getElementById("faq-search");
  const faqCategories = document.querySelectorAll(".faq-category");

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();

    faqCategories.forEach((category) => {
      let hasMatch = false;
      const questions = category.querySelectorAll(".faq-question");
      const answers = category.querySelectorAll(".faq-answer");

      questions.forEach((question, index) => {
        const answer = answers[index];
        if (
          question.textContent.toLowerCase().includes(searchTerm) ||
          answer.textContent.toLowerCase().includes(searchTerm)
        ) {
          hasMatch = true;
          question.style.display = "block";
          answer.style.display = "block";
        } else {
          question.style.display = "none";
          answer.style.display = "none";
        }
      });

      // If the category has no matching Q&A, hide the category header
      const categoryHeader = category.querySelector("h2");
      if (hasMatch) {
        categoryHeader.style.display = "block";
      } else {
        categoryHeader.style.display = "none";
      }
    });
  });
});
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// open cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};
// close cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // add to cart
  var addCart = document.getElementsByClassName("cart-btn");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  // buy button
  document
    .getElementsByClassName("button-buy")[0]
    .addEventListener("click", buyButtonClicked);
}
//function for buy button
function buyButtonClicked() {
  alert("Your order is placed");
  var cartContent = document.querySelector(".cart-content");
  while (cartContent.firstChild) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

function quantityChanged(event) {
  var input = event.target; // Get the input element that triggered the event
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1; // Reset to 1 if an invalid quantity is entered
  }
  updateTotal(); // Update total price after changing the quantity
}

function addCartClicked(event) {
  event.preventDefault(); // Prevent default action
  var button = event.target;
  var productBox = button.parentElement;
  var title = productBox.querySelector(".product-title").innerText;
  var price = productBox.querySelector(".price").innerText;
  var productImg = productBox.querySelector(".product-img").src;

  addProductToCart(title, price, productImg); // Add the product to the cart
}

// Add event listeners to all add-cart icons
var addCartButtons = document.querySelectorAll(".cart-btn");
addCartButtons.forEach(function (button) {
  button.addEventListener("click", addCartClicked);
});

// Function to add product to cart
function addProductToCart(title, price, productImg) {
  var cartContent = document.querySelector(".cart-content");
  var cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");

  var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" name="cart" class="cart-quantity">      
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>
    `;
  cartBox.innerHTML = cartBoxContent;

  cartContent.appendChild(cartBox);

  // Add event listeners for remove and quantity change
  cartBox
    .querySelector(".cart-remove")
    .addEventListener("click", removeCartItem);
  cartBox
    .querySelector(".cart-quantity")
    .addEventListener("change", quantityChanged);

  updateTotal(); // Update total price after adding the product
}

// Function to update the total price in the cart
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value; // Parse as integer

    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100; // Round to 2 decimal places
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
