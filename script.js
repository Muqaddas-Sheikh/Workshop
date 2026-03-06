const form = document.getElementById("registrationForm");
const message = document.getElementById("message");
const workshopDays = document.getElementById("workshopDays");
const priceDisplay = document.getElementById("priceDisplay");

// Price mapping
const priceMap = {1: 100, 2: 150, 3: 200};

workshopDays.addEventListener("change", () => {
  const days = parseInt(workshopDays.value);
  const price = priceMap[days] || 0;
  priceDisplay.innerText = `Price: ${price} PKR`;
});

// Clipboard icon copy
document.querySelectorAll(".copy-icon").forEach(icon => {
  icon.style.cursor = "pointer";
  icon.addEventListener("click", () => {
    const text = icon.getAttribute("data-copy");
    navigator.clipboard.writeText(text).then(() => {
      const tooltip = document.createElement("span");
      tooltip.innerText = "Copied!";
      tooltip.style.position = "absolute";
      tooltip.style.background = "#2c1f18";
      tooltip.style.color = "#f5e9de";
      tooltip.style.padding = "2px 6px";
      tooltip.style.borderRadius = "4px";
      tooltip.style.fontSize = "12px";
      icon.parentElement.appendChild(tooltip);
      setTimeout(() => tooltip.remove(), 1000);
    });
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const days = parseInt(workshopDays.value);
  const price = priceMap[days] || 0;

  const formData = new FormData();
  formData.append("firstName", document.getElementById("firstName").value);
  formData.append("lastName", document.getElementById("lastName").value);
  formData.append("email", document.getElementById("email").value);
  formData.append("phone", document.getElementById("phone").value);
  formData.append("reason", document.getElementById("reason").value);
  formData.append("workshopDays", days);
  formData.append("price", price);
  formData.append("receipt", document.getElementById("receipt").files[0]);

  try {
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      message.style.color = "lightgreen";
      message.innerText = "Registration successful!";
      form.reset();
      priceDisplay.innerText = "Price: 0 PKR";
    } else {
      message.style.color = "red";
      message.innerText = data.message || "Registration failed!";
    }
  } catch (err) {
    message.style.color = "red";
    message.innerText = "Error: " + err.message;
  }
});