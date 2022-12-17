const divident = "8";
const divisor = "2";
const result = parseInt(divident / divisor);
let dividentToReduce = divident;
const valuesToSubtractFrom = [];
const valuesToSubtract = [];
let x = 0;

for (let i = 0; i < divident.length; i++) {
  if (dividentToReduce.length == 0 || Number(dividentToReduce) < divisor) break;
  let item = dividentToReduce[0];
  if (item == 0) {
    valuesToSubtractFrom.push(item);
    valuesToSubtract.push((item - (item % divisor)).toString());
  } else {
    while (item / divisor < 1) {
      x++;
      item += dividentToReduce[x];
    }
    valuesToSubtractFrom.push(item);
    valuesToSubtract.push((item - (item % divisor)).toString());
  }
  dividentToReduce = dividentToReduce.replace(item, item % divisor == 0 ? "" : (item % divisor).toString());
  x = 0;
}

const valuesToSubtractLength = valuesToSubtract.length;

console.log(valuesToSubtractFrom);
console.log(valuesToSubtract);

const drawer = (divident, divisor, result) => {
  let space = "";
  let lastValueIndex = 0;

  const calculateSpace = (valueToSubtractFrom, valueToSubtract) => {
    const condition = valueToSubtractFrom.length - (valueToSubtractFrom - valueToSubtract).toString().length;
    if (condition > 0) return (space += " ".repeat(condition));
  };

  let finalString =
    "_" +
    divident +
    " |" +
    divisor +
    "\n " +
    valuesToSubtract[0] +
    " ".repeat(divident.length - valuesToSubtract[0].length) +
    " |" +
    result +
    "\n";

  for (let i = 1; i < valuesToSubtractLength; i++) {
    if (valuesToSubtract[i] != 0) lastValueIndex = i;
    if (valuesToSubtractFrom[i - 1] - valuesToSubtract[i - 1] == 0) {
      space += " ".repeat(valuesToSubtract[i - 1].length);
      if (valuesToSubtract[i] != 0) {
        finalString +=
          space +
          "_" +
          valuesToSubtractFrom[i] +
          "\n " +
          space +
          " ".repeat(valuesToSubtractFrom[i].length - valuesToSubtract[i].length) +
          valuesToSubtract[i] +
          "\n";
      }
    } else {
      calculateSpace(valuesToSubtractFrom[i - 1], valuesToSubtract[i - 1]);
      if (valuesToSubtract[i] != 0) {
        finalString +=
          space +
          "_" +
          valuesToSubtractFrom[i] +
          "\n " +
          space +
          " ".repeat(valuesToSubtractFrom[i].length - valuesToSubtract[i].length) +
          valuesToSubtract[i] +
          "\n";
      }
    }
  }

  const lastValue = valuesToSubtractFrom[lastValueIndex] - valuesToSubtract[lastValueIndex];

  finalString +=
    " " + space + " ".repeat(valuesToSubtractFrom[lastValueIndex].length - lastValue.toString().length) + lastValue;
  return finalString;
};

console.log(drawer(divident, divisor, result));
