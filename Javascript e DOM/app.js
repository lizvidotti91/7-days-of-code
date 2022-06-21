let form = document.querySelector('.wrapper-form');
let table = document.querySelector('.result table');

let labelName = document.querySelector('#label-name');
let name = document.querySelector('#form-name');
let labelBirth = document.querySelector('#label-birth');
let birth = document.querySelector('#form-birth');

let span = document.createElement('span');

function editRow(index) {
    const list = JSON.parse(localStorage.getItem('pessoas'));
    let newName = document.querySelector(`#name-${index}`).value;
    let newBirth = document.querySelector(`#birth-${index}`).value;

    list[index].nome = newName;
    list[index].nascimento = newBirth;

    localStorage.setItem('pessoas', JSON.stringify(list));
    console.log(localStorage);

    document.querySelector(`#name-${index}`).disabled = true;
    document.querySelector(`#birth-${index}`).disabled = true;
    document.querySelector(`#btn-${index}`).disabled = true;
}

function activateRow(index) {
    document.querySelector(`#name-${index}`).disabled = false;
    document.querySelector(`#birth-${index}`).disabled = false;
    document.querySelector(`#btn-${index}`).disabled = false;
}

function getData() {
    const list = JSON.parse(localStorage.getItem('pessoas')) || [];

    console.log(list);
    for (index in list) {
        table.innerHTML += `
            <tr>
                <td>
                    <i class='edit-icon' onclick="activateRow(${index})">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M421.7 220.3L188.5 453.4L154.6 419.5L158.1 416H112C103.2 416 96 408.8 96 400V353.9L92.51 357.4C87.78 362.2 84.31 368 82.42 374.4L59.44 452.6L137.6 429.6C143.1 427.7 149.8 424.2 154.6 419.5L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3zM492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75z"/></svg>
                    </i>
                    <input type='text' id='name-${index}' value='${list[index].nome}' disabled>
                </td>
                <td>
                    <input type='date' id='birth-${index}' value='${list[index].nascimento}' disabled>
                </td >
                <td class='no-border'>
                    <input type='button' id='btn-${index}' class='btn-edit' onclick='editRow(${index})' value='Editar' disabled>
                </td>
            </tr>
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