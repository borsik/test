const fenceChoicePage = document.querySelector ('.page__section--fence');
const userContactsPage = document.querySelector ('.page__section--contacts');
const orderMessagePage = document.querySelector ('.page__section--message');
const fenceChoiceForm = document.querySelector ('.page__form--fence');
const userContactsForm = document.querySelector ('.page__form--contacts');
const requiredInputs = document.querySelectorAll ('.form-required');
const formCheck = document.querySelectorAll ('.form__check');
const formWarning = document.querySelectorAll ('.form__input--warning');
const formInput = document.querySelectorAll ('.form__input');
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
const fenceMaterialName = document.querySelector ('#material-item');
const userNameValue = document.querySelector ('#user-name-value');
const userEmailValue = document.querySelector ('#user-email-value');
const userPhoneValue = document.querySelector ('#user-phone-value');
let fenceLengthUnitValue = document.querySelector ('#length-unit-value');
let fenceHeightUnitValue = document.querySelector ('#height-unit-value');
let fencePriceValue = document.querySelector ('#sum-total-value');
let orderNumberValue = document.querySelector ('#order-number');
let materialName = 0;
let price = 0;
let textLength = 0;
let textHeight = 0;
let count = 0;
let words = ["метр", "метра", "метров"];
let orderCount = 1;


requiredInputs.forEach(function(item) {
    if (!item.value) {
        formCheck.forEach(function(check) {
            check.classList.add('hide-check');
        })
    } else if (item.classList.contains('hide-check')) {
        formCheck.forEach(function(check) {
            check.classList.remove('hide-check');
        })
    }
});

formInput.forEach(function(item) {
    item.addEventListener('blur', function() {
        if (!item.value) {
            item.classList.add('form__input--invalid');
            formWarning.forEach(function(warn) {
                warn.classList.remove('hidden');
            })
        } else if (item.classList.contains('form__input--invalid')) {
            item.classList.remove('form__input--invalid');
            formWarning.forEach(function(warn) {
                warn.classList.add('hidden');
            })
        }
    })
});

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

function getFenceMaterialName() {
    let space = " ";
    let selectedFenceMaterial = fenceMaterial.options[fenceMaterial.selectedIndex].text;
    let arrayOfStrings = selectedFenceMaterial.split(space);
    materialName = arrayOfStrings[0];
    return materialName
} 

function calc(height, length, price, isAssemble) {
    let total =  height * length * price;
    if (isAssemble) {
        total = total + 200;
    }
    return total
}

function calculate() {
    if (!fenceLength.value || !fenceHeight.value || !fenceMaterial.value) {
        fencePrice.innerHTML = '0';
    } else {
        price = calc(
            parseInt(fenceLength.value),
            parseInt(fenceHeight.value),
            parseInt(fenceMaterial.value),
            fenceAssembling.checked);
        fencePrice.innerHTML = `${price}`;
    }
}

function pluralLength(element, countStr) {
    count = parseInt(countStr);
    if (count === 1) {
        textLength = words[0]
    } else if (count > 1 && count < 5) {
        textLength = words[1]
    } else {
        textLength = words[2]
    }
    element.innerHTML = textLength
}

function pluralHeight(element, countStr) {
    count = parseInt(countStr);
    if (count === 1) {
        textHeight = words[0]
    } else if (count > 1 && count < 5) {
        textHeight = words[1]
    } else {
        textHeight = words[2]
    }
    element.innerHTML = textHeight;
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

function orderNumber() {
    orderCount++;
    return orderCount;
}

    fenceLength.addEventListener('change', required);
    fenceHeight.addEventListener('change', required);
    fenceMaterial.addEventListener('change', required);

    fenceLength.addEventListener('change', calculate);
    fenceHeight.addEventListener('change', calculate);
    fenceMaterial.addEventListener('change', calculate);
    fenceAssembling.addEventListener('change', calculate);

    fenceLength.addEventListener('change', (event) => { pluralLength(lengthUnit, event.target.value) });
    fenceHeight.addEventListener('change', (event) => { pluralHeight(heightUnit, event.target.value) });

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
        getFenceMaterialName();
        fenceChoicePage.classList.add('hidden-section');
        userContactsPage.classList.remove('hidden-section');
        fenceLengthValue.innerHTML = fenceLength.value;
        fenceHeightValue.innerHTML = fenceHeight.value;
        fenceMaterialName.innerHTML = materialName;
        fenceLengthUnitValue.innerHTML = textLength;
        fenceHeightUnitValue.innerHTML = textHeight;
        fencePriceValue.innerHTML = `${price}`;
    });

    userContactsForm.addEventListener('submit', function(evt){
        evt.preventDefault();
        userContactsPage.classList.add('hidden-section');
        orderMessagePage.classList.remove('hidden-section');
        userNameValue.innerHTML = userName.value;
        userEmailValue.innerHTML = userEmail.value;
        userPhoneValue.innerHTML = userPhone.value;
        orderNumberValue.innerHTML = orderCount;
    });
