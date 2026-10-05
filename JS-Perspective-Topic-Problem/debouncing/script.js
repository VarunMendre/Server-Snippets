const inputElement = document.querySelector("input");

const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const handleInput = (e) => {
  console.log(e.target.value);
};

const debouncedCallAPi = debounce(handleInput, 500);
inputElement.addEventListener("input", debouncedCallAPi);
