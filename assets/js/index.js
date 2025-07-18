document.addEventListener("DOMContentLoaded", function () {
  const clickMe = document.querySelector(".click-me");
  clickMe.addEventListener("click", function () {
    window.location.href = "login.html";
  });
});
