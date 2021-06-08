function exibeApp(){
    let rowApp = document.getElementById('colApp');
    let texto = '';

    let dados = JSON.parse(this.responseText);
    for (i=0; i<dados.aplicativos.length;i++){
        let app = dados.aplicativos[i];
        let dispcomplete = '';
        for(j=1; j<app.Dispositivo.length;j++){
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
                <p><span>Dispositivo:</span> ${app.Dispositivo[0]+dispcomplete}</p>
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



function listarApps (){
    let xhr = new XMLHttpRequest ();
    xhr.onload = exibeApp;
    xhr.open('GET','db.json');
    xhr.send();
}

document.onload = listarApps();