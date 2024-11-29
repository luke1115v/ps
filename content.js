window.onload = function () {
  // Delay the execution further to ensure external scripts have loaded
  setTimeout(calculateOverallPercentage, 1000); // Wait 1 second before running the script

  function calculateOverallPercentage() {
    const rows = document.querySelectorAll("tr"); // Select all rows in the table
    let totalEarnedPoints = 0;
    let totalPossiblePoints = 0;

    rows.forEach((row, index) => {
      // Log the entire row for debugging to see the structure
      console.log(`Row ${index + 1}: ${row.innerText}`);

      // Try to find the correct cell with the points (adjust column index if necessary)
      const scoreCell = row.querySelector("td:nth-child(5)"); // Assuming points are in the 5th column
      
      if (scoreCell) {
        const scoreText = scoreCell.innerText.trim();

        // Skip rows with invalid score formats like "late", "missing", or no score
        if (scoreText.includes("late") || scoreText.includes("missing") || !scoreText.includes("/")) {
          console.log(`Skipping invalid score: ${scoreText}`);
          return; // Skip invalid entries
        }

        // Check if the score follows the "earned/possible" format
        const [earned, possible] = scoreText.split("/").map(Number);

        // Log the extracted values for debugging
        console.log(`Extracted Earned: ${earned}, Possible: ${possible}`);

        // Add to total points if the values are valid numbers
        if (!isNaN(earned) && !isNaN(possible)) {
          totalEarnedPoints += earned;
          totalPossiblePoints += possible;
        }
      }
    });

    // Check if the totals are being calculated correctly
    console.log(`Total Earned Points: ${totalEarnedPoints}`);
    console.log(`Total Possible Points: ${totalPossiblePoints}`);

    // Calculate the overall percentage if possible points are greater than zero
    const percentage =
      totalPossiblePoints > 0
        ? (totalEarnedPoints / totalPossiblePoints) * 100
        : 0;

    // Log the calculated percentage
    console.log(`Overall Percentage: ${percentage}%`);

    displayOverallPercentage(percentage.toFixed(2)); // Display percentage with two decimal places
  }

  function displayOverallPercentage(percentage) {
    // Check if the display element already exists
    let percentageDisplay = document.getElementById("overall-percentage");
    if (!percentageDisplay) {
      // Create a new display element for the percentage
      percentageDisplay = document.createElement("div");
      percentageDisplay.id = "overall-percentage";
      percentageDisplay.style.cssText = `
        margin-top: 10px;
        font-size: 16px;
        font-weight: bold;
        color: #4CAF50;
        text-align: left;
      `;

      // Find the parent container where we want to insert the new element
      const table = document.querySelector("table");
      if (table) {
        table.parentNode.insertBefore(percentageDisplay, table);
      } else {
        console.log("Table not found, unable to insert percentage display.");
      }
    }

    // Display the calculated overall percentage
    percentageDisplay.innerText = `Overall Percentage: ${percentage}%`;
  }
};
