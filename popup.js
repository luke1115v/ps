let expression = "";

function appendNumber(number) {
  expression += number;
  updateResult();
}

function operation(op) {
  expression += ` ${op} `;
  updateResult();
}

function clearResult() {
  expression = "";
  updateResult();
}

function calculate() {
  try {
    expression = eval(expression).toString();
    updateResult();
  } catch (error) {
    expression = "Error";
    updateResult();
  }
}

function updateResult() {
  document.getElementById("result").value = expression;
}
