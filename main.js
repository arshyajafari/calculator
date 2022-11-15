let display = document.querySelector("#display-text"),
  memoryNumbers = [],
  finish;

const calculateHandler = (userInput) => {
  if (finish) display.innerText = "0";

  finish = false;

  changeFontSize(display.innerText.length);

  if (isFinite(userInput)) isFiniteUserInputHandler(userInput);

  if (
    userInput === "+" ||
    userInput === "-" ||
    userInput === "*" ||
    userInput === "/"
  ) {
    let phrase = display.innerText;
    phrase += userInput;
    display.innerText = uniqueChar(phrase, 1);
  }

  if (userInput === ".") decimalsHandler();

  if (userInput === "√") squareRootHandler();

  if (userInput === "%") percentageHandler();

  if (userInput === "x2") powerOfTwoHandler();

  if (userInput === "m+" || userInput === "m-" || userInput === "mrc")
    memoryHandler(userInput);

  if (userInput === "=") {
    Number.isInteger(eval(display.innerText))
      ? (display.innerText = eval(display.innerText))
      : (display.innerText = eval(display.innerText).toFixed(1));
    return (finish = true);
  }
};

const keyHandler = (event) => {
  if (finish) display.innerText = "0";

  finish = false;

  changeFontSize(display.innerText.length);

  if (isFinite(event.key)) isFiniteUserInputHandler(event.key);

  if (event.key === "c" || event.key === "C") cleanDisplay();

  if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "*" ||
    event.key === "/"
  ) {
    let phrase = display.innerText;
    phrase += event.key;
    display.innerText = uniqueChar(phrase, 1);
  }

  if (event.key === "Backspace") backspaceHandler();

  if (event.key === ".") decimalsHandler();

  if (event.key === "=" || event.key === "Enter") {
    Number.isInteger(eval(display.innerText))
      ? (display.innerText = eval(display.innerText))
      : (display.innerText = eval(display.innerText).toFixed(1));
    return (finish = true);
  }
};

const changeFontSize = (len) => {
  if (len < 14) display.style.fontSize = "38px";

  if (len > 13) display.style.fontSize = "25px";

  if (len > 19) display.style.fontSize = "22px";

  if (len > 23) display.style.fontSize = "19px";

  if (len > 27) {
    display.style.fontSize = "16px";
    display.style.overflow = "hidden";
  }
};

const isFiniteUserInputHandler = (char) => {
  if (display.innerText === "0") display.innerText = eval("0" + char);
  else display.innerText += char;
};

const cleanDisplay = () => {
  memoryNumbers = [];
  display.innerText = "0";
};

const uniqueChar = (char, repeat) => {
  if (typeof char !== "string") return;

  let count = 0;

  return [...char]
    .filter((item, index) => {
      if (
        (item === "+" ||
          item === "-" ||
          item === "*" ||
          item === "/" ||
          item === ".") &&
        (char[index - 1] === "+" ||
          char[index - 1] === "-" ||
          char[index - 1] === "*" ||
          char[index - 1] === "/" ||
          char[index - 1] === ".")
      )
        return count++ < repeat;

      count = 1;
      return true;
    })
    .join("");
};

const backspaceHandler = () => {
  if (display.innerText.length > 1)
    display.innerText = display.innerText.substring(
      0,
      display.innerText.length - 1
    );
  else display.innerText = "0";
};

const decimalsHandler = () => {
  if (display.innerText !== "0") {
    let floatNumber = display.innerText.split(/(\+)|(\-)|(\*)|(\/)/);
    if (
      floatNumber.includes("+") ||
      floatNumber.includes("-") ||
      floatNumber.includes("*") ||
      floatNumber.includes("/")
    ) {
      !floatNumber[5] ? (floatNumber[5] = "0.") : (floatNumber[5] += ".");
      display.innerText = uniqueChar(floatNumber.join(""), 1);
    } else {
      let phrase = display.innerText;
      phrase += ".";
      display.innerText = uniqueChar(phrase, 1);
    }
  } else {
    let phrase = display.innerText;
    phrase += ".";
    display.innerText = uniqueChar(phrase, 1);
  }
};

const squareRootHandler = () => {
  if (display.innerText !== "0") {
    let sqrtNumber = display.innerText.split(/(\+)|(\-)|(\*)|(\/)/);
    if (
      sqrtNumber.includes("+") ||
      sqrtNumber.includes("-") ||
      sqrtNumber.includes("*") ||
      sqrtNumber.includes("/")
    ) {
      sqrtNumber[5] = Math.sqrt(sqrtNumber[5]);
      Number.isInteger(sqrtNumber[5])
        ? (display.innerText = eval(sqrtNumber.join("")))
        : (display.innerText = eval(sqrtNumber.join("")).toFixed(1));
    } else {
      Number.isInteger(Math.sqrt(display.innerText))
        ? (display.innerText = Math.sqrt(display.innerText))
        : (display.innerText = Math.sqrt(display.innerText).toFixed(1));
    }
  } else display.innerText = "0";
};

const percentageHandler = () => {
  if (display.innerText !== "0") {
    let percentage = display.innerText.split(/(\+)|(\-)|(\*)|(\/)/);
    let value = ((percentage[5] * percentage[0]) / 100).toFixed(1);
    percentage[5] = value;
    display.innerText = eval(percentage.join(""));
  } else display.innerText = "0";
};

const powerOfTwoHandler = () => {
  if (display.innerText.length <= 7) {
    if (display.innerText !== "0") {
      let power = display.innerText.split(/(\+)|(\-)|(\*)|(\/)/);
      if (
        power.includes("+") ||
        power.includes("-") ||
        power.includes("*") ||
        power.includes("/")
      ) {
        power[5] = Math.pow(power[5], 2);
        display.innerText = eval(power.join(""));
      } else {
        display.innerText = Math.pow(display.innerText, 2);
      }
    } else display.innerText = "0";
  } else {
    display.innerText = "Error";
  }
};

const memoryHandler = (char) => {
  let calculate = eval(display.innerText);

  if (char === "m+") {
    memoryNumbers.push(calculate * 1);
    display.innerText = "saved";
    setTimeout(() => (display.innerText = calculate), 500);
    setTimeout(() => cleanDisplay(), 2000);
  } else if (char === "m-") {
    memoryNumbers.push(calculate * -1);
    display.innerText = "saved";
    setTimeout(() => (display.innerText = calculate), 500);
    setTimeout(() => cleanDisplay(), 2000);
  } else if (char === "mrc") {
    let result =
      memoryNumbers.length === 0
        ? "0"
        : memoryNumbers.reduce((previous, current) => previous + current);
    memoryNumbers = [];
    memoryNumbers.push(result);
    display.innerText = result;
  }
};
