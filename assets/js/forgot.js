let username;

const invalidData = function () {
  const pError = document.getElementById("div-error").firstElementChild;
  pError.textContent = "⛔️ Invalid data";
  setTimeout(() => {
    location.reload();
  }, 500);
};

const step3 = async function () {
  // Step 3: Check and update the password
  const pError = document.getElementById("div-error").firstElementChild;
  pError.textContent = "";
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  if (password && confirmPassword) {
    if (password !== confirmPassword) {
      pError.textContent = "❌ Passwords don't match";
    } else {
      try {
        showLoader();
        await updatePassword(username, password);
        hideLoader();
        pError.classList.remove("error-message");
        pError.classList.add("success-message");
        pError.textContent = "✅ Password updated";
        setTimeout(() => {
          window.location.href = "login.html";
        }, 500);
      } catch (error) {
        hideLoader();
        console.log("Error:", error);
        pError.textContent = "❌ Database error";
      }
    }
  } else {
    pError.textContent = "❌ Fill all fields";
  }
};

const step2 = async function () {
  // Step2: Check secret question and ask change password
  const pError = document.getElementById("div-error").firstElementChild;
  pError.textContent = "";
  const answer = document.getElementById("secret-answer").value;
  if (answer) {
    let isValid = false;
    try {
      showLoader();
      isValid = await checkSecretAnswer(username, answer);
      hideLoader();
    } catch (error) {
      hideLoader();
      console.log("Error:", error);
      pError.textContent = "❌ Database error";
    }
    if (isValid) {
      pError.textContent = "";
      removeInputGroups();
      const nextButton = document.getElementById("next");
      const loginForm = document.getElementById("login-form");
      const divInputGroup1 = createDivInputGroup(
        "password",
        "New password",
        "input",
        "password"
      );
      loginForm.insertBefore(
        divInputGroup1,
        document.getElementById("div-error")
      );
      const divInputGroup2 = createDivInputGroup(
        "confirm-password",
        "Confirm password",
        "input",
        "password"
      );
      loginForm.insertBefore(
        divInputGroup2,
        document.getElementById("div-error")
      );
      nextButton.removeEventListener("click", step2);
      nextButton.addEventListener("click", step3);
      nextButton.textContent = "Save";
    } else {
      invalidData();
    }
  } else {
    pError.textContent = "❌ Fill all fields";
  }
};

const step1 = async function () {
  // Step1: Check fields and prepare secret question
  const pError = document.getElementById("div-error").firstElementChild;
  username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const birthdate = document.getElementById("birth-date").value;
  if (username && email && birthdate) {
    let secretQuestion = "";
    try {
      showLoader();
      secretQuestion = await getSecretQFromData(username, email, birthdate);
      hideLoader();
    } catch (error) {
      hideLoader();
      console.log("Error:", error);
      pError.textContent = "❌ Database error";
    }
    if (secretQuestion === "") {
      invalidData();
    } else {
      pError.textContent = "";
      removeInputGroups();
      const nextButton = document.getElementById("next");
      const loginForm = document.getElementById("login-form");
      const divInputGroup = createDivInputGroup(
        "secret-answer",
        secretQuestion,
        "input",
        "text"
      );
      loginForm.insertBefore(
        divInputGroup,
        document.getElementById("div-error")
      );
      nextButton.removeEventListener("click", step1);
      nextButton.addEventListener("click", step2);
    }
  } else {
    pError.textContent = "❌ Fill all fields";
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const nextButton = document.getElementById("next");
  nextButton.addEventListener("click", step1);
});
