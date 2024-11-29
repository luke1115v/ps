// Function to parse assignments and calculate total grade percentage
function calculatePercentage() {
  // Select assignment rows - update selector based on PowerSchool's structure
  const assignmentRows = document.querySelectorAll(".assignment-row"); 
  let totalScore = 0;
  let totalWeight = 0;

  assignmentRows.forEach(row => {
    // Extract assignment score, total points, and weight
    const scoreText = row.querySelector(".score").innerText; // Update the selector
    const weightText = row.querySelector(".weight").innerText; // Update the selector
    
    const [score, outOf] = scoreText.split("/").map(Number);
    const weight = parseFloat(weightText) || 1; // Default weight is 1 if not provided

    if (!isNaN(score) && !isNaN(outOf) && !isNaN(weight)) {
      totalScore += (score / outOf) * weight;
      totalWeight += weight;
    }
  });

  const percentage = totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0;

  // Display the percentage in the PowerSchool interface
  displayPercentage(percentage);
}

// Function to display the calculated percentage
function displayPercentage(percentage) {
  // Create a container to show the percentage
  let percentageContainer = document.getElementById("calculated-percentage");
  if (!percentageContainer) {
    percentageContainer = document.createElement("div");
    percentageContainer.id = "calculated-percentage";
    percentageContainer.style.cssText = `
      margin-top: 20px;
      font-size: 16px;
      color: #4CAF50;
      font-weight: bold;
    `;
    const gradesContainer = document.querySelector(".grades-section"); // Update selector
    gradesContainer.appendChild(percentageContainer);
  }

  percentageContainer.innerText = `Calculated Percentage: ${percentage.toFixed(2)}%`;
}

// Run the calculation when the page loads
window.onload = () => {
  calculatePercentage();
};
