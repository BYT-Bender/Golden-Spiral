const INDEX = document.querySelector(".index");
const NUMBER = document.querySelector(".number");

function FIB() {
    const number = 100;
    let n1 = 0, n2 = 1, nextTerm;
    let i = 1;

    function addFibonacciNumber() {
        if (i <= number) {

            INDEX.innerHTML = i;
            NUMBER.innerHTML = n1

            nextTerm = n1 + n2;
            n1 = n2;
            n2 = nextTerm;
            i++;

            setTimeout(addFibonacciNumber, 200);
        }
    }

    addFibonacciNumber();
}

const Btn = document.querySelector("#counter-btn");
Btn.addEventListener('click', FIB);