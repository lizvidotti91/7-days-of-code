function hello() {
    var name = document.querySelector('#name').value;
    var age = document.querySelector('#age').value;
    var skill = document.querySelector('#skill').value;

    createModal(name, age, skill);
}

function createModal(name, age, skill) {
    var modal = document.createElement('div');
    modal.className = 'modal';

    modal.innerHTML = `
                        <p>
                            Olá, ${name}, você tem ${age} anos e já está aprendendo ${skill}
                        </p>
                        <p>Você gosta de estudar ${skill} ?</p>
                        <p>
                            <input type="radio" name="option" id="yes">
                            <label for="yes" class="opts yes">Sim</label>

                            <input type="radio" name="option" id="no">
                            <label for="no" class="opts no">Não</label>
                        </p>
                       `;

    document.body.appendChild(modal);
}

var send = document.querySelector('#send');
send.addEventListener('click', hello);
