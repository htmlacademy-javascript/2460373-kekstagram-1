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
