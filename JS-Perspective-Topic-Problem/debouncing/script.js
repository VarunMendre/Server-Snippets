const inputElement = document.querySelector("input");

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const handleInput = (e) => {
  console.log(e.target.value);
};

const debouncedCallAPi = debounce(handleInput, 500);
inputElement.addEventListener("input", debouncedCallAPi);
