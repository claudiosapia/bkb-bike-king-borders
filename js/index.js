//JQUERY
$(document).ready(function () {
  $("nav li a")
    .filter(function () {
      return this.href === location.href;
    })
    .addClass("active");
  //CART
  //if the document is still loading.
  if (document.readyState == "loading") {
    //wait for the entire HTML page to be parsed
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    //fire function ready
    ready();
  }

  function ready() {
    //get all remove items button from cart elements
    const removeCartItemButtons = $(".btn-remove");
    //loop thr class='cart-hr'ough buttons elems
    for (let i = 0; i < removeCartItemButtons.length; i++) {
      const button = removeCartItemButtons[i];
      //click on single button elem to fire removeCartItem function
      $(button).click(removeCartItem);
    }

    //get quantity inputs elements from cart elems
    let quantityInputs = $(".cart-item-quantity");
    //loop thr class='cart-hr'ough elems
    for (let i = 0; i < quantityInputs.length; i++) {
      let input = quantityInputs[i];
      //on change fire function changeQuantity
      $(input).change(changeQuantity);
    }

    //get add to cart buttons
    const addToCartBtn = $(".add-to-cart-btn");
    //loop thr class='cart-hr'ough buttons elems
    for (let i = 0; i < addToCartBtn.length; i++) {
      let button = addToCartBtn[i];
      //click on single button elem to fire addToCart function
      $(button).click(addToCart);
    }
    //when user clicks on button fires purchase function
    $(".btn-purchase").click(purchase);

    //ADD TO CART
    function addToCart(e) {
      //store the btn that triggered event in button letiable
      const button = e.target;
      //target product (second parents element of button)
      const product = $(button).parents()[1];
      // get product title
      const title = $(product).find(".product-title:eq(0)").text();
      //get product price
      const price = $(product).find(".item-price:eq(0)").text();
      //get image src
      const imageSrc = $(product).find(".product-image:eq(0)").attr("src");
      //get value of checked radio button with name of size within div with class 'sizes'
      const size = $(product)
        .find(".input-size[name=size]:checked", ".sizes")
        .val();
      //fire functions:
      addItemToCart(title, price, imageSrc, size);
      updateCartTot();
    }

    //CREATE INSTANCE OF ITEM TO BE ADDED TO CART
    function addItemToCart(title, price, imageSrc, size) {
      //create and store cart row elem in const
      const cartRow = document.createElement("div");
      //add cart row class to div
      $(cartRow).addClass("cart-row row");
      //get cart container elem
      const cartProducts = $(".cart-container")[0];
      //add class container to elem
      $(cartProducts).addClass("container");
      //create content to append to cart row
      if (size !== undefined) {
        let content = ` 
           
 <div class="cart-item cart-column col-md-2 mt-4">
 <hr class='cart-hr ' />
               <span class="title ">${title}</span>
               
               </div> 
               
                <div class="cart-item cart-column col-md-2 mt-4">
                 <hr class='cart-hr' />
                  <img class="cart-item-image img-fluid" src="${imageSrc}" width="150" height="100">
            </div>  <div class="cart-item cart-column col-md-2 mt-4">
             <hr class='cart-hr' />
              <span class="size ">Size ${size}</span></div> 
               <div class="cart-item cart-column col-md-2 mt-4">
                <hr class='cart-hr' />
             <span class="cart-price text-success cart-column">${price}</span></div>
            <div class="cart-quantity cart-column col-md-2 mt-4">
             <hr class='cart-hr' />
                <input class="cart-item-quantity" type="number" value="1">
                </div>

                <div class="col-md-2 mt-4">
                 <hr class='cart-hr' />
            <button class="btn btn-sm btn-remove fa-regular fa-trash-can" type="button"></button>
            </div>  </div>`;

        //add content to cartRow
        $(cartRow).html(content);
        //append cartRow to div
        $(cartProducts).append(cartRow);
        //remove cart item on click firing function
        $(cartRow).find(".btn-remove").click(removeCartItem);
        //change quantity firing changeQuantity function
        $(cartRow).find(".cart-item-quantity").change(changeQuantity);
      } else {
        alert("Please choose product size!");
      }
    }

    //PURCHASE
    function purchase() {
      //alert message to user
      alert("Thank you for your purchase");
      //get cart items first elements
      let itemsToCart = $(".cart-container")[0];
      //while loop -until the node has child nodes
      while (itemsToCart.hasChildNodes()) {
        //remove child element (elem in cart)
        itemsToCart.removeChild(itemsToCart.firstChild);
      }
      //fire function updateCartTot
      updateCartTot();
    }

    //UPDATE CART TOTAL
    function updateCartTot() {
      //get cart container
      let productContainer = $(".cart-container")[0];
      //get cart row within container
      let cartRows = $(productContainer).find(".cart-row");
      //init let tot of 0
      let tot = 0;
      //loop thr class='cart-hr'ough cart rows elems
      for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        //get price element in cart
        let priceElement = $(cartRow).find(".cart-price")[0];
        //get quantity elem in cart
        let quantityEl = $(cartRow).find(".cart-item-quantity")[0];
        //replace parsed value of price elem inner text with empty string to reset tot price value
        let price = parseFloat(priceElement.innerText.replace("£", ""));
        //get value of item quantity
        let quantity = $(quantityEl).val();
        //get total multiplying price with quantity
        tot = tot + price * quantity;
      }
      //round up tot value
      tot = Math.round(tot * 100) / 100;
      //display tot amount value
      $(".cart-total-amount").text("£" + tot);
    }
    //REMOVE CART ITEM
    function removeCartItem(e) {
      //store the btn that triggered event in button letiable
      let button = e.target;
      //remove div.cart-row
      $(button).parent().parent().remove();
      //fire function to update cart total
      updateCartTot();
    }

    //CHANGE QUANTITY
    function changeQuantity(e) {
      //store the input that triggered event in letiable
      let input = e.target;
      //if val of input is not a number or is <= 0 assign val to 1
      if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
      }

      //update total
      updateCartTot();
    }

    //close cart on click
    $cartButton = $(".shopping-cart-span-icon")[1];
    $shoppingCartIcon = $(".shopping-cart-span-icon")[0];

    //create and store cart row elem in const
    const cartRow = $(".cart-row");
    const cartCont = $("cart-content");

    //when entering mouse on cart section
    $(".cart-section ")
      .mouseenter(function () {
        //show cart row
        $(".cart-row").show();
      }) //when mouse leave
      .mouseleave(function () {
        //hide cart row
        $(".cart-row").hide();
      });
  }
});

//NAV FIXED ON SCROLL
// Add a scroll event listener to the window object
$(window).on("scroll", function () {
  // Select the navbar element and store it in a variable
  var navbar = $("#navbar");

  // Log a message to the console to check if the script is executing

  // Check if the user is on a desktop device
  if (window.matchMedia("(min-width: 1200px)").matches) {
    // If the user is on a desktop device and has scrolled past the navbar height,
    // add the "navbar-scrolled" class to the navbar element, otherwise remove the class
    if ($(window).scrollTop() > navbar.height()) {
      navbar.addClass("navbar-scrolled");
    } else {
      navbar.removeClass("navbar-scrolled");
    }
  }
});
