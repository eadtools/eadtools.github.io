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
                    <a class="btn btn-success" onclick="AppPage(${app.id})" role="button">Ver mais</a>
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
                <a onclick="AppPage(${app.id})" class="btn btn-success">Ver</a>
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

function AppPage(id2){
    let xhr3 = new XMLHttpRequest();
    xhr3.onload = function Page(){
        let w = window.open('app.html', '_blank');
        let texto = '';
        let dispcomplete = '';
        let dadosp = JSON.parse(this.responseText);
        dados = dadosp.aplicativos;
        let app = dados[id2-1];
        for(j=2; j<app.Dispositivo.length;j++){
            dispcomplete = dispcomplete + `/${app.Dispositivo[j]}`;
        }
        texto = texto + `
        <!doctype html>
        <html lang="pt-br">
          <head>
            <title>${app.Nome}</title>
            <!-- Required meta tags -->
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <!-- Bootstrap CSS -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
            <script src="https://kit.fontawesome.com/4498db3338.js" crossorigin="anonymous"></script>
            <link href="style.css" rel="stylesheet">
            <body>
                <div class="header">
                    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
                        <div class="container-fluid">
                          <a class="navbar-brand" href="#"><img id="imagemi" src="eadtools_white-removebg.png" class="img" alt="..."></a>
                          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                          </button>
                          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                              <a class="nav-link" aria-current="page" href="index.html">Home</a>
                              <a class="nav-link active" aria-current="page" href="apli.html">Aplicações</a>
                              <a class="nav-link" aria-current="page" href="#">Saiba mais</a>
                              <a class="nav-link" aria-current="page" href="login.html">Login</a>
                            </div>
                          </div>
                        </div>
                      </nav>
                </div>
                <div class="container-fluid" id="containerGeral">
                    <div class="row">
                        <div class="col-12 col-md-2" id="filtros">
                          <div class="appinfo_apppage" id="appinfo_apppage">
                            <img src="${app.img}" width="170" alt="">
                            <h2>${app.Nome}</h2>
                            <p>Nota:</p>
                            <p><span>${app.Nota}/10</span></p>
                            <p>Dispositivo:</p>
                            <p>${app.Dispositivo[1]+dispcomplete}</p>
                          </div>
                        </div>
                        <div class="col">
                            <div class="applicativo" id="colaApp">
                                <div class="row" id="app">
                                    <h3>Sobre o App</h3>
                                    <p>${app.Descrição}</p>
                                    ${app.video}
                                    <h3>Onde encontrar</h3>
                                    <p>Vá para a página da aplicação clicando aqui: <a href="${app.local}">${app.local}</a></p>
                                    <h3>Dicas de uso</h3>
                                    <p>${app.dica}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <script src="script.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
          </body>
        </html>
        `;
        //w.document.getElementById('colaApp').innerHTML = texto;
        w.document.write(`<p>${texto}</p>`);
    };
    xhr3.open('GET','db.json');
    xhr3.send();
}

document.onload = listarApps();
document.onload = destaqueApps();
