let user = {};
let tabName = "";

const modifyClicked = function () {
  // When you click modify, enables all the inputs
  const inputs = document.querySelectorAll("input");
  if (inputs) {
    inputs.forEach((element) => {
      element.removeAttribute("disabled");
    });
  }
  const selects = document.querySelectorAll("select");
  if (selects) {
    selects.forEach((element) => {
      element.removeAttribute("disabled");
    });
  }
  // Rearrange the buttons
  const modifyButton = document.getElementById("modify");
  modifyButton.classList.add("hide");
  const saveButton = document.getElementById("save");
  saveButton.classList.remove("hide");
  const cancelButton = document.getElementById("cancel");
  cancelButton.classList.remove("hide");
};

const saveClicked = async function (event) {
  // Manage saving
  event.preventDefault();
  const pError = document.getElementById("div-error").firstElementChild;
  switch (tabName) {
    case "personal":
      const firstName = document.getElementById("first-name").value;
      const lastName = document.getElementById("last-name").value;
      const email = document.getElementById("email").value;
      const birthDate = document.getElementById("birth-date").value;
      const today = new Date();
      const birthDateDate = new Date(birthDate);
      const diffYears = today.getFullYear() - birthDateDate.getFullYear();
      if (diffYears < 5 || birthDateDate > today) {
        pError.textContent = "❌ Invalid date";
      } else {
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.birthDate = birthDate;
        try {
          showLoader();
          await updateUser(user);
          hideLoader();
          pError.classList.remove("error-message");
          pError.classList.add("success-message");
          pError.textContent = "✅ User updated";
          setTimeout(() => {
            location.reload();
          }, 500);
        } catch (error) {
          hideLoader();
          console.log("Error:", error);
          pError.textContent = "❌ Database error";
        }
      }
      break;
    case "security":
      const secretQuestion = document.getElementById("secret-question").value;
      const secretAnswer = document.getElementById("secret-answer").value;
      const previousPassword =
        document.getElementById("previous-password").value;
      const newPassword = document.getElementById("new-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      if (previousPassword === user.password) {
        if (newPassword !== confirmPassword) {
          pError.textContent = "❌ Passwords don't match";
        } else {
          user.secretQuestion = secretQuestion;
          user.secretAnswer = secretAnswer;
          user.password = newPassword;
          try {
            showLoader();
            await updateUser(user);
            hideLoader();
            pError.classList.remove("error-message");
            pError.classList.add("success-message");
            pError.textContent = "✅ User updated";
            setTimeout(() => {
              location.reload();
            }, 500);
          } catch (error) {
            hideLoader();
            console.log("Error:", error);
            pError.textContent = "❌ Database error";
          }
        }
      } else {
        pError.textContent = "⛔ Previous password doesn't match";
      }
      break;

    default:
      break;
  }
};

const cancelClicked = function () {
  switch (tabName) {
    case "game":
      gameTabClicked();
      break;
    case "personal":
      personalTabClicked();
      break;
    case "security":
      securityTabClicked();
      break;

    default:
      break;
  }
};

const savePersonal = async function () {};
const saveSecurity = async function () {};

const downloadData = async function () {
  const username = localStorage.getItem("username");
  user = await getUser(username);
};

const hideButtons = function () {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((element) => {
    element.classList.add("hide");
  });
};

const gameTabClicked = function () {
  // Show fields of game tab
  const pError = document.getElementById("div-error").firstElementChild;
  pError.textContent = "";
  removeInputGroups();
  hideButtons();
  tabName = "game";
  const tabTitle = document.getElementById("tab-title");
  tabTitle.textContent = "Game info";
  const divError = document.getElementById("div-error");
  const formContainer = document.getElementById("form-container");
  const divInputGroup1 = createDivInputGroup(
    "rank",
    "Rank",
    "input",
    "text",
    true,
    true,
    user.rank
  );
  formContainer.insertBefore(divInputGroup1, divError);
  const divInputGroup2 = createDivInputGroup(
    "max-points",
    "Max points",
    "input",
    "text",
    true,
    true,
    user.maxPoints
  );
  formContainer.insertBefore(divInputGroup2, divError);
  const divInputGroup3 = createDivInputGroup(
    "games-played",
    "Games played",
    "input",
    "text",
    true,
    true,
    user.gamesPlayed
  );
  formContainer.insertBefore(divInputGroup3, divError);
};

const personalTabClicked = function () {
  // Show personal tab fields
  const pError = document.getElementById("div-error").firstElementChild;
  pError.textContent = "";
  removeInputGroups();
  hideButtons();
  tabName = "personal";
  const modifyButton = document.getElementById("modify");
  modifyButton.classList.remove("hide");
  const tabTitle = document.getElementById("tab-title");
  tabTitle.textContent = "Personal info";
  const divError = document.getElementById("div-error");
  const formContainer = document.getElementById("form-container");
  const divInputGroup1 = createDivInputGroup(
    "first-name",
    "First Name",
    "input",
    "text",
    true,
    true,
    user.firstName
  );
  formContainer.insertBefore(divInputGroup1, divError);
  const divInputGroup2 = createDivInputGroup(
    "last-name",
    "Last Name",
    "input",
    "text",
    true,
    true,
    user.lastName
  );
  formContainer.insertBefore(divInputGroup2, divError);
  const divInputGroup3 = createDivInputGroup(
    "email",
    "Email",
    "input",
    "text",
    true,
    true,
    user.email
  );
  formContainer.insertBefore(divInputGroup3, divError);
  const divInputGroup4 = createDivInputGroup(
    "birth-date",
    "Birth date",
    "input",
    "date",
    true,
    true,
    user.birthDate
  );
  formContainer.insertBefore(divInputGroup4, divError);
};

const securityTabClicked = function () {
  // Show security tab fields
  const pError = document.getElementById("div-error").firstElementChild;
  pError.textContent = "";
  removeInputGroups();
  hideButtons();
  tabName = "security";
  const modifyButton = document.getElementById("modify");
  modifyButton.classList.remove("hide");
  const tabTitle = document.getElementById("tab-title");
  tabTitle.textContent = "Security info";
  const divError = document.getElementById("div-error");
  const formContainer = document.getElementById("form-container");
  const divInputGroup1 = createDivInputGroup(
    "secret-question",
    "Secret question",
    "select",
    "",
    true,
    true
  );
  formContainer.insertBefore(divInputGroup1, divError);
  const secretQuestions = getSecretQuestions();
  const select = document.getElementById("secret-question");
  for (let i = 0; i < secretQuestions.length; i++) {
    const option = document.createElement("option");
    option.textContent = secretQuestions[i];
    option.setAttribute("value", i);
    select.appendChild(option);
  }
  select.value = user.secretQuestion;
  const divInputGroup2 = createDivInputGroup(
    "secret-answer",
    "Secret answer",
    "input",
    "text",
    true,
    true
  );
  formContainer.insertBefore(divInputGroup2, divError);
  const divInputGroup3 = createDivInputGroup(
    "previous-password",
    "Previous password",
    "input",
    "password",
    true,
    true
  );
  formContainer.insertBefore(divInputGroup3, divError);
  const divInputGroup4 = createDivInputGroup(
    "new-password",
    "New password",
    "input",
    "password",
    true,
    true
  );
  formContainer.insertBefore(divInputGroup4, divError);
  const divInputGroup5 = createDivInputGroup(
    "confirm-password",
    "Confirm password",
    "input",
    "password",
    true,
    true
  );
  formContainer.insertBefore(divInputGroup5, divError);
};

document.addEventListener("DOMContentLoaded", async function () {
  const pError = document.getElementById("div-error").firstElementChild;
  try {
    showLoader();
    await downloadData();
    hideLoader();
  } catch (error) {
    hideLoader();
    console.log("Error:", error);
    pError.textContent = "❌ Database error";
  }
  const tabsContainer = document.getElementById("tabs-container");
  gameTabClicked();
  tabsContainer.addEventListener(
    "click",
    function (event) {
      if (
        event.target.id.includes("-tab") &&
        !event.target.classList.contains("tab-selected")
      ) {
        const tabs = document.querySelectorAll(".tab");
        tabs.forEach((element) => {
          if (element.id === event.target.id) {
            element.classList.remove("tab-not-selected");
            element.classList.add("tab-selected");
          } else {
            element.classList.add("tab-not-selected");
            element.classList.remove("tab-selected");
          }
        });
        switch (event.target.id) {
          case "game-tab":
            gameTabClicked();
            break;
          case "personal-tab":
            personalTabClicked();
            break;
          case "security-tab":
            securityTabClicked();
            break;

          default:
            break;
        }
      }
    },
    true
  );
  const modifyButton = document.getElementById("modify");
  modifyButton.addEventListener("click", modifyClicked);
  const cancelButton = document.getElementById("cancel");
  cancelButton.addEventListener("click", cancelClicked);
  document.addEventListener("submit", saveClicked);
});
