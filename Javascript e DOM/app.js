let form = document.querySelector('.wrapper-form');
let result = document.querySelector('.result');

function getData(e) {
    let name = document.querySelector('#form-name').value;
    let birth = document.querySelector('#form-birth').value;

    result.textContent = `${name} nasceu em ${birth.split('-').reverse().join('/')}`;
    e.preventDefault();
}

form.addEventListener('submit', getData);