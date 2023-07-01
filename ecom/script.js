function getSignedUp() {
  let signUpUsername = document.getElementById("signup-Username-input");
  let signUpEmail = document.getElementById("signup-email-input");
  let signUpPassword = document.getElementById("signup-pass-input");
  let signUpConfirmPassword = document.getElementById("signup-pass-conf-input");
  let insideSignUpP = document.querySelector(
    "div#main-container>div#signup-btn>p"
  );

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (
    signUpUsername.value !== "" &&
    signUpEmail.value !== "" &&
    signUpPassword !== "" &&
    signUpConfirmPassword !== "" &&
    signUpPassword.value === signUpConfirmPassword.value
  ) {
    let usersObj = {
      name: `${signUpUsername.value}`,
      email: `${signUpEmail.value}`,
      password: `${signUpPassword.value}`,
    };

    let existingUser = users.find(function (user) {
      return user.email === usersObj.email;
    });

    if (existingUser) {
      // User with the same email already exists, handle the error
      alert("User with this email already exists.");
      signUpUsername.value = "";
      signUpEmail.value = "";
      signUpPassword.value = "";
      signUpConfirmPassword.value = "";
    } else {
      insideSignUpP.innerText = "success: Your account has been created!!";
      insideSignUpP.style.color = "green";
      users.push(usersObj);
      localStorage.setItem("users", JSON.stringify(users));
      setTimeout(() => {
        insideSignUpP.innerText = "";
        window.location.href = "index.html";
      }, 1500);
    }
  } else if (
    signUpUsername.value === "" ||
    signUpEmail.value === "" ||
    signUpPassword === "" ||
    signUpConfirmPassword === ""
  ) {
    alert("All fields are required!!");
  } else {
    alert("Error: Password mismatch!!");
  }
}

function logIn() {
  let logInEmail = document.getElementById("login-email-input");
  let logInPassword = document.getElementById("login-pass-input");
  let insideloginP = document.querySelector("div#main-container>div#login-btn>p");
  var users = JSON.parse(localStorage.getItem("users")) || [];

  var foundUser = users.find(function (user) {
    return user.email === logInEmail.value;
  });

  if (foundUser) {
    if (foundUser.password === logInPassword.value) {
      // User is authenticated, proceed with login
      insideloginP.innerText = "Success: You have logged in successfully!";
      insideloginP.style.color = "green";

      // Create currentUser object
      var currentUser = {
        name: foundUser.name,
        email: foundUser.email,
        password: foundUser.password,
        token: "your_token_value" // Replace with actual token value or generate one
      };

      // Store currentUser object in localStorage
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      setTimeout(() => {
        insideloginP.innerText = "";
        window.location.href = "home.html";
      }, 1000);
    } else {
      // Password does not match
      alert("Error: Email/password mismatch!");
      logInEmail.value = "";
      logInPassword.value = "";
    }
  } else {
    // User with the entered email does not exist
    alert("Please sign up with us!");
    setTimeout(() => {
      window.location.href = "signup.html";
    }, 1000);
  }
}


let cards = [];
let cartItems = [];
let idOfCards = [];

let sliderContainerMen = document.querySelector("#slider-container-mens");
let sliderContainerWomen = document.querySelector("#slider-container-womens");
let sliderContainerJewellery = document.querySelector(
  "#slider-container-Jewelley"
);
let sliderContainerElectronics = document.querySelector(
  "#slider-container-Electronics"
);

// fetching the products
function fetchingAPI() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      cards = [...data];
      makeCardAndPutItAtRightElement(cards);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

// console.log(sliderContainerMen);

function makeCardAndPutItAtRightElement(data) {
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    data[i].colors = ["Red", "Blue", "Black"];
    data[i].size = ["S", "M", "L", "XL"];

    let div = document.createElement("div");
    div.className = "card";
    div.classList.add(data[i].category.split(" ")[0]);
    div.id = data[i].id;

    let image = document.createElement("img");
    image.src = data[i].image;

    let divPS = document.createElement("div");
    divPS.className = "divPS";

    let price = document.createElement("span");
    price.innerText = `$${data[i].price}`;

    let size = document.createElement("span");
    size.innerText = `Size: ${data[i].size[Math.floor(Math.random() * 4)]}`;

    divPS.append(price);
    divPS.append(size);

    let colorP = document.createElement("p");
    colorP.id = "color-p";
    let colorSpan = document.createElement("span");
    colorSpan.id = "color-dot";
    let randomColor =
      data[i].colors[Math.floor(Math.random() * data[i].colors.length)];
    colorSpan.style.backgroundColor = randomColor;
    colorP.textContent = "Color: ";
    colorP.appendChild(colorSpan);

    let divForStar = document.createElement("div");
    divForStar.className = "divForStar";
    let divForStarLeft = document.createElement("div");
    divForStarLeft.className = "divForStarLeft";
    let divForStarRight = document.createElement("div");
    divForStarRight.className = "divForStarRight";
    var ratingP = document.createElement("p");
    ratingP.id = "start-p";
    ratingP.textContent = "Rating: ";
    var ratingSpan = document.createElement("span");
    let peopleRated = document.createElement("p");
    peopleRated.textContent = `${data[i].rating.count} Ratings`;
    var rating = Math.floor(data[i].rating.rate);
    for (var j = 0; j < rating; j++) {
      let starElement = document.createElement("img");
      starElement.className = "star";
      starElement.src = "./star.png";
      ratingSpan.appendChild(starElement);
    }
    divForStarLeft.append(ratingP);
    divForStarLeft.append(ratingSpan);
    divForStarRight.append(peopleRated);
    divForStar.append(divForStarLeft);
    divForStar.append(divForStarRight);

    let buttonAddToCart = document.createElement("button");
    buttonAddToCart.type = "submit";
    buttonAddToCart.className = "buttonAddToCart";
    buttonAddToCart.innerText = "Add To Cart";
    
    div.append(image);
    div.append(divPS);
    div.append(colorP);
    div.append(divForStar);
    div.append(buttonAddToCart);

    buttonAddToCart.addEventListener("click", function (event) {
      console.log(event.target.parentNode.outerHTML);
      cartItems.push(event.target.parentNode.outerHTML);
      idOfCards.push(div.id)
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("idOfCards", JSON.stringify(idOfCards));
      alert("Item added to cart")
    });
    
    if (div.classList[1] === "men's") {
      sliderContainerMen.append(div);
    } else if (div.classList[1] === "women's") {
      sliderContainerWomen.append(div);
    } else if (div.classList[1] === "jewelery") {
      sliderContainerJewellery.append(div);
    } else if (div.classList[1] === "electronics") {
      sliderContainerElectronics.append(div);
    }
  }
}

let firstP = document.getElementById("first-p");
let divMenClothing = document.getElementById("mens-clothing");
let secondP = document.getElementById("second-p");
let divWomenClothing = document.getElementById("womens-clothing");
let thirdP = document.getElementById("third-p");
let divJewellery = document.getElementById("Jewellery");
let forthP = document.getElementById("forth-p");
let divElectronics = document.getElementById("Electronics");

function showAll() {
  document.getElementById("slider-container-mens").innerHTML = "";
  document.getElementById("slider-container-womens").innerHTML = "";
  document.getElementById("slider-container-Jewelley").innerHTML = "";
  document.getElementById("slider-container-Electronics").innerHTML = "";
  makeCardAndPutItAtRightElement(cards);
}

function showMens() {
  showAll();
  firstP.style.display = "block";
  divMenClothing.style.display = "block";
  secondP.style.display = "none";
  divWomenClothing.style.display = "none";
  thirdP.style.display = "none";
  divJewellery.style.display = "none";
  forthP.style.display = "none";
  divElectronics.style.display = "none";
}

function showWomens() {
  showAll();
  firstP.style.display = "none";
  divMenClothing.style.display = "none";
  secondP.style.display = "block";
  divWomenClothing.style.display = "block";
  thirdP.style.display = "none";
  divJewellery.style.display = "none";
  forthP.style.display = "none";
  divElectronics.style.display = "none";
}

function showJewellery() {
  showAll();
  firstP.style.display = "none";
  divMenClothing.style.display = "none";
  secondP.style.display = "none";
  divWomenClothing.style.display = "none";
  thirdP.style.display = "block";
  divJewellery.style.display = "block";
  forthP.style.display = "none";
  divElectronics.style.display = "none";
}

function showElectronics() {
  showAll();
  firstP.style.display = "none";
  divMenClothing.style.display = "none";
  secondP.style.display = "none";
  divWomenClothing.style.display = "none";
  thirdP.style.display = "none";
  divJewellery.style.display = "none";
  forthP.style.display = "block";
  divElectronics.style.display = "block";
}

// Get the "Apply Filter" button element
var applyFilterBtn = document.querySelector(
  '#aside-five button[type="submit"]'
);

// Add a click event listener to the button
applyFilterBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission

  // Get selected color values
  var selectedColors = Array.from(
    document.querySelectorAll('input[name="color"]:checked')
  ).map(function (colorInput) {
    return colorInput.value;
  });

  // Get selected size values
  var selectedSizes = Array.from(
    document.querySelectorAll('input[name^="size"]:checked')
  ).map(function (sizeInput) {
    return sizeInput.value;
  });

  // Get selected rating value
  var selectedRating = document.querySelector("#rating").value;

  // Get selected price range values
  var selectedPriceRanges = Array.from(
    document.querySelectorAll('input[name^="PriceRange"]')
  )
    .filter(function (priceRangeInput) {
      return priceRangeInput.checked;
    })
    .map(function (priceRangeInput) {
      return priceRangeInput.value;
    });

  // Filter and display the cards based on the selected options
  var cards = document.querySelectorAll(".card");
  cards.forEach(function (card) {
    var cardColorDot = card.querySelector("#color-dot").style.backgroundColor;
    var cardSizeOfProduct = card
      .querySelector(".divPS span:nth-child(2)")
      .innerText.split(": ")[1];
    var cardRating = card.querySelector(
      ".divForStarLeft span"
    ).childElementCount;
    var cardPrice = parseFloat(
      card.querySelector(".divPS span:first-child").innerText.substring(1)
    );

    // Check if the card matches the selected filters
    var matchesFilter = false;

    // Check colors
    if (selectedColors.length === 0 || selectedColors.includes(cardColorDot)) {
      matchesFilter = true;
    }

    // Check sizes
    if (
      selectedSizes.length === 0 ||
      selectedSizes.includes(cardSizeOfProduct)
    ) {
      matchesFilter = true;
    }

    // Check rating
    if (selectedRating === 0 || cardRating >= selectedRating) {
      matchesFilter = true;
    }

    // Check price range
    if (selectedPriceRanges.length === 0) {
      matchesFilter = true;
    } else {
      var priceMatch = selectedPriceRanges.some(function (priceRange) {
        switch (priceRange) {
          case "0-25":
            return cardPrice >= 0 && cardPrice <= 25;
          case "25-50":
            return cardPrice > 25 && cardPrice <= 50;
          case "50-100":
            return cardPrice > 50 && cardPrice <= 100;
          case "100plus":
            return cardPrice > 100;
          default:
            return false;
        }
      });

      if (priceMatch) {
        matchesFilter = true;
      }
    }

    // Show or hide the card based on the filter result
    if (matchesFilter) {
      card.style.display = "normal";
    } else {
      card.style.display = "none";
    }
  });
});

//--------------------------Adding cart items

// function addingElementToCartItem(e) {
//   // Retrieve existing cart items from localStorage
//   const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
  
//   // Add the new element to the cart items array
//   console.log(e);
//   storedCartItems.push(e);
//   console.log(storedCartItems)
  
//   // Update the localStorage value
//   localStorage.setItem('cartItems', JSON.stringify(storedCartItems));
// }

// function addItemToCart() {
//   let container = document.getElementById("#card-container-in-cart");
//   const getCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//   console.log(getCartItems);
// }
