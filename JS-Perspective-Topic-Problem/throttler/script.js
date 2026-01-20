const inputElement = document.querySelector("input");
const span = document.querySelector("h2 span");

const callApi = function (value) {
  console.log("Api Called", value);
};

const logInput = throttle(callApi, 1000);

inputElement.addEventListener("input", (e) => {
  logInput.call({ name: "Varun" }, e.target.value);
});

// const updateNumber = throttle(() => {
//   span.innerText = ++span.innerText;
// }, 100);

// document.addEventListener("mousemove", () => {
//   updateNumber();
// });

function throttle(fn, delay = 1000) {
  let firstCall = true;
  let timerId = null;
  let lastArgs = [];
  return function (...args) {
    lastArgs = args;
    if (firstCall) {
      fn.apply(this, args);
      firstCall = false;
    }

    if (timerId) return;

    timerId = setTimeout(() => {
      timerId = null;
      fn.apply(this, lastArgs);
    }, delay);
  };
}
