// Функция проверки слова на палиндром
const isPalindrome = (initialString) => {
  const finalString = initialString.replace(/[.,/#!$%^&*;:{}=\-—–_`~() ]/g, '').toLowerCase();
  const length = finalString.length;
  let firstLetter = 0;
  let lastLetter = -1;
  let result = true;

  // цикл, последовательно сравнивающий первые и последние символы
  for (let i = 1; i <= length / 2; i++) {
    if (finalString.at(firstLetter) !== finalString.at(lastLetter)) {
      result = false;
      break;
    }
    firstLetter++;
    lastLetter--;
  }

  return result;
};

// Функция по извлечению цифр из строки
const getNumbers = (initialString) => {
  const finalString = initialString.toString().replaceAll(' ', '');
  const length = finalString.length;
  let result = '';
  let numberFromLetter;

  for (let i = 0; i < length; i++) {
    numberFromLetter = +finalString[i];
    if (isNaN(numberFromLetter) !== true) {
      result += finalString[i];
    }
  }

  return parseInt(result, 10);
};

// Функция на добавление символов до указанной длины
const addSymbols = (string, minLength, initialAddition) => {

  const finalAdditionLength = minLength - string.length;

  let currentAddition = '';
  let result;
  let finalAddition;

  // в цикле получаем цельную "добавку", без добивки отдельными символами
  while (currentAddition.length + initialAddition.length <= finalAdditionLength) {
    currentAddition += initialAddition;
  }

  // теперь добиваем, если не хватает
  const lengthLacking = finalAdditionLength - currentAddition.length;

  if (lengthLacking === 0) {
    finalAddition = currentAddition;
    result = finalAddition + string;
    return result;
  }

  finalAddition = initialAddition.slice(0, lengthLacking) + currentAddition;
  result = finalAddition + string;
  return result;
};

// Функция на соответствие строки указанной длине
const checkLength = (string, maxLength) => string.length <= maxLength;


isPalindrome('топот');
getNumbers('2023 год');
addSymbols('1', 2, '0');
checkLength('проверяемая строка', 20);
