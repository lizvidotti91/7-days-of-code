var screen = document.querySelector('.screen');
var operation = '';

function catch_value(e) {
    var element = e.target.id;
    if (element == 'equal') {
        screen.innerHTML = eval(operation);
    } else if (element == 'clear') {
        screen.innerHTML = '';
        operation = '';
    } else {
        screen.innerHTML += element;
        operation += element;
    }
}

document.querySelector('.board').addEventListener('click', catch_value);