function toggleForms() {
  document.getElementById("registerForm").classList.toggle("active");
  document.getElementById("loginForm").classList.toggle("active");
  document.getElementById("statusMessage").style.opacity = "0";

  // Clear inputs
  document.querySelectorAll("input").forEach((input) => (input.value = ""));
}

function showMessage(message, color = "var(--cyber-teal)") {
  const status = document.getElementById("statusMessage");
  status.style.color = color;
  status.textContent = message;
  status.style.opacity = "1";
  setTimeout(() => (status.style.opacity = "0"), 3000);
}

function handleLogin() {
  const inputs = document.querySelectorAll("#loginForm input");
  const id = inputs[0].value.trim();
  const key = inputs[1].value.trim();

  if (!id || !key) {
    showMessage("Please fill in both fields", "red");
    return;
  }

  showMessage("Decrypting and logging in...");

  setTimeout(() => {
    const redirectPage = localStorage.getItem("redirectAfterLogin") || "index.html";
    localStorage.removeItem("redirectAfterLogin");
    window.location.href = redirectPage;
  }, 1000);
}

function handleRegister() {
  const inputs = document.querySelectorAll("#registerForm input");
  const id = inputs[0].value.trim();
  const key = inputs[1].value.trim();

  if (!id || !key) {
    showMessage("All fields are required", "red");
    return;
  }

  showMessage("Identity generated successfully");

  setTimeout(() => {
    toggleForms();
  }, 1000);
}
