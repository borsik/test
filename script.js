const fenceChoicePage = document.querySelector ('.page__section--fence');
const userContactsPage = document.querySelector ('.page__section--contacts');
const orderMessagePage = document.querySelector ('.page__section--message');
const fenceChoiceForm = document.querySelector ('.page__form--fence');
const userContactsForm = document.querySelector ('.page__form--contacts');

const fenceLength = document.querySelector ('#length');
const fenceHeight = document.querySelector ('#height');
const fenceMaterial = document.querySelector ('#material');
const fenceAssembling = document.querySelector ('#assembling');
const fencePrice = document.querySelector ('.sum-total');
const fenceSubmit = document.querySelector ('.form__button--further');
const lengthUnit = document.querySelector('#length-unit');
const heightUnit = document.querySelector('#height-unit');
const userName = document.querySelector ('#user-name');
const userEmail = document.querySelector ('#user-email');
const userPhone = document.querySelector ('#user-phone');
const orderSubmit = document.querySelector ('.form__button--order');
const fenceLengthValue = document.querySelector ('#length-value');
const fenceHeightValue = document.querySelector ('#height-value');
const fenceMaterialValue = document.querySelector ('#material-item');
const fencePriceValue = document.querySelector ('#sum-total-value');
const userNameValue = document.querySelector ('#user-name-value');
const userEmailValue = document.querySelector ('#user-email-value');
const userPhoneValue = document.querySelector ('#user-phone-value');


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
        var price = calc(
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

    fenceLength.addEventListener('change', required);
    fenceHeight.addEventListener('change', required);
    fenceMaterial.addEventListener('change', required);

    fenceLength.addEventListener('change', calculate);
    fenceHeight.addEventListener('change', calculate);
    fenceMaterial.addEventListener('change', calculate);
    fenceAssembling.addEventListener('change', calculate);

    fenceLength.addEventListener('change', (event) => { plural(lengthUnit, event.target.value) });
    fenceHeight.addEventListener('change', (event) => { plural(heightUnit, event.target.value) });

    userName.addEventListener('change', requiredContacts);
    userEmail.addEventListener('change', requiredContacts);
    userPhone.addEventListener('change', requiredContacts);

    userPhone.addEventListener('focus', function() {
        if(!/^\+\d*$/.test(userPhone.value))
          userPhone.value = '+';
      });
    userPhone.addEventListener('keypress', function(e) {
        if(!/\d/.test(e.key))
          e.preventDefault();
      });


    fenceChoiceForm.addEventListener('submit', function(evt){
        evt.preventDefault();
        fenceChoicePage.classList.add('hidden-section');
        userContactsPage.classList.remove('hidden-section');
        fenceLengthValue.innerHTML = fenceLength.value;
        fenceHeightValue.innerHTML = fenceHeight.value;
        fenceMaterialValue.innerHTML = fenceMaterial.value;
    });

    userContactsForm.addEventListener('submit', function(evt){
        evt.preventDefault();
        userContactsPage.classList.add('hidden-section');
        orderMessagePage.classList.remove('hidden-section');
        userNameValue.innerHTML = userName.value;
        userEmailValue.innerHTML = userEmail.value;
        userPhoneValue.innerHTML = userPhone.value;
    });
