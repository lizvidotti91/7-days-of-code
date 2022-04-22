var frutas = ['maçã', 'banana', 'abacate', 'abacaxi'];
var vegetais = ['alface', 'rúcula', 'agrião', 'abobrinha'];
var laticínios = ['mussarela', 'leite', 'iogurte', 'manteiga'];
var congelados = ['peito de frango', 'filé', 'bisteca', 'sobrecoxa'];

var title = document.querySelector('.title');
var items = document.querySelector('.items');
var buttons = document.querySelector('.buttons');

function item() {
    title.innerHTML = 'Qual item deseja inserir?';
    items.className += ' new-item';
    items.innerHTML = `
                        <input type="text" class="item">
                        <ul class="categories">
                            <li class="categorie">
                                <input type="radio" name="lists" id="frutas">
                                <label for="frutas">Frutas</label>
                            </li>

                            <li class="categorie">
                                <input type="radio" name="lists" id="vegetais">
                                <label for="vegetais">Vegetais</label>
                            </li>

                            <li class="categorie">
                                <input type="radio" name="lists" id="laticinios">
                                <label for="laticinios">Laticínios</label>
                            </li>

                            <li class="categorie">
                                <input type="radio" name="lists" id="congelados">
                                <label for="congelados">Congelados</label>
                            </li>
                        </ul>
                    `
    buttons.innerHTML = `
                        <input type="button" value="Ver lista" class="cancel" onclick="print_list()">
                        <input type="button" value="Adicionar" class="add" onclick="add_list()">
    `
}

function categories_check() {
    var categories = document.getElementsByName('lists');
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].checked) {
            return categories[i].id;
        }
    }
}

function categories_unchecked() {
    var categories = document.getElementsByName('lists');
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].checked) {
            categories[i].checked = false;
        }
    }
}

function is_valid() {
    var is_checked = false;
    var is_empty = false;

    var categories = document.getElementsByName('lists');
    var item = document.querySelector('.item').value;

    for (var i = 0; i < categories.length; i++) {
        if (categories[i].checked) {
            is_checked = true;
        }
    }

    if (item == '') {
        is_empty = true;
    }

    if (!is_checked || is_empty) {
        alert('Preencha os campos corretamente');
        return false;
    } else {
        return true;
    }
}

function reload() {
    window.location.reload();
}

function add_list() {
    if (is_valid()) {
        var item_input = document.querySelector('.item');
        var item = item_input.value;
        var categorie = categories_check();
        console.log(categorie)
        if (categorie == 'frutas') {
            frutas.push(item);
            console.log("frutas", frutas);
        } else if (categorie == 'vegetais') {
            vegetais.push(item);
            console.log("vegetais", vegetais);
        } else if (categorie == 'laticinios') {
            laticínios.push(item);
            console.log("laticinios", laticínios);
        } else if (categorie == 'congelados') {
            congelados.push(item);
            console.log("congelados", congelados);
        }
        item_input.value = '';
        categories_unchecked();
    }
}

function print_list() {
    items.className += ' new-item';
    items.innerHTML = `
        <b>Lista de compras:</b>
        <ul>
            <li><b>Frutas:</b> ${frutas}</li>
            <li><b>Vegetais:</b> ${vegetais}</li>
            <li><b>Laticínios:</b> ${laticínios}</li>
            <li><b>Congelados:</b> ${congelados}</li>
        </ul>
    `;

    buttons.innerHTML = `
                        <input type="button" value="Voltar" class="add" onclick="reload()">
    `
}

function remove_page() {
    items.className += ' new-item';
    items.innerHTML = `
        <b>Lista de compras:</b>
        <ul>
            <li><b>Frutas:</b> ${frutas}</li>
            <li><b>Vegetais:</b> ${vegetais}</li>
            <li><b>Laticínios:</b> ${laticínios}</li>
            <li><b>Congelados:</b> ${congelados}</li>
        </ul>
        <div style="margin-top: 3vh;">
            <label for="remove-item">Qual item você deseja remover?</label>
            <input type="text" class="item" id="remove-item">
        </div>
    `;

    buttons.innerHTML = `
                        <input type="button" value="Voltar" class="cancel" onclick="reload()">
                        <input type="button" value="Remover" class="add" onclick="remove_item()">
    `
}

function remove_item() {
    var remove_item = document.querySelector('#remove-item').value;
    var index_frutas = frutas.indexOf(remove_item);
    var index_vegetais = vegetais.indexOf(remove_item);
    var index_laticinios = laticínios.indexOf(remove_item);
    var index_congelados = congelados.indexOf(remove_item);

    if (index_frutas > -1) {
        frutas.splice(index_frutas, 1);
    } else if (index_vegetais > -1) {
        vegetais.splice(index_vegetais, 1);
    } else if (index_laticinios > -1) {
        laticínios.splice(index_laticinios, 1);
    } else if (index_congelados > -1) {
        congelados.splice(index_congelados, 1);
    } else {
        alert('Não foi possível encontrar o item na lista de compras')
    }

    remove_page();
}

document.querySelector('.next').addEventListener('click', item);

document.querySelector('.cancel').addEventListener('click', remove_page);