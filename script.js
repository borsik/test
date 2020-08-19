const fencePage = document.querySelector ('.page--order');
const userPage = document.querySelector ('.page--contacts');
const fenceLength = document.querySelector ('#length');
const fenceHeight = document.querySelector ('#height');
const fenceMaterial = document.querySelector ('#material');
const fenceAssembling = document.querySelector ('#assembling');
const fencePrice = document.querySelector ('.form__sum-total');
const fenceSubmit = document.querySelector ('.form__button--further');
const lengthUnit = document.querySelector('#length-unit');
const heightUnit = document.querySelector('#height-unit');
const userName = document.querySelector ('#user-name');
const userEmail = document.querySelector ('#user-email');
const userPhone = document.querySelector ('#user-phone');
const orderSubmit = document.querySelector ('.form__button--order');



function required() {
    if (!fenceLength.value || !fenceHeight.value || !fenceMaterial.value) {
        if (fenceSubmit.classList.contains('form__button--active')) {
            fenceSubmit.classList.remove('form__button--active');
            fenceSubmit.classList.add('form__button--disabled');
            fenceSubmit.disabled = true;
        }
    } else {
        fenceSubmit.classList.remove("form__button--disabled");
        fenceSubmit.classList.add("form__button--active");
        fenceSubmit.disabled = false;
    }
}

function calc(height, length, price, isAssemble) {
    let total =  height * length * price;
    if (isAssemble) {
        total = total + 200
    }
    return total
}

function calculate() {
    if (!fenceLength.value || !fenceHeight.value || !fenceMaterial.value) {
        fencePrice.innerHTML = '0';
    } else {
        const price = calc(
            parseInt(fenceLength.value),
            parseInt(fenceHeight.value),
            parseInt(fenceMaterial.value),
            fenceAssembling.checked);
        fencePrice.innerHTML = `${price}`;
    }
}

function plural(element, countStr) {
    const words = ["метр", "метра", "метров"]
    const count = parseInt(countStr);
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

function requiredContacts() {
    if (!userName.value || !userEmail.value || !userPhone.value) {
        if (orderSubmit.classList.contains('form__button--active')) {
            orderSubmit.classList.remove('form__button--active');
            orderSubmit.classList.add('form__button--disabled');
            orderSubmit.disabled = true;
        }
    } else {
        orderSubmit.classList.remove("form__button--disabled");
        orderSubmit.classList.add("form__button--active");
        orderSubmit.disabled = false;
    }
}

function fenceChoice() {
    fenceLength.addEventListener('change', required);
    fenceHeight.addEventListener('change', required);
    fenceMaterial.addEventListener('change', required);
    fenceLength.addEventListener('change', calculate);
    fenceHeight.addEventListener('change', calculate);
    fenceMaterial.addEventListener('change', calculate);
    fenceAssembling.addEventListener('change', calculate);
    fenceLength.addEventListener('change', (event) => { plural(lengthUnit, event.target.value) });
    fenceHeight.addEventListener('change', (event) => { plural(heightUnit, event.target.value) });
};

function userContacts() {
    userName.addEventListener('change', requiredContacts);
    userEmail.addEventListener('change', requiredContacts);
    userPhone.addEventListener('change', requiredContacts);
        // Проверяем фокус
    userPhone.addEventListener('focus', _ => {
        // Если там ничего нет или есть, но левое
        if(!/^\+\d*$/.test(userPhone.value))
          // То вставляем знак плюса как значение
          userPhone.value = '+';
      });
  
    userPhone.addEventListener('keypress', e => {
        // Отменяем ввод не цифр
        if(!/\d/.test(e.key))
          e.preventDefault();
      });
};

