document.addEventListener("DOMContentLoaded", () => {
  const orderForm = document.getElementById("order-form");
  const orderBtn = document.getElementById("order-btn");
  const checkboxes = document.querySelectorAll('input[name="item"]');
  const navLinks = document.querySelectorAll(".navbar ul li a");
  const sections = document.querySelectorAll(".page-section, footer");

  
  const totalContainer = document.createElement("div");
  totalContainer.className = "order-summary";
  totalContainer.style.cssText = `
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 1.2rem;
    font-weight: bold;
    color: #e58e26;
  `;
  totalContainer.innerHTML = `Total Amount: Rs. <span id="total-price">0</span>`;

  // Insert total price summary before order submit button
  orderForm.insertBefore(totalContainer, orderBtn);

  const totalPriceSpan = document.getElementById("total-price");

  // Calculate live total on checkbox toggles
  function calculateTotal() {
    let total = 0;
    checkboxes.forEach((cb) => {
      if (cb.checked) {
        total += parseInt(cb.value, 10);
      }
    });
    totalPriceSpan.textContent = total;
  }

  checkboxes.forEach((cb) => {
    cb.addEventListener("change", calculateTotal);
  });

  
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedItems = [];
    checkboxes.forEach((cb) => {
      if (cb.checked) {
       
        const label = document.querySelector(`label[for="${cb.id}"]`);
        if (label) {
          selectedItems.push(label.textContent);
        }
      }
    });

    if (selectedItems.length === 0) {
      alert(" Please select at least one item from the menu to place an order!");
      return;
    }

    const currentTotal = totalPriceSpan.textContent;
    const orderMessage = `☕ Order Placed Successfully!\n\nSelected Items:\n- ${selectedItems.join(
      "\n- "
    )}\n\nTotal Bill: Rs. ${currentTotal}\n\nThank you for ordering at Espresso Yourself!`;

    alert(orderMessage);

    // Reset Form and calculate back to zero
    orderForm.reset();
    totalPriceSpan.textContent = "0";
  });

  
  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });
});