var inputNum = document.querySelectorAll(".inputs input");
var pressEnter = document.querySelector(".press");
var num = document.querySelector(".num");
var rules = document.querySelector(".rules");
var lose = document.querySelector(".lose");
var win = document.querySelector(".winner");
var againBtn = document.querySelector("button");
var attempts = document.querySelector(".attempt span");
var winner = document.querySelector(".win p");
var attempt = 10;

// clear animation
for (let i = 0; i < inputNum.length; i++) {
  checkNumbers(inputNum[i]);
  inputNum[i].addEventListener("input", function (e) {
    if (inputNum[i].value !== "") {
      inputNum[i].style.animation = "none";
      if (inputNum[i + 1]) {
        inputNum[i + 1].focus();
      }
    } else {
      inputNum[i].style.animation = "lines .5s .2s linear infinite";
    }
    inputsCorrect();
  });
  inputNum[i].addEventListener("keydown", function (e) {
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      inputNum[i].value === ""
    ) {
      if (inputNum[i - 1]) {
        inputNum[i - 1].disabled = false;
        inputNum[i - 1].value ="";
        inputNum[i - 1].focus();
        inputNum[i-1].style.animation = "lines 1s linear infinite";
        e.preventDefault();
      }
    }
  });
}
document.addEventListener("keydown", function (e) {
  if (e.key == "Enter" && inputsCorrect()) {
    samePlace();
  }
});
//enter the number that will guess
if (num) {
  checkNumbers(num);
  num.addEventListener("input", function (e) {
    if (num.value.length === 4) {
      num.readOnly = true;
      pressEnter.classList.remove("d-none");
      document.addEventListener("keydown", function (e) {
        if (e.key == "Enter") {
          localStorage.setItem("number", num.value);
          window.location.href = "board.html";
        }
      });
      num.addEventListener("keydown", function (e) {
        if ((e.key === "Backspace" || e.key === "Delete") && num.readOnly) {
          num.readOnly = false;
        }
      });
    }
  });
}
if (againBtn) {
  againBtn.addEventListener("click", function (e) {
    window.location.href = "index.html";
  });
}
function samePlace() {
  var correctNumber = 0;
  var count = 0;
  var correctPlace = 0;
  var number = localStorage.getItem("number");
  // same number not same place
  while (count < 4) {
    for (let i = 0; i < number.length; i++) {
      if (inputNum[count].value == number[i] && count == i) {
        correctPlace++;
      } else if (inputNum[count].value == number[i] && count != i) {
        correctNumber++;
      }
    }
    count++;
  }
  rules.innerHTML = `<p class="text-danger">${correctPlace} numbers correct and in the right place</p>`;
  rules.innerHTML += `<p class="text-danger">${correctNumber} numbers correct but in the wrong place</p>`;
  attempt--;
  attempts.innerHTML = `${attempt}`;
  if (correctPlace == 4) {
    winner.innerHTML = `your guess is correct👏<p>number is:${number}</p>`;
    win.classList.remove("d-none");
    win.classList.add("text-success");
  }
  if (attempt == 0 && correctPlace !== 4) {
    winner.innerHTML = `your guess is wrong 😞<p>number is:${number}</p>`;
    win.classList.remove("d-none");
    win.classList.add("text-danger");
  }
}
//check if the inputs are numbers not characters
function checkNumbers(userInput) {
  userInput.addEventListener("keydown", function (e) {
    if (checkValue(e.key) || e.key == "Backspace") {
      return;
    }
    e.preventDefault();
  });
}
//check if user enter numbers
function checkValue(val) {
  var regex = /^[0-9]$/;
  if (regex.test(val)) {
    return true;
  }
  return false;
}
//check if all inputs fill
function inputsCorrect() {
  for (let i = 0; i < inputNum.length; i++) {
    if (!inputNum[i].value) {
      pressEnter.classList.add("d-none");
      return false;
    }
  }
  pressEnter.classList.remove("d-none");
  return true;
}
document.addEventListener("input", function (e) {
  console.log(e);
});
