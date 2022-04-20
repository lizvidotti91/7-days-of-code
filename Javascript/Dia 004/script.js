var result = document.querySelector(".result");
var count_choices = 1;
var random;

function random_interval() {
    return Math.floor(Math.random() * (10 - 0 + 1) + 0);
}

function new_game() {
    window.location.reload();
}

function guess_number() {
    if (document.querySelector('.send').value == 'Enviar') {
        var input = document.querySelector('#number');
        var number = input.value;

        if (count_choices == 1) {
            random = random_interval();
        }

        if (number == random) {
            document.querySelector('.send').value = 'Nova Partida';
            result.innerHTML = 'Parabéns! Você acertou!'
            count_choices = 1;
        } else if (number != random && count_choices < 3) {
            input.value = '';
            result.innerHTML = 'Tente novamente';
        } else if (number != random && count_choices == 3) {
            document.querySelector('.send').value = 'Nova Partida';
            result.innerHTML = `Que pena! O número sorteado foi ${random}`;
        }

        count_choices++;
        if (count_choices > 3) {
            count_choices = 1;
        }
    } else {
        new_game();
    }
}

document.querySelector('.send').addEventListener('click', guess_number);