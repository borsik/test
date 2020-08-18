const fenceInput = document.querySelectorAll ('.form__input--number');
const fenceLength = document.querySelector ('#length');
const fenceHeight = document.querySelector ('#height');
const fenceMaterial = document.querySelector ('#material');
const fenceAssembling = document.querySelector ('#assembling');
const fencePrice = document.querySelector ('.form__sum-total');
const fenceUnits = document.querySelectorAll ('.form__unit');
const fenceSubmit = document.querySelector ('.form__button--further');

function required(event) {
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

fenceLength.addEventListener('change', required);
fenceHeight.addEventListener('change', required);
fenceMaterial.addEventListener('change', required);

function calc(height, length, price, isAssemble) {
    let total =  height * length * price;
    if (isAssemble) {
        total = total + 200
    }
    return total
}

function calculate(event) {
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

fenceLength.addEventListener('change', calculate);
fenceHeight.addEventListener('change', calculate);
fenceMaterial.addEventListener('change', calculate);
fenceAssembling.addEventListener('change', calculate);

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

[].forEach.call(fenceInput,function(el) {
    el.addEventListener('change', function(event) {
        plural(fenceUnits, event.target.value, ["метр", "метра", "метров"])
    });
});
