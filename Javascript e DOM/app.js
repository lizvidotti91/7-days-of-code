let form = document.querySelector('.wrapper-form');
let result = document.querySelector('.result');

let labelName = document.querySelector('#label-name');
let name = document.querySelector('#form-name');
let labelBirth = document.querySelector('#label-birth');
let birth = document.querySelector('#form-birth');

let span = document.createElement('span');

function isNameValid() {
    span.textContent = '';
    let nameValue = name.value;
    let regexCaracEspecial = /[^a-zA-Z 0-9]+/g;
    let regexNumber = /[0-9]/;

    if (nameValue.length < 3 || nameValue.length > 120) {
        span.textContent = 'O nome precisa ter no mínimo 3 caracteres e no máximo 120 caracteres.';
        labelName.appendChild(span);
        return false;
    } else if (regexCaracEspecial.test(nameValue) || regexNumber.test(nameValue)) {
        span.textContent = 'O nome não deve conter números ou caracteres especiais.';
        labelName.appendChild(span);
        return false;
    } else {
        return true;
    }
}

function getData(e) {
    e.preventDefault();
    //isNameValid();
    if (isNameValid()) {
        result.textContent = `${name.value} nasceu em ${birth.value.split('-').reverse().join('/')}`;
    }
}

form.addEventListener('submit', getData);

name.oninvalid = function (evt) {
    evt.preventDefault();
    if (!this.validity.valid) {
        span.textContent = 'Campo Obrigatório.';
        labelName.appendChild(span);
        console.log(this);
    }
};

birth.oninvalid = function (evt) {
    evt.preventDefault();
    if (!this.validity.valid) {
        span.textContent = 'Campo Obrigatório.';
        labelBirth.appendChild(span);
        console.log(this.id);
    }
};
