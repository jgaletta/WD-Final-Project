let attemptsCount;
let movesCount;
let comboCount;
let matchedCount;
let pointsCount;
let imageIdClickedFirst;
let imageIdClickedSecond;
let firstCard;
let secondCard;
let timeLeftInSeconds;
let intervalId;
const totalCards = 16;
let previousMoveMatched;

const showModal = function () {
  const modal = document.getElementById("modal");
  const modalOverlay = document.getElementById("modal-overlay");
  modalOverlay.classList.add("active");
  modal.classList.add("active");
  document.body.classList.add("modal-open");
};

const hideModal = function () {
  const modal = document.getElementById("modal");
  const modalOverlay = document.getElementById("modal-overlay");
  modalOverlay.classList.remove("active");
  modal.classList.remove("active");
  document.body.classList.remove("modal-open");
};

const updateScore = function () {
  const combo = document.getElementById("combo");
  combo.textContent = comboCount;
  const attempts = document.getElementById("attempts");
  attempts.textContent = attemptsCount;
  const points = document.getElementById("points");
  const finalPoints = document.getElementById("final-points");
  points.textContent = pointsCount.toString();
  finalPoints.textContent = pointsCount.toString();
  points.classList.remove("text-light-green");
  finalPoints.classList.remove("text-light-green");
  points.classList.remove("text-red");
  finalPoints.classList.remove("text-red");

  if (pointsCount < 0) {
    points.classList.add("text-red");
    finalPoints.classList.add("text-red");
  } else {
    if (pointsCount > 0) {
      points.classList.add("text-light-green");
      finalPoints.classList.add("text-light-green");
    }
  }
};

const showNotification = function (type, message) {
  // Remove any existing notification to prevent overlap
  const existingNotification = document.querySelector(
    ".score-notification-center"
  );
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create the notification element
  const notificationElement = document.createElement("div");
  notificationElement.classList.add("score-notification-center");
  notificationElement.textContent = message;

  switch (type) {
    case "bonus":
      notificationElement.classList.add("text-light-green");
      break;
    case "combo":
      notificationElement.classList.add("text-yellow");
      break;
    case "malus":
      notificationElement.classList.add("text-red");
      break;
    default:
      break;
  }

  document.body.appendChild(notificationElement);
  notificationElement.classList.add("show");

  setTimeout(() => {
    // Check if the element still exists
    if (notificationElement.parentNode) {
      notificationElement.remove();
    }
  }, 2500);
};

const saveScore = async function () {
  const score = {
    username: localStorage.getItem("username"),
    points: pointsCount,
    matched: matchedCount,
    combo: comboCount,
    attempts: attemptsCount,
    time: timeLeftInSeconds,
  };
  const pRank = document.getElementById("rank");
  const pBest = document.getElementById("best");

  try {
    const insertReport = await insertScore(score);
    let differencePlace = "";
    // Calcolate the difference of positions
    if (insertReport.previousPlace > 0) {
      const differencePlaceValue =
        insertReport.scorePlace - insertReport.previousPlace;
      let differenceSign = "";
      if (differencePlaceValue >= 0) differenceSign = "+";
      differencePlace = " (" + differenceSign + differencePlaceValue + ")";
    }
    const rankText =
      "Rank: " + insertReport.scorePlace + "° place" + differencePlace;
    pRank.textContent = rankText;
    // Show that it is the best score
    if (insertReport.newMaxPoints - insertReport.previousMaxPoints > 0)
      pBest.style.display = "block";
  } catch (error) {
    console.log("Error:", error);
    pRank.classList.add("error-message");
    pRank.textContent = "Database error!";
  }
};

const endGame = function () {
  clearInterval(intervalId); // Stop the interval
  intervalId = null;
  const divMemory = document.getElementById("memory");
  divMemory.removeEventListener("click", clickCardFunction);
  if (timeLeftInSeconds > 0) {
    // Time bonus score
    const bonus = timeLeftInSeconds * 5;
    pointsCount = pointsCount + bonus;
    updateScore();
    setTimeout(() => {
      showNotification("combo", "+" + bonus.toString() + " time");
    }, 1000);
  } else {
    showNotification("", "Time is up!");
  }
  saveScore();
  setTimeout(() => {
    showModal();
  }, 2000);
};

const updateTimeLeft = function () {
  const timeLeft = document.getElementById("timeLeft");
  if (timeLeftInSeconds <= 10) timeLeft.classList.add("text-red");
  const minutes = Math.floor(timeLeftInSeconds / 60);
  const seconds = timeLeftInSeconds % 60;
  // Add zero if minutes/seconds are less than 10
  let formattedMinutes;
  if (minutes < 10) formattedMinutes = "0" + minutes;
  else formattedMinutes = minutes;
  if (seconds < 10) formattedSeconds = "0" + seconds;
  else formattedSeconds = seconds;

  timeLeft.textContent =
    formattedMinutes.toString() + ":" + formattedSeconds.toString();
};

const tick = function () {
  if (timeLeftInSeconds > 0) {
    timeLeftInSeconds--;
    updateTimeLeft();
  } else {
    // Timer has reached zero
    endGame();
  }
};

const clickCardFunction = function (event) {
  // Rotate the cards on click
  if (event.target.id.includes("card")) {
    // Start the timer if there is no timer
    if (intervalId === null) intervalId = setInterval(tick, 1000);
    const imageIdClicked = event.target.nextSibling.firstChild.id;
    const card = event.target.parentElement;
    const revealedCount = Number(card.getAttribute("revealedCount"));
    card.setAttribute("revealedCount", revealedCount + 1);
    card.classList.toggle("rotate");
    if (imageIdClickedFirst === "") {
      imageIdClickedFirst = imageIdClicked;
      firstCard = card;
    } else {
      if (imageIdClickedSecond === "") {
        movesCount++;
        imageIdClickedSecond = imageIdClicked;
        secondCard = card;
        if (imageIdClickedFirst === imageIdClickedSecond) {
          // MATCHED!
          matchedCount++;
          pointsCount = pointsCount + 100;
          if (previousMoveMatched && matchedCount < totalCards / 2) {
            // Two consecutive card = BONUS!
            showNotification("combo", "COMBO +150");
            comboCount++;
            pointsCount = pointsCount + 50;
          } else showNotification("bonus", "+100");
          firstCard.classList.add("card-matched");
          secondCard.classList.add("card-matched");
          imageIdClickedFirst = "";
          imageIdClickedSecond = "";
          firstCard = {};
          secondCard = {};
          previousMoveMatched = true;
        } else {
          // Not matched, Reset the cards
          previousMoveMatched = false;
          const revealedCount1 = firstCard.getAttribute("revealedCount");
          const revealedCount2 = secondCard.getAttribute("revealedCount");
          if (revealedCount1 > 1 || revealedCount2 > 1) {
            // Already seen, they deserve malus point
            attemptsCount++;
            pointsCount = pointsCount - 10;
            showNotification("malus", "-10");
          }
          imageIdClickedFirst = "";
          imageIdClickedSecond = "";
          const toRotate1 = firstCard;
          const toRotate2 = secondCard;
          firstCard = {};
          secondCard = {};
          setTimeout(() => {
            toRotate1.classList.toggle("rotate");
            toRotate2.classList.toggle("rotate");
          }, 500);
        }
      }
    }
    updateScore();
    if (matchedCount === totalCards / 2) {
      endGame();
    }
  }
};

const newGameFunction = function () {
  // Reset all variables
  attemptsCount = 0;
  movesCount = 0;
  comboCount = 0;
  matchedCount = 0;
  pointsCount = 0;
  imageIdClickedFirst = "";
  imageIdClickedSecond = "";
  firstCard = {};
  secondCard = {};
  timeLeftInSeconds = 60;
  intervalId = null;
  previousMoveMatched = false;
  const divMessages = document.getElementById("messages");
  divMessages.innerHTML = "";
  const divScore = document.getElementById("score");
  divScore.innerHTML = "";
  const divMemory = document.getElementById("memory");
  divMemory.innerHTML = "";
  const pRank = document.getElementById("rank");
  pRank.classList.remove("error-message");
  pRank.innerHTML = "";
  const pBest = document.getElementById("best");
  pBest.style.display = "none";

  // Creates score div

  const divTimeLeft = document.createElement("div");
  divTimeLeft.classList.add("score-elements");
  const h2TimeLeft = document.createElement("h2");
  h2TimeLeft.id = "timeLeft";
  const pTimeLeft = document.createElement("p");
  pTimeLeft.textContent = "time left";
  divTimeLeft.appendChild(h2TimeLeft);
  divTimeLeft.appendChild(pTimeLeft);
  divScore.appendChild(divTimeLeft);

  const divCombo = document.createElement("div");
  divCombo.classList.add("score-elements");
  const h2Combo = document.createElement("h2");
  h2Combo.id = "combo";
  h2Combo.textContent = "0";
  const pCombo = document.createElement("p");
  pCombo.textContent = "combo";
  divCombo.appendChild(h2Combo);
  divCombo.appendChild(pCombo);
  divScore.appendChild(divCombo);

  const divAttempts = document.createElement("div");
  divAttempts.classList.add("score-elements");
  const h2Attempts = document.createElement("h2");
  h2Attempts.id = "attempts";
  h2Attempts.textContent = "0";
  const pAttempts = document.createElement("p");
  pAttempts.textContent = "attempts";
  divAttempts.appendChild(h2Attempts);
  divAttempts.appendChild(pAttempts);
  divScore.appendChild(divAttempts);

  const divPoints = document.createElement("div");
  divPoints.classList.add("score-elements");
  const h2Points = document.createElement("h2");
  h2Points.id = "points";
  h2Points.textContent = "0";
  const pPoints = document.createElement("p");
  pPoints.textContent = "points";
  divPoints.appendChild(h2Points);
  divPoints.appendChild(pPoints);
  divScore.appendChild(divPoints);

  const cardValues = [];
  const match1Values = [];
  const match2Values = [];

  // Assign the cards in random way
  for (let i = 0; i < totalCards; i++) {
    let found = false;
    while (!found) {
      const random = Math.floor((Math.random() * totalCards) / 2); // Generate a Random number
      if (!match1Values.includes(random) || !match2Values.includes(random)) {
        if (!match1Values.includes(random)) match1Values.push(random);
        else match2Values.push(random);
        cardValues[i] = random;
        found = true;
      }
    }
  }

  console.log("Solution: ", cardValues);

  // Create the memory game
  for (let i = 0; i < totalCards; i++) {
    const divCardContainer = document.createElement("div");
    divCardContainer.classList.add("card-container4");
    const divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.setAttribute("revealedCount", 0); // Custom attribute
    const divFront = document.createElement("div");
    divFront.classList.add("front");
    divFront.id = "card" + i;
    const divBack = document.createElement("div");
    divBack.classList.add("back");
    const img = document.createElement("img");
    img.src = "https://picsum.photos/200?random=" + cardValues[i];
    img.id = "image" + cardValues[i];
    img.alt = img.id;
    divBack.appendChild(img);
    divCard.appendChild(divFront);
    divCard.appendChild(divBack);
    divCardContainer.appendChild(divCard);
    divMemory.appendChild(divCardContainer);
  }
  divMemory.addEventListener("click", clickCardFunction);
  updateTimeLeft();
};

document.addEventListener("DOMContentLoaded", function () {
  const newGame = document.getElementById("new-game");
  newGame.addEventListener("click", newGameFunction);
});
