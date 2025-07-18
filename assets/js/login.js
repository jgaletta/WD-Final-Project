document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username"); // To manage user session
  if (username) window.location.href = "game.html"; // Skip login
  const form = document.getElementById("login-form");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const pError = document.getElementById("div-error").firstElementChild;

    try {
      showLoader();
      const isLoginValid = await login(username, password);
      hideLoader();
      if (isLoginValid) {
        pError.classList.remove("error-message");
        pError.classList.add("success-message");
        pError.textContent = "✅ Successfully logged in";
        localStorage.setItem("username", username);
        setTimeout(() => {
          window.location.href = "game.html";
        }, 500);
      } else {
        pError.textContent = "⛔ Failed to login";
        setTimeout(() => {
          location.reload();
        }, 500);
      }
    } catch (error) {
      hideLoader();
      console.log("Error:", error);
      pError.textContent = "❌ Database error";
    }
  });
});
