const INDEX = document.querySelector("#index");
const NUMBER = document.querySelector("#number");

function FIB() {
    const number = 50;
    let n0 = 0, n1 = 0, n2 = 1, nextTerm;
    let i = 1;

    function addFibonacciNumber() {
        if (i <= number) {

            // INDEX.innerHTML = i;
            // NUMBER.innerHTML = n1
            animateValue(INDEX, i-1, i, 500);
            animateValue(NUMBER, n0, n1, 500);

            nextTerm = n1 + n2;
            n0 = n1
            n1 = n2;
            n2 = nextTerm;
            i++;

            setTimeout(addFibonacciNumber, 1000);
        }
    }

    addFibonacciNumber();
}

const Btn = document.querySelector("#counter-btn");
Btn.addEventListener('click', FIB);


function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }