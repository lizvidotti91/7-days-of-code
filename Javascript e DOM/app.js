let form = document.querySelector('#wrapper-form');
let table = document.querySelector('#result table');

let labelName = document.querySelector('#label-name');
let name = document.querySelector('#form-name');
let labelBirth = document.querySelector('#label-birth');
let birth = document.querySelector('#form-birth');

let span = document.createElement('span');

let indexToRemove;

function birhtMonth() {
    let date = new Date();
    let currentMonth = date.getMonth() + 1;

    const list = JSON.parse(localStorage.getItem('pessoas'));
    if (list) {
        for (index in list) {
            let month = list[index].nascimento.split('-').splice(1, 1);
            if (month == currentMonth) {
                let newLine = document.createElement('li');
                newLine.textContent = `
                    ${list[index].nascimento.split('-').splice(2, 1)} - 
                    ${list[index].nome}
                `;
                document.querySelector('.current-birth ul').appendChild(newLine);
            }
        }
    }
}

function popUp(index) {
    document.querySelector('.pop-up').style.display = 'flex';
    form.style.opacity = .5;
    document.querySelector('#result').style.opacity = .5;
    indexToRemove = index;
}

function removeRow() {
    const list = JSON.parse(localStorage.getItem('pessoas'));
    list.splice(indexToRemove, 1);

    localStorage.setItem('pessoas', JSON.stringify(list));
    table.innerHTML = `
            <tr>
                <th>Nome</th>
                <th>Nascimento</th>
            </tr>
            `;
    getData();
    document.querySelector('.pop-up').style.display = 'none';
    form.style.opacity = 1;
    document.querySelector('#result').style.opacity = 1;
}

function cancelAction() {
    document.querySelector('.pop-up').style.display = 'none';
    form.style.opacity = 1;
    document.querySelector('#result').style.opacity = 1;
}

function editRow(index) {
    const list = JSON.parse(localStorage.getItem('pessoas'));

    let newName = list[index].nome = document.querySelector(`#name-${index}`).value;
    let newBirth = list[index].nascimento = document.querySelector(`#birth-${index}`).value;

    if (newName && newBirth) {
        localStorage.setItem('pessoas', JSON.stringify(list));
        console.log(localStorage);

        document.querySelector(`#name-${index}`).disabled = true;
        document.querySelector(`#birth-${index}`).disabled = true;

        document.querySelector(`#edit-${index}`).style.display = 'block';
        document.querySelector(`#remove-${index}`).style.display = 'block';

        document.querySelector('.no-border').style.display = 'none';
    } else {
        alert('Preencha os campos corretamente');
    }
}

function activateRow(index) {
    document.querySelector(`#name-${index}`).disabled = false;
    document.querySelector(`#birth-${index}`).disabled = false;

    document.querySelector(`#edit-${index}`).style.display = 'none';
    document.querySelector(`#remove-${index}`).style.display = 'none';

    document.querySelector('.no-border').style.display = 'block';
}

function getData() {
    const list = JSON.parse(localStorage.getItem('pessoas')) || [];

    console.log(list);
    for (index in list) {
        table.innerHTML += `
            <tr id='row-${index}'>
                <td>
                    <i class='edit-icon' id='edit-${index}' onclick="activateRow(${index})">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M421.7 220.3L188.5 453.4L154.6 419.5L158.1 416H112C103.2 416 96 408.8 96 400V353.9L92.51 357.4C87.78 362.2 84.31 368 82.42 374.4L59.44 452.6L137.6 429.6C143.1 427.7 149.8 424.2 154.6 419.5L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3zM492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75z"/></svg>
                    </i>
                    <i class='remove-icon' id='remove-${index}' onclick='popUp(${index})'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg>
                    </i>
                    <input type='text' id='name-${index}' value='${list[index].nome}' disabled>
                </td>
                <td>
                    <input type='date' id='birth-${index}' value='${list[index].nascimento}' disabled>
                </td >
                <td class='no-border'>
                    <input type='button' id='btn-${index}' class='btn-edit' onclick='editRow(${index})' value='Editar'>
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
        document.querySelector('.current-birth ul').innerHTML = ''
        birhtMonth();
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
window.onload = birhtMonth();