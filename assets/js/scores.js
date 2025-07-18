document.addEventListener("DOMContentLoaded", async function () {
  const tableBody = document.getElementById("score-tableBody");
  try {
    const username = localStorage.getItem("username");
    showLoader();
    const scores = await getScores(username);
    hideLoader();
    // Create the table
    for (let i = 0; i < scores.length; i++) {
      const tr = document.createElement("tr");
      if ("isUserRank" in scores[i]) {
        tr.style.fontWeight = "bold";
        tr.style.backgroundColor = "lightskyblue";
        tr.setAttribute("id", "user-rank");
      }
      const tdRank = document.createElement("td");
      tdRank.textContent = i + 1;
      const tdUsername = document.createElement("td");
      tdUsername.textContent = scores[i].username;
      const tdScore = document.createElement("td");
      tdScore.innerHTML = "<strong>" + scores[i].points + "</strong>";
      if (scores[i].points > 0) tdScore.style.color = "green";
      if (scores[i].points < 0) tdScore.style.color = "red";
      const tdMatched = document.createElement("td");
      tdMatched.textContent = scores[i].matched;
      tdMatched.classList.add("hide-mobile");
      const tdCombo = document.createElement("td");
      tdCombo.textContent = scores[i].combo;
      tdCombo.classList.add("hide-mobile");
      const tdAttempts = document.createElement("td");
      tdAttempts.textContent = scores[i].attempts;
      tdAttempts.classList.add("hide-mobile");
      const tdTime = document.createElement("td");
      tdTime.textContent = scores[i].time;
      tdTime.classList.add("hide-mobile");
      tr.appendChild(tdRank);
      tr.appendChild(tdUsername);
      tr.appendChild(tdScore);
      tr.appendChild(tdMatched);
      tr.appendChild(tdCombo);
      tr.appendChild(tdAttempts);
      tr.appendChild(tdTime);
      tableBody.appendChild(tr);
    }
    // Focus on the user score (previous one is better)
    if (document.getElementById("user-rank"))
      if (document.getElementById("user-rank").previousSibling)
        document.getElementById("user-rank").previousSibling.scrollIntoView();
  } catch (error) {
    hideLoader();
    console.log("Error:", error);
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.setAttribute("colspan", 7);
    td.textContent = "Database error!";
    td.classList.add("error-message");
    tr.appendChild(td);
    tableBody.appendChild(tr);
  }
});
