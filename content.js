window.onload = function () {
  // Delay execution slightly to ensure all scripts have loaded
  setTimeout(calculateOverallPercentage, 1000);

  function calculateOverallPercentage() {
    const rows = document.querySelectorAll("tr"); // Select all rows in the table
    let totalEarnedPoints = 0;
    let totalPossiblePoints = 0;

    rows.forEach((row, index) => {
      // Skip the first three rows (header or irrelevant data)
      if (index < 3) return;

      const cells = row.querySelectorAll("td"); // Get all cells in the row
      if (cells.length > 0) {
        // Assuming score data might be in the second-to-last column
        const scoreText = cells[cells.length - 2]?.innerText?.trim(); // Safely access the second-to-last column

        // Log the scoreText for debugging purposes
        console.log(`Row ${index + 1}: ${scoreText}`);

        // Try to find a valid "earned/possible" fraction (e.g., "1/1")
        const scoreMatch = scoreText ? scoreText.match(/(\d+\/\d+)/) : null; // Match a fraction format like "1/1"

        if (scoreMatch) {
          // If a valid fraction is found, extract it
          const earnedPossible = scoreMatch[0]; // Get the matched "earned/possible" score
          const [earned, possible] = earnedPossible.split("/").map(Number); // Split into earned and possible

          // Log the extracted values for debugging
          console.log(`Extracted Earned: ${earned}, Possible: ${possible}`);

          // Add to total points if the values are valid numbers
          if (!isNaN(earned) && !isNaN(possible)) {
            totalEarnedPoints += earned;
            totalPossiblePoints += possible;
          } else {
            console.log(`Invalid score format: ${earnedPossible}`);
          }
        } else {
          console.log(`Skipping invalid score: ${scoreText}`);
        }
      }
    });

    // Calculate the overall percentage if possible points are greater than zero
    const percentage = totalPossiblePoints > 0
      ? (totalEarnedPoints / totalPossiblePoints) * 100
      : 0;

    // Log the calculated percentage for debugging
    console.log(`Overall Percentage: ${percentage}%`);

    // Display the percentage
    displayOverallPercentage(percentage.toFixed(2));
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
