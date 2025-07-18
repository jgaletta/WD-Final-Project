document.addEventListener("DOMContentLoaded", function () {
  // Loads secret questions
  const secretQuestions = getSecretQuestions();
  const select = document.getElementById("secret-question");
  for (let i = 0; i < secretQuestions.length; i++) {
    const option = document.createElement("option");
    option.textContent = secretQuestions[i];
    option.setAttribute("value", i);
    select.appendChild(option);
  }

  document.addEventListener("submit", async function (event) {
    event.preventDefault();
    // Delete errors
    let noError = true;
    const invalidElements = document.querySelectorAll(".input-invalid");
    for (let i = 0; i < invalidElements.length; i++) {
      const element = invalidElements[i];
      element.classList.remove("input-invalid");
    }
    const errorMessages = document.querySelectorAll(".error-message");
    for (let i = 0; i < errorMessages.length; i++) {
      const element = errorMessages[i];
      element.textContent = "";
    }
    // Validation
    const pError = document.getElementById("div-error").firstElementChild;
    const username = document.getElementById("username");
    const usernameValue = username.value;
    let userExist;
    try {
      showLoader();
      userExist = await checkUserExist(usernameValue);
      hideLoader();
    } catch (error) {
      hideLoader();
      console.log("Error:", error);
      pError.textContent = "❌ Database error";
    }

    const errorUsername = document.getElementById("error-username");
    if (userExist) {
      errorUsername.textContent = "Already in use";
      username.classList.add("input-invalid");
      username.focus();
      noError = false;
    }
    const password = document.getElementById("password");
    const passwordValue = password.value;
    const errorPassword = document.getElementById("error-password");
    const confirmPassword = document.getElementById("confirm-password");
    const confirmPasswordValue = confirmPassword.value;
    const errorConfirmPassword = document.getElementById(
      "error-confirm-password"
    );
    if (passwordValue !== confirmPasswordValue) {
      const textError = "Passwords don't match";
      errorPassword.textContent = textError;
      errorConfirmPassword.textContent = textError;
      password.classList.add("input-invalid");
      confirmPassword.classList.add("input-invalid");
      password.focus();
      noError = false;
    }
    const secretQuestion = document.getElementById("secret-question");
    const secretQuestionValue = secretQuestion.value;
    const errorSecretQuestion = document.getElementById(
      "error-secret-question"
    );
    if (secretQuestionValue === "") {
      errorSecretQuestion.textContent = "Select one question";
      secretQuestion.classList.add("input-invalid");
      secretQuestion.focus();
      noError = false;
    }
    const birthDate = document.getElementById("birth-date");
    const birthDateValue = birthDate.value;
    const errorBirthDate = document.getElementById("error-birth-date");
    const today = new Date();
    const birthDateValueDate = new Date(birthDateValue);
    const diffYears = today.getFullYear() - birthDateValueDate.getFullYear();
    if (diffYears < 5 || birthDateValueDate > today) {
      errorBirthDate.textContent = "Invalid date";
      birthDate.classList.add("input-invalid");
      birthDate.focus();
      noError = false;
    }

    // Save user
    if (noError) {
      const user = {
        username: usernameValue,
        password: passwordValue,
        secretQuestion: secretQuestionValue,
        secretAnswer: document.getElementById("secret-answer").value,
        firstName: document.getElementById("first-name").value,
        lastName: document.getElementById("last-name").value,
        email: document.getElementById("email").value,
        birthDate: birthDateValue,
      };
      try {
        showLoader();
        await insertUser(user);
        hideLoader();
        pError.classList.remove("error-message");
        pError.classList.add("success-message");
        pError.textContent = "✅ New user saved";
        setTimeout(() => {
          window.location.href = "login.html";
        }, 500);
      } catch (error) {
        hideLoader();
        console.log("Error:", error);
        pError.textContent = "❌ Database error";
      }
    }
  });
});
