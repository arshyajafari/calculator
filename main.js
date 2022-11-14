let display = document.querySelector("#display-text"),
  memoryNumbers = [],
  finish;

const calculateHandler = (userInput) => {
  if (finish) display.innerText = "0";

  finish = false;

  if (display.innerText.length > 13) display.style.fontSize = "25px";

  if (display.innerText.length > 19) display.style.fontSize = "22px";

  if (display.innerText.length > 23) display.style.fontSize = "19px";

  if (display.innerText.length > 27) {
    display.style.fontSize = "16px";
    display.style.overflow = "hidden";
  }

  if (isFinite(userInput))
    if (display.innerText === "0") display.innerText = eval("0" + userInput);
    else display.innerText += userInput;

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

  if (userInput === ".") {
    if (display.innerText !== "0") {
      let floatNumber = display.innerText.split(/(\+)|(\-)|(\*)|(\/)/);
      if (
        floatNumber.includes("+") ||
        floatNumber.includes("-") ||
        floatNumber.includes("*") ||
        floatNumber.includes("/")
      ) {
        floatNumber[5] = "0.";
        display.innerText = floatNumber.join("");
      } else display.innerText += ".";
    } else display.innerText += ".";
  }

  if (userInput === "√") {
    if (display.innerText !== "0") {
      let sqrtNumber = display.innerText.split(/(\+)|(\-)|(\*)|(\/)/);
      if (
        sqrtNumber.includes("+") ||
        sqrtNumber.includes("-") ||
        sqrtNumber.includes("*") ||
        sqrtNumber.includes("/")
      ) {
        sqrtNumber[5] = Math.sqrt(sqrtNumber[5]).toFixed(1);
        display.innerText = eval(sqrtNumber.join(""));
      } else {
        display.innerText = Math.sqrt(display.innerText).toFixed(1);
      }
    } else display.innerText = "0";
  }

  if (userInput === "%") {
    if (display.innerText !== "0") {
      let percentage = display.innerText.split(/(\+)|(\-)|(\*)|(\/)/);
      let value = ((percentage[5] * percentage[0]) / 100).toFixed(1);
      percentage[5] = value;
      display.innerText = eval(percentage.join(""));
    } else display.innerText = "0";
  }

  if (userInput === "x2") {
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
  }

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

  if (display.innerText.length > 13) display.style.fontSize = "25px";

  if (display.innerText.length > 19) display.style.fontSize = "22px";

  if (display.innerText.length > 23) display.style.fontSize = "19px";

  if (display.innerText.length > 27) {
    display.style.fontSize = "16px";
    display.style.overflow = "hidden";
  }

  if (isFinite(event.key))
    if (display.innerText === "0") display.innerText = eval("0" + event.key);
    else display.innerText += event.key;

  if (event.key === "c" || event.key === "C") display.innerText = "0";

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

  if (event.key === "Backspace")
    if (display.innerText.length > 1)
      display.innerText = display.innerText.substring(
        0,
        display.innerText.length - 1
      );
    else display.innerText = "0";

  if (event.key === ".") {
    if (display.innerText !== "0") {
      let floatNumber = display.innerText.split(/(\+)|(\-)|(\*)|(\/)/);
      if (
        floatNumber.includes("+") ||
        floatNumber.includes("-") ||
        floatNumber.includes("*") ||
        floatNumber.includes("/")
      ) {
        floatNumber[5] = "0.";
        display.innerText = floatNumber.join("");
      } else display.innerText += ".";
    } else display.innerText += ".";
  }

  if (event.key === "=" || event.key === "Enter") {
    Number.isInteger(eval(display.innerText))
      ? (display.innerText = eval(display.innerText))
      : (display.innerText = eval(display.innerText).toFixed(1));
    return (finish = true);
  }
};

const memoryHandler = (userInput) => {
  if (userInput === "m+") {
    let calculate = eval(display.innerText);
    memoryNumbers.push(calculate * 1);
    display.innerText = "saved";
    setTimeout(() => {
      display.innerText = calculate;
    }, 1500);
  } else if (userInput === "m-") {
    let calculate = eval(display.innerText);
    memoryNumbers.push(calculate * -1);
    display.innerText = "saved";
    setTimeout(() => {
      display.innerText = calculate;
    }, 1500);
  } else if (userInput === "mrc") {
    let result =
      memoryNumbers.length === 0
        ? "0"
        : memoryNumbers.reduce((previous, current) => previous + current);
    memoryNumbers = [];
    memoryNumbers.push(result);
    display.innerText = result;
  }
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
        (item === "+" || item === "-" || item === "*" || item === "/") &&
        (char[index - 1] === "+" ||
          char[index - 1] === "-" ||
          char[index - 1] === "*" ||
          char[index - 1] === "/")
      )
        return count++ < repeat;

      count = 1;
      return true;
    })
    .join("");
};
