// Get all the product cards
const products = document.querySelectorAll(".card");

// Handle sorting
function handleSort() {
  // Get the current sort value and search value
  const sortValue = document.querySelector("#sort-select").value;
  const searchValue = document
    .querySelector("#search-input")
    .value.toLowerCase();

  // Create a copy of the products array
  let sortedProducts = [...products];

  // Filter the products array based on the search value
  if (searchValue) {
    sortedProducts = sortedProducts.filter((product) => {
      const title = product
        .querySelector(".product-title")
        .textContent.toLowerCase();
      return title.includes(searchValue);
    });
  }

  // Sort the products array based on the selected sort value
  if (sortValue === "price-low-high") {
    sortedProducts = sortedProducts.sort((a, b) => {
      const priceA = parseFloat(
        a.querySelector(".item-price").textContent.substring(1)
      );
      const priceB = parseFloat(
        b.querySelector(".item-price").textContent.substring(1)
      );
      return priceA - priceB;
    });
  } else if (sortValue === "price-high-low") {
    sortedProducts = sortedProducts.sort((a, b) => {
      const priceA = parseFloat(
        a.querySelector(".item-price").textContent.substring(1)
      );
      const priceB = parseFloat(
        b.querySelector(".item-price").textContent.substring(1)
      );
      return priceB - priceA;
    });
  }
  // Generate the HTML for each product card
  const productsHTML = sortedProducts
    .map((product, index) => {
      // Determine if this is the first card in a row
      const isFirstInRow = index % 3 === 0 ? "first-in-row" : "";
      let colClass;
      if (sortedProducts.length === 1) {
        colClass = "col-12";
      } else if (sortedProducts.length === 2) {
        colClass = "col-6 mb-4";
      } else {
        colClass = "col-md-4 col-lg-3 mb-4";
      }
      // Generate the HTML for the product card
      return `
<div class="${colClass} mb-4">
        <div class="card text-center">
          <img class="card-img-top product-image" src="${product
            .querySelector(".product-image")
            .getAttribute("src")}" alt="${
        product.querySelector(".product-title").textContent
      }">
          <div class="card-body">
            <h4 class="product-title">${
              product.querySelector(".product-title").textContent
            }</h4>
            <h4 class="item-price">${
              product.querySelector(".item-price").textContent
            }</h4>
            <div class="sizes mt-3">
              <h6 class="size">Size</h6>
              <label class="radio">
                <input class="input-size" type="radio" name="size" value="S" />
                <span>S</span>
              </label>
              <label class="radio">
                <input class="input-size" type="radio" name="size" value="M" />
                <span>M</span>
              </label>
              <label class="radio">
                <input class="input-size" type="radio" name="size" value="L" />
                <span>L</span>
              </label>
            </div>
            <div class="star-rating">
              <ul class="list-inline">
                <li class="list-inline-item"><i class="fa fa-star"></i></li>
                <li class="list-inline-item"><i class="fa fa-star"></i></li>
                <li class="list-inline-item"><i class="fa fa-star"></i></li>
                <li class="list-inline-item"><i class="fa fa-star"></i></li>
                <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
              </ul>
              <p class="text-muted mb-0">(4 reviews)</p>
            </div>
            <button class="btn btn-primary btn-block mt-3 add-to-cart" type="button">Add to cart</button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  // Replace the current product cards with the new HTML
  const cards = document.querySelector("#cards");
  cards.innerHTML = productsHTML;
}

// Attach event listener for sorting select
const sortSelect = document.querySelector("#sort-select");
sortSelect.addEventListener("change", handleSort);

// Attach event listener for search input
const searchInput = document.querySelector("#search-input");
searchInput.addEventListener("input", handleSort);
