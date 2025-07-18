function logout() {
  localStorage.removeItem("username");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username");
  if (!username) window.location.href = "login.html"; // Force login if they are not authenticated
  const profileLink = document.getElementById("profile-username");
  profileLink.textContent = username.toUpperCase();
});
