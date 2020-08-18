const length = document.getElementById("length");
const height = document.getElementById("height");
const material = document.getElementById("material");
const assembling = document.getElementById("assembling");
const submit = document.getElementById("submit");
const username = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

length.addEventListener('change', required);
height.addEventListener('change', required);
material.addEventListener('change', required);

function required(e) {
    if (length.value === "" || height.value === "" || material.value === "") {
        if (submit.classList.contains("form__button--active")) {
            submit.classList.remove("form__button--active");
            submit.classList.add("form__button--disabled");
            submit.disabled = true;
        }
    } else {
        submit.classList.remove("form__button--disabled");
        submit.classList.add("form__button--active");
        submit.disabled = false;
    }
}

length.addEventListener('change', calculate);
height.addEventListener('change', calculate);
material.addEventListener('change', calculate);
assembling.addEventListener('change', calculate);

function calculate(e) {
    if (length.value === "" || height.value === "" || material.value === "") {
        document.getElementById("form__sum-total").innerHTML = "0";
    } else {
        const price = calc(
            parseInt(length.value),
            parseInt(height.value),
            parseInt(material.value),
            assembling.checked);
        document.getElementById("form__sum-total").innerHTML = `${price}`;
    }
}

function calc(height, length, price, isAssemble) {
    let total =  height * length * price;
    if (isAssemble) {
        total = total + 200
    }
    return total
}

const lengthUnit = document.getElementById("length-unit");
length.addEventListener('change', (event) => {
    plural(lengthUnit, event.target.value, ["метр", "метра", "метров"])
});

const heightUnit = document.getElementById("height-unit");
height.addEventListener('change', (event) => {
    plural(heightUnit, event.target.value, ["метр", "метра", "метров"])
});

function plural(element, countStr, words) {
    let count = parseInt(countStr);
    let text;
    if (count === 1) {
        text = words[0]
    } else if (count > 1 && count < 5) {
        text = words[1]
    } else {
        text = words[2]
    }
    element.innerHTML = text
}

    // Проверяем фокус
    phone.addEventListener('focus', _ => {
      // Если там ничего нет или есть, но левое
      if(!/^\+\d*$/.test(phone.value))
        // То вставляем знак плюса как значение
        phone.value = '+';
    });

    phone.addEventListener('keypress', e => {
      // Отменяем ввод не цифр
      if(!/\d/.test(e.key))
        e.preventDefault();
    });

    username.addEventListener('change', required);
    email.addEventListener('change', required);
    phone.addEventListener('change', required);

    function required(e) {
        if (username.value === "" || email.value === "" || phone.value === "") {
            if (submit.classList.contains("form__button--active")) {
                submit.classList.remove("form__button--active");
                submit.classList.add("form__button--disabled");
                submit.disabled = true;
            }
        } else {
            submit.classList.remove("form__button--disabled");
            submit.classList.add("form__button--active");
            submit.disabled = false;
        }
    }