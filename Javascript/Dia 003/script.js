var question = document.querySelector('.question');
var options = document.querySelector('.options');
var buttons = document.querySelector('.buttons');

var techs = [];

function frontend() {
    question.innerHTML = 'Qual tecnologia você deseja aprender?';
    options.innerHTML = `
                            <input type="radio" name="web" id="react">
                            <label for="react">React</label>

                            <input type="radio" name="web" id="vue">
                            <label for="vue">Vue</label>
                        `
}

function backend() {
    question.innerHTML = 'Qual tecnologia você deseja aprender?';
    options.innerHTML = `
                            <input type="radio" name="web" id="c#">
                            <label for="c#">C#</label>

                            <input type="radio" name="web" id="java">
                            <label for="java">Java</label>
                        `
}

function nextSteps() {
    question.innerHTML = '';
    options.innerHTML = `
                            <input type="radio" name="web" id="next">
                            <label for="next">Especialista</label>

                            <input type="radio" name="web" id="full">
                            <label for="full">Fullstack</label>
                        `
}

function skills(opt) {
    if (opt == 'next') {
        var condition = 'se especializar';
    } else {
        var condition = 'aprender';
    }

    question.innerHTML = `Qual tecnologia você gostaria de ${condition}?`;
    options.innerHTML = `
                            <input type="text" name="skill" id="skill">
                        `;
    buttons.innerHTML = `
                            <input type="button" value="Cancelar" id="cancel" onclick="cancel()">
                            <input type="button" value="Mais" id="more" onclick="more()">
    `
}

function cancel() {
    question.className = 'final'
    question.innerHTML = `
                            <spam>Tecnologias para aprender:</spam>
                            ${techs}
    `
    options.innerHTML = '';
    buttons.innerHTML = '';
}

function more(opt) {
    var tech = document.querySelector("#skill").value;
    techs.push(tech);

    skills(opt);
    console.log(`Techs: ${techs}`)
}

document.querySelector('#send').addEventListener('click', () => {
    var opts = document.getElementsByName('web');

    for (var i = 0; i < opts.length; i++) {
        if (opts[i].checked) {
            if (opts[i].id == 'front') {
                frontend();
            } else if (opts[i].id == 'back') {
                backend();
            } else if (opts[i].id == 'next' || opts[i].id == 'full') {
                skills(opts[i].id);
            } else {
                nextSteps();
            }
        }
    }
});