
function onloadCart() {
  let container = document.getElementById('card-container-in-cart');
  container.innerHTML = "";
  // console.log(container);

  let storedCartItems = localStorage.getItem("cartItems");
  let storedIdOfCards = localStorage.getItem("idOfCards");
  let cartItemsArray = JSON.parse(storedCartItems) || [];
  let idOfCardsArray = JSON.parse(storedIdOfCards) || [];

  // Create a DOMParser instance
  let parser = new DOMParser();

  let p = document.querySelector('body>p');
  p.textContent = `${cartItemsArray.length} Items in your cart`;

  let tbody = document.getElementsByTagName('tbody')[0];

  var totalPrice = 0;
  // Iterate over the cartItemsArray and convert each string to HTML element
  for (let i = 0; i < cartItemsArray.length; i++) {
    // Parse the string as an HTML document
    let parsedHTML = parser.parseFromString(cartItemsArray[i], "text/html");

    // Retrieve the root element of the parsed HTML
    let cartItem = parsedHTML.body.firstChild;
    let priceSpan = parsedHTML.querySelector('.divPS span:first-child');
    let removeButton = document.createElement('button');
    removeButton.className = "removeButton";
    removeButton.textContent = 'X';
    removeButton.addEventListener('click', function () {
      removeCartItem(i);
      console.log(cartItem);
    });
    cartItem.appendChild(removeButton);
    container.append(cartItem);

    // Use the cartItem element as needed (e.g., append it to another container)
    console.log(cartItem);
    container.append(cartItem);
    let tbodyRow = document.createElement('tr');
    let productName = document.createElement('td');
    let productPrice = document.createElement('td');
    productName.textContent = `Item ${i}`;
    productPrice.textContent = priceSpan.innerText;
    let price = parseFloat(priceSpan.innerText.replace('$', ''));
    totalPrice += price;
    tbodyRow.append(productName);
    tbodyRow.append(productPrice);
    tbody.append(tbodyRow);
  }

  let tbodyRow = document.createElement('tr');
  let productName = document.createElement('td');
  let productPrice = document.createElement('td');
  productName.textContent = "Total value";
  productPrice.textContent = "$" + totalPrice;
  tbodyRow.append(productName);
  tbodyRow.append(productPrice);
  tbody.append(tbodyRow);

  // Add event listener to the checkout button
  
}

function removeCartItem(i) {
  let storedCartItems = localStorage.getItem("cartItems");
  let storedIdOfCards = localStorage.getItem("idOfCards");
  let cartItemsArray = JSON.parse(storedCartItems) || [];
  let idOfCardsArray = JSON.parse(storedIdOfCards) || [];

  let parser = new DOMParser();

  cartItemsArray.splice(i, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItemsArray));
  window.location.href = "cart.html"
}


function togglePaymentGateway() {
  let aside = document.getElementById('myAside');
  let main = document.getElementById('myMain');
  let section = document.querySelector('body>section');
  main.style.display = 'none';
  section.style.display = 'block';
}

function toggleMain() {
  let aside = document.getElementById('myAside');
  let main = document.getElementById('myMain');
  let section = document.querySelector('body>section');
  // aside.style.display = 'block';
  main.style.display = 'block';
  section.style.display = 'none';
}
