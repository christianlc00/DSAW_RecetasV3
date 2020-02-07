let nElementos = 0;

window.addEventListener('DOMContentLoaded', (event) => {
    let btn = document.getElementById('agregarElemento');
    let cardContainer = document.getElementById('contenedorElementos');

    btn.addEventListener('click', () => {
        cardContainer.appendChild(generarElemento());
    });
});

function generarElemento() {
    nElementos++;

    let html = document.createElement('div');
    let divHeader = document.createElement('div');
    let cardTitle = document.createElement('h5');
    let cardTitleText = document.createTextNode(`Elemento ${nElementos}`);
    let deleteBtn = document.createElement('div');
    let deleteBtnIcon = document.createElement('div');
    let divBody = document.createElement('div');
    let divFooter = document.createElement('div');


    html.classList.add('card', 'text-center', 'mt-2');
    divHeader.classList.add('card-header', 'd-flex', 'justify-content-between', 'align-items-center');
    cardTitle.classList.add('card-title');
    deleteBtn.style.cursor = 'pointer';
    deleteBtnIcon.classList.add('fas', 'fa-times', 'text-danger');
    divBody.classList.add('card-body');
    divFooter.classList.add('card-footer', 'text-muted');

    html.appendChild(divHeader);
    divHeader.appendChild(cardTitle);
    cardTitle.appendChild(cardTitleText);
    divHeader.appendChild(deleteBtn);
    deleteBtn.appendChild(deleteBtnIcon);
    html.appendChild(divBody);
    divBody.appendChild(generarCampoElemento('Ingrediente', 'ingrediente', 'text'));
    divBody.appendChild(generarCampoElemento('Cantidad', 'cantidad', 'number'));
    divBody.appendChild(generarCampoElemento('Unidad', 'unidad', 'text'));
    html.appendChild(divFooter);

    deleteBtn.addEventListener('click', () => {
        html.parentElement.removeChild(html);
    })

    return html;
}

function generarCampoElemento(titulo, nombreCampo, tipoInput) {
    let html = document.createElement('div');
    let label = document.createElement('label');
    let labelTexto = document.createTextNode(titulo);
    let col = document.createElement('div');
    let input = document.createElement('input');

    html.classList.add('form-group', 'row');
    label.classList.add('col-sm-2', 'col-form-label');
    label.setAttribute('for', nombreCampo);
    col.classList.add('col-sm-10');
    input.classList.add('form-control');
    input.setAttribute('type', tipoInput);
    input.setAttribute('name', `elementos[${nombreCampo}]`);

    html.appendChild(label);
    label.appendChild(labelTexto);
    html.appendChild(col);
    col.appendChild(input);

    return html;
}

function loadImage(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    if (file) reader.readAsDataURL(file);

    reader.addEventListener('load', e => {
        document.getElementById('imgPreview').src = reader.result;
    });
}

document.getElementById('imagen').addEventListener('change', loadImage);