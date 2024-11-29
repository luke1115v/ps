// Example code fix for 'timeentry_widget.js'

document.addEventListener('DOMContentLoaded', function () {
    // Ensuring that the DOM is ready before attempting to manipulate it

    // Function to dynamically add content instead of using document.write
    function updateContent(id, content) {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = content; // Updates the element's inner HTML
        }
    }

    // Example: Dynamically updating the 'Total Points' section
    function updateGradeTotals(totalEarned, totalPossible) {
        const earnedPoints = document.getElementById('totalEarnedPoints');
        const possiblePoints = document.getElementById('totalPossiblePoints');

        if (earnedPoints && possiblePoints) {
            earnedPoints.innerText = totalEarned;
            possiblePoints.innerText = totalPossible;
        }
    }

    // Updating grades dynamically (for example: assignment rows)
    const gradesData = [
        { date: '11/22/2024', assignment: 'MC Midterm', score: '17/20', grade: 'B' },
        { date: '11/22/2024', assignment: 'FRQ Midterm', score: '11/12', grade: 'A-' },
        { date: '11/21/2024', assignment: 'CodeHS 5.1-5.2 Exercises', score: '1/1', grade: 'A+' }
        // More rows can be added here
    ];

    const gradesContainer = document.getElementById('gradesContainer');
    gradesData.forEach((grade) => {
        if (grade.score && grade.grade) {
            const gradeRow = document.createElement('div');
            gradeRow.classList.add('grade-row');
            gradeRow.innerHTML = `
                <div>${grade.date}</div>
                <div>${grade.assignment}</div>
                <div>${grade.score}</div>
                <div>${grade.grade}</div>
            `;
            gradesContainer.appendChild(gradeRow);
        }
    });

    // Calculate and update total points
    const totalEarned = gradesData.reduce((sum, grade) => {
        if (grade.score) {
            const [earned, possible] = grade.score.split('/').map(Number);
            return sum + earned;
        }
        return sum;
    }, 0);

    const totalPossible = gradesData.reduce((sum, grade) => {
        if (grade.score) {
            const [, possible] = grade.score.split('/').map(Number);
            return sum + possible;
        }
        return sum;
    }, 0);

    // Updating the grade totals
    updateGradeTotals(totalEarned, totalPossible);
});

// Handle invalid or missing scores (adjust depending on logic)
function handleInvalidScores(score) {
    // Skipping logic can be updated here
    if (score === 'late' || score === 'missing') {
        return false; // Skip
    }
    return true; // Include score
}
