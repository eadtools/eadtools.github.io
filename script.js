function exibeApp(){
    let rowApp = document.getElementById('colApp');
    let texto = '';
    let pesquisa = document.getElementById('pesquisa_app');
    let dadosp = JSON.parse(this.responseText);
    dadosp = dadosp.aplicativos;
    let filtroNota = document.getElementById('filtroNota');
    let filtroCategoria = document.getElementById('filtroCategoria');
    let filtroDispositivo = document.getElementById('filtroDispositivo');
    let filtroPago = document.getElementById('filtroPago');
    let dados = dadosp.filter(item => item.Nota > filtroNota.options[filtroNota.selectedIndex].value);
    dados = dados.filter(item => item.Dispositivo.includes(filtroDispositivo.options[filtroDispositivo.selectedIndex].value));
    dados = dados.filter(item => item.Categoria.includes(filtroCategoria.options[filtroCategoria.selectedIndex].value));
    dados = dados.filter(item => item.Pago.includes(filtroPago.options[filtroPago.selectedIndex].value));
    if(pesquisa.value != ""){
        dados = dados.filter(item => item.Nome.includes(pesquisa.value));
    }
    for (i=0; i<dados.length;i++){
        let app = dados[i];
        let dispcomplete = '';
        for(j=2; j<app.Dispositivo.length;j++){
            dispcomplete = dispcomplete + `/${app.Dispositivo[j]}`;
        }
        texto = texto + `
            <div class="applicativo">
            <div class="row" id="app">
            <div class="col-12 col-md-3" id="picapp">
                <img id="imageapli" src="${app.img}" height="150" width="150" alt=""><br>
                <p id="nota"><span>Nota:</span>
                <span>${app.Nota}</span></p>
            </div>
            <div class="col-md-9 col-12" id="infoapli">
                <h2>${app.Nome}</h2>
                <p><span>Dispositivo:</span> ${app.Dispositivo[1]+dispcomplete}</p>
                <p><span>Descrição:</span> ${app.Descrição}</p>
                <div class="mb-3">
                    <a class="btn btn-success" href="#" role="button">Ver mais</a>
                </div>
            </div>
                <div id="linha-horizontal"></div>
            </div>
        `;
    };

    rowApp.innerHTML = texto;
}

function initApp(){
    let rowApp = document.getElementById('itemsdocar');
    let texto = '';
    let dadosp = JSON.parse(this.responseText);
    dados = dadosp.aplicativos;
    for (i=0; i<4;i++){
        let app = dados[i];
        texto = texto + `
            <div class="col-sm-3">

            <div class="card">
            <div class="card-body">
                <img src="${app.img}" height="100" width="100" alt="">
                <h5 class="card-title">${app.Nome}</h5>
                <p class="card-text"><span>Descrição:</span> ${app.Descrição} <br><span>
                    Nota:</span> ${app.Nota}/10</p>
                <a href="#" class="btn btn-success">Ver</a>
            </div>
            </div>
        </div>
        `;
    };

    rowApp.innerHTML = texto;
}

function listarApps (){
    let xhr = new XMLHttpRequest ();
    xhr.onload = exibeApp;
    xhr.open('GET','db.json');
    xhr.send();
}

function destaqueApps (){
    let xhr2 = new XMLHttpRequest ();
    xhr2.onload = initApp;
    xhr2.open('GET','db.json');
    xhr2.send();
}

document.onload = listarApps();
document.onload = destaqueApps();
