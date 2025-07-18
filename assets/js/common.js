const showLoader = function () {
  const loader = document.getElementById("loader");
  loader.classList.remove("hide");
};

const hideLoader = function () {
  const loader = document.getElementById("loader");
  loader.classList.add("hide");
};

const createDivInputGroup = function createDivInputGroup(
  id,
  labelText,
  tag,
  type,
  isDisabled = false,
  isRequired = false,
  value = null
) {
  //  Returns a div for input. This function is used to avoid repeatition.
  const divInput = document.createElement("div");
  divInput.classList.add("input-group");
  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = labelText;
  const element = document.createElement(tag);
  if (type !== "") element.setAttribute("type", type);
  element.setAttribute("id", id);
  element.setAttribute("name", id);
  if (isDisabled) {
    element.setAttribute("disabled", "");
  }
  if (isRequired) {
    element.setAttribute("required", "");
  }
  if (value !== null) {
    element.value = value;
  }
  divInput.appendChild(label);
  divInput.appendChild(element);
  return divInput;
};

const removeInputGroups = function () {
  const inputGroups = document.querySelectorAll(".input-group");
  inputGroups.forEach((element) => {
    element.parentNode.removeChild(element);
  });
};

const changeHamburgerIcon = function () {
  //  Used for manage the menu in smarphone mode
  const navElements = document.querySelectorAll(".nav-elements");
  if (hamburger.textContent === "X") hamburger.textContent = "☰";
  else hamburger.textContent = "X";
  for (let i = 0; i < navElements.length; i++) {
    navElements[i].classList.toggle("nav-show");
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  if (hamburger) hamburger.addEventListener("click", changeHamburgerIcon);
});
