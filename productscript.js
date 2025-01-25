// Sample product data
const products = [
  {
    name: "Gentle Cleansing Milk",
    price: "$18.99",
    mainImage: "/images/p/product.webp",
    gallery: [
      "/images/p/product.webp",
      "/images/p/product2.webp",
      "/images/p/product3.webp",
    ],
    description:
      "Transform your skincare routine with our Gentle Cleansing Milk, a silky-soft cleanser that nourishes your skin while effortlessly removing makeup & impurities.",
    details:
      "Pamper your skin with a cleanser designed for dry, normal, and mature skin types. The combination of Shea Butter, Argan Oil, Avocado Oil, and Jojoba Oil provides deep hydration, leaving your skin soft and refreshed. Natural ingredients support anti-aging and dehydrated skin concerns, ensuring healthier-looking, radiant skin.",
    howToUse:
      "Apply the cleansing milk to your face and massage gently in circular motions. Rinse off with water. Enjoy instantly clean, refreshed skin without dryness or irritation.",
    ingredients:
      "Shea Butter, Argan Oil, Avocado Oil, Jojoba Oil, Flower extracts for hydration and anti-aging benefits.",
    returnPolicy:
      "If you’re not completely satisfied, returns are accepted within 30 days of purchase. Conditions apply.",
    shopifyConfig: {
      id: "8157601366212", // Shopify product ID
      nodeId: "product-component-1737073245862", // Unique node ID
    },
  },
  // Add other products here
  {
    name: "Brightening Serum",
    price: "$40.00",
    mainImage: "/images/p/brighteningserum1.jpg",
    gallery: [
      "/images/p/brighteningserum1.jpg",
      "/images/p/brighteningserum2.jpg",
      "/images/p/brighteningserum3.jpg",
    ],
    description:
      "Enhance your skincare routine with our Brightening Serum, designed to provide your skin with much-needed hydration and a dose of powerful actives that support younger-looking skin. The serum's light and quick-absorbing texture leaves your skin feeling dewy, fresh, and radiant.",
    details:
      "Whether you're a skincare enthusiast or a minimalist, this serum seamlessly fits into your daily routine. It hydrates and replenishes the skin, making it appear smoother and feel firmer. Ideal for all skin types, especially dehydrated or mature skin, it offers anti-aging benefits while leaving the skin comfortable and plump.",
    howToUse:
      "Apply to clean skin as part of your morning or evening routine. Massage gently onto the face and neck until fully absorbed. For best results, follow with Anti-Age Day Cream and Smoothing Eye Cream.",
    ingredients:
      "Sodium PCA, Hyaluronic Acid, Sunflower Oil, and other active ingredients to deeply hydrate and support a youthful appearance.",
    returnPolicy:
      "If you’re not completely satisfied, returns are accepted within 30 days of purchase. Conditions apply.",
    shopifyConfig: {
      id: "8160690471108", // Shopify product ID
      nodeId: "product-component-1737073528737", // Unique node ID
    },
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("productContainer");
  if (!productContainer) {
    console.error(
      "Product container not found. Ensure the HTML has an element with id='productContainer'."
    );
    return;
  }

  let shopifyScriptLoaded = false;

  // Function to load Shopify script only once
  function loadShopifyScript(callback) {
    if (shopifyScriptLoaded) {
      callback();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
    script.async = true;
    script.onload = () => {
      shopifyScriptLoaded = true;
      callback();
    };
    document.head.appendChild(script);
  }

  // Function to generate product components
  function generateProductComponent(product) {
    // Create product card
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
        <img src="${product.mainImage}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <a><button class="view-product-btn">View Product</button></a>
      `;
    productContainer.appendChild(productCard);

    // Create popup for the product
    const popup = document.createElement("div");
    popup.classList.add("popup", "hidden");
    popup.innerHTML = `
        <div class="popup-content">
          <button class="close-btn">&times;</button>
          <div class="popup-cont">
            <div class="flex-left">
              <div class="gallery">
                <div class="main-image">
                  <button class="arrow left-arrow">◀</button>
                  <img class="current-image" src="${product.gallery[0]}" alt="${
      product.name
    }" />
                  <button class="arrow right-arrow">▶</button>
                </div>
                <div class="thumbnails">
                  ${product.gallery
                    .map(
                      (img, index) =>
                        `<img class="thumbnail ${
                          index === 0 ? "active" : ""
                        }" src="${img}" alt="Image ${index + 1}" />`
                    )
                    .join("")}
                </div>
              </div>
            </div>
            <div class="flex-left">
              <h2>${product.name}</h2>
              <p><strong>${product.price}</strong></p>
              <div id="${
                product.shopifyConfig.nodeId
              }" class="shopify-add-to-cart"></div>
              <p>${product.description}</p>
              <div class="faq-section">
                <div class="faq-item">
                  <div class="faq-question"><span>Details</span><i class="faq-icon">+</i></div>
                  <div class="faq-answer">${product.details}</div>
                </div>
                <div class="faq-item">
                  <div class="faq-question"><span>How to Use</span><i class="faq-icon">+</i></div>
                  <div class="faq-answer">${product.howToUse}</div>
                </div>
                <div class="faq-item">
                  <div class="faq-question"><span>Ingredients</span><i class="faq-icon">+</i></div>
                  <div class="faq-answer">${product.ingredients}</div>
                </div>
                <div class="faq-item">
                  <div class="faq-question"><span>Return Policy</span><i class="faq-icon">+</i></div>
                  <div class="faq-answer">${product.returnPolicy}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    productContainer.appendChild(popup);

    // Lazy-load Shopify Buy Button on interaction
    const initializeBuyButton = () => {
      const buttonNode = document.getElementById(product.shopifyConfig.nodeId);

      // Check if the button is already initialized
      if (buttonNode.dataset.initialized === "true") {
        return;
      }

      loadShopifyScript(() => {
        addShopifyBuyButton(product.shopifyConfig);
        buttonNode.dataset.initialized = "true"; // Mark the button as initialized
      });
    };

    // Event listeners for toggling the popup
    const viewProductBtn = productCard.querySelector(".view-product-btn");
    const closeBtn = popup.querySelector(".close-btn");

    viewProductBtn.addEventListener("click", () => {
      popup.classList.remove("hidden");
      initializeBuyButton(); // Load the Buy Button when popup is opened
    });

    closeBtn.addEventListener("click", () => {
      popup.classList.add("hidden");
    });

    // FAQ Toggle
    const faqItems = popup.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      const icon = item.querySelector(".faq-icon");

      question.addEventListener("click", () => {
        answer.classList.toggle("open");
        icon.textContent = icon.textContent === "+" ? "-" : "+";
      });
    });

    // Gallery functionality
    const thumbnails = popup.querySelectorAll(".thumbnail");
    const currentImage = popup.querySelector(".current-image");
    const prevButton = popup.querySelector(".left-arrow");
    const nextButton = popup.querySelector(".right-arrow");

    let currentIndex = 0;

    function updateMainImage(index) {
      currentImage.src = product.gallery[index];
      thumbnails.forEach((thumbnail, idx) => {
        thumbnail.classList.toggle("active", idx === index);
      });
    }

    prevButton.addEventListener("click", () => {
      currentIndex =
        (currentIndex - 1 + product.gallery.length) % product.gallery.length;
      updateMainImage(currentIndex);
    });

    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % product.gallery.length;
      updateMainImage(currentIndex);
    });

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        currentIndex = index;
        updateMainImage(currentIndex);
      });
    });

    updateMainImage(currentIndex);
  }

  // Function to add Shopify Buy Button with custom styles
  function addShopifyBuyButton(config) {
    const client = ShopifyBuy.buildClient({
      domain: "fa96d6-fb.myshopify.com",
      storefrontAccessToken: "edddb495782607d40890b645520e4a13",
    });

    ShopifyBuy.UI.onReady(client).then((ui) => {
      ui.createComponent("product", {
        id: config.id,
        node: document.getElementById(config.nodeId),
        moneyFormat: "%24%7B%7Bamount%7D%7D",
        options: {
          product: {
            styles: {
              product: {
                "@media (min-width: 601px)": {
                  "max-width": "calc(25% - 20px)",
                  "margin-left": "20px",
                  "margin-bottom": "50px",
                },
              },
              button: {
                "font-family": "Arvo, serif",
                "font-weight": "bold",
                "font-size": "18px",
                "padding-top": "17px",
                "padding-bottom": "17px",
                ":hover": {
                  "background-color": "#e69d00",
                },
                "background-color": "#ffae00",
                ":focus": {
                  "background-color": "#e69d00",
                },
                "border-radius": "40px",
                color: "#ffffff",
                "text-transform": "uppercase",
              },
            },
            contents: {
              img: false,
              title: false,
              price: false,
            },
            text: {
              button: "Add to cart",
            },
            googleFonts: ["Arvo"],
          },
        },
      });
    });
  }

  // Generate components for all products
  products.forEach(generateProductComponent);
});
