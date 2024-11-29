document.addEventListener('DOMContentLoaded', function () {
  function calculateOverallPercentage() {
    // Select all rows in the table (can adjust for specific table, e.g., "tbody tr")
    const rows = document.querySelectorAll("tr"); // Adjust if necessary
    let totalEarnedPoints = 0;
    let totalPossiblePoints = 0;

    rows.forEach((row, index) => {
      // Adjust the column index here (replace 5 if necessary)
      const scoreCell = row.querySelector("td:nth-child(5)"); // Update this selector based on your table structure
      
      // Check if the score cell exists and contains a valid score (like "64/68")
      if (scoreCell && scoreCell.innerText.includes("/")) {
        // Extract earned and possible points from the score (e.g., "64/68")
        const [earned, possible] = scoreCell.innerText.split("/").map(Number);

        // Log the extracted values for debugging
        console.log(`Row ${index + 1}: ${row.innerText}`);
        console.log(`Score: ${scoreCell.innerText}`);
        console.log(`Earned: ${earned}, Possible: ${possible}`);

        // If both earned and possible points are valid numbers, add them to totals
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

    // Log the final calculated percentage
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
      
      // Select the parent container where we want to insert the new display
      const table = document.querySelector("table");
      if (table) {
        table.parentNode.insertBefore(percentageDisplay, table);
      } else {
        console.log("Table not found, unable to insert percentage display.");
      }
    }

    // Display the calculated percentage
    percentageDisplay.innerText = `Overall Percentage: ${percentage}%`;
  }

  // Run the calculation
  calculateOverallPercentage();
});
