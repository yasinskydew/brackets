module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const openBrackets = new Map();
  const closeBrackets = new Map();
  let equalBrackets = new Map();
  let index = 0;

  for (const [open, close] of bracketsConfig) {
    openBrackets.set(open, close);
    closeBrackets.set(close, open);
  }

  if(!!(str.length % 2)) return false;

  for (const char of str) {
    if (openBrackets.has(char)) {
      if (openBrackets.get(char) == char && !equalBrackets.has(char)) {
        equalBrackets.set(char, index);
      } else {
        stack.push(char);
      }
    }
    
    if (closeBrackets.has(char)) {
      if (
        stack[stack.length - 1] === closeBrackets.get(char)
      ) {
        if (closeBrackets.get(char) == char) {
          const equalIndex = equalBrackets.get(char);
          if(equalIndex !== index && !!((index - equalIndex) % 2)) {
            equalBrackets.delete(char)
            stack.pop();
          }
        } else {
          stack.pop();
        }
      }
    }
    index++;
  }
  return stack.length === 0;
}