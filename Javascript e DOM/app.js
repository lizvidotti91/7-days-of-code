let form = document.querySelector('.wrapper-form');
let table = document.querySelector('.result table');

let labelName = document.querySelector('#label-name');
let name = document.querySelector('#form-name');
let labelBirth = document.querySelector('#label-birth');
let birth = document.querySelector('#form-birth');

let span = document.createElement('span');

function getData() {
    const list = JSON.parse(localStorage.getItem('pessoas')) || [];

    console.log(list);
    for (index in list) {
        table.innerHTML += `
            <tr>
                <td>${list[index].nome}</td>
                <td>${list[index].nascimento.split('-').reverse().join('/')}</td >
            </tr >
        `
    }
}

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

function setData(e) {
    e.preventDefault();
    if (isNameValid()) {
        const list = JSON.parse(localStorage.getItem('pessoas')) || [];
        console.log(list);
        let item = {
            'nome': name.value,
            'nascimento': birth.value
        }
        list.push(item);

        localStorage.setItem('pessoas', JSON.stringify(list));
        console.log(localStorage.getItem('pessoas'));

        table.innerHTML = `
            <tr>
                <th>Nome</th>
                <th>Nascimento</th>
            </tr>
            `;
        getData();
        name.value = '';
        birth.value = '';
    }
}

form.addEventListener('submit', setData);

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

window.onload = getData();