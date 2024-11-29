function calculateOverallPercentage() {
  // Select rows in the assignment table
  const rows = document.querySelectorAll("tr"); // Adjust the selector if needed
  let totalEarnedPoints = 0;
  let totalPossiblePoints = 0;

  rows.forEach((row) => {
    const scoreCell = row.querySelector(".score"); // Adjust selector if necessary
    if (scoreCell && scoreCell.innerText.includes("/")) {
      // Extract score values
      const [earned, possible] = scoreCell.innerText.split("/").map(Number);

      if (!isNaN(earned) && !isNaN(possible)) {
        totalEarnedPoints += earned;
        totalPossiblePoints += possible;
      }
    }
  });

  // Calculate the percentage
  const percentage =
    totalPossiblePoints > 0
      ? (totalEarnedPoints / totalPossiblePoints) * 100
      : 0;

  displayOverallPercentage(percentage.toFixed(2));
}

function displayOverallPercentage(percentage) {
  // Check if the container already exists
  let percentageDisplay = document.getElementById("overall-percentage");
  if (!percentageDisplay) {
    percentageDisplay = document.createElement("div");
    percentageDisplay.id = "overall-percentage";
    percentageDisplay.style.cssText = `
      margin-top: 10px;
      font-size: 16px;
      font-weight: bold;
      color: #4CAF50;
      text-align: left;
    `;
    const table = document.querySelector("table"); // Adjust to the table selector
    table.parentNode.insertBefore(percentageDisplay, table);
  }

  percentageDisplay.innerText = `Overall Percentage: ${percentage}%`;
}

// Run the calculation on page load
window.onload = () => calculateOverallPercentage();
