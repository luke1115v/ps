function calculateOverallPercentage() {
  // Select all rows in the table (you can refine this if necessary)
  const rows = document.querySelectorAll("tr"); // This can be more specific if necessary
  let totalEarnedPoints = 0;
  let totalPossiblePoints = 0;

  rows.forEach((row) => {
    // Locate the cell that contains the score
    const scoreCell = row.querySelector("td:nth-child(5)"); // 5th column for Score (adjust if necessary)
    
    // Check if the score cell exists and contains a valid score (like "64/68")
    if (scoreCell && scoreCell.innerText.includes("/")) {
      // Extract the earned and possible points from the score
      const [earned, possible] = scoreCell.innerText.split("/").map(Number);

      // Log the values for debugging
      console.log(`Row: ${row.innerText}`);
      console.log(`Score: ${scoreCell.innerText}`);
      console.log(`Earned: ${earned}, Possible: ${possible}`);

      // If both earned and possible points are numbers, add them to totals
      if (!isNaN(earned) && !isNaN(possible)) {
        totalEarnedPoints += earned;
        totalPossiblePoints += possible;
      }
    }
  });

  // Log the totals before calculating the percentage
  console.log(`Total Earned Points: ${totalEarnedPoints}`);
  console.log(`Total Possible Points: ${totalPossiblePoints}`);

  // Calculate the overall percentage
  const percentage =
    totalPossiblePoints > 0
      ? (totalEarnedPoints / totalPossiblePoints) * 100
      : 0;

  // Log the final percentage for debugging
  console.log(`Overall Percentage: ${percentage}%`);

  displayOverallPercentage(percentage.toFixed(2)); // Show the result with two decimal points
}

function displayOverallPercentage(percentage) {
  // Check if the display element already exists
  let percentageDisplay = document.getElementById("overall-percentage");
  if (!percentageDisplay) {
    // Create a new display element for the overall percentage
    percentageDisplay = document.createElement("div");
    percentageDisplay.id = "overall-percentage";
    percentageDisplay.style.cssText = `
      margin-top: 10px;
      font-size: 16px;
      font-weight: bold;
      color: #4CAF50;
      text-align: left;
    `;
    const table = document.querySelector("table"); // Find the table to place the result above
    table.parentNode.insertBefore(percentageDisplay, table);
  }

  // Display the calculated percentage
  percentageDisplay.innerText = `Overall Percentage: ${percentage}%`;
}

// Run the calculation when the page has loaded
window.onload = () => calculateOverallPercentage();
