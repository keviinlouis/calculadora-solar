let axios = require('axios');
const fs = require('fs');
const estados = require('./public/estados.json');

async function getCidadeGhi(cidade) {
    if (cidade.ghi) {
        return cidade
    }
    if (promisses > 10) {
        console.log('Number of calling is over 10, wait 5 seconds');
        await setTimeout(() => {
        }, 5000);
        console.log('5 seconds has passed, you can now continue...');
        promisses = 0
    }
    console.log(`Calling Global Solar For ${cidade.cidade}`);
    const url = "http://localhost:8081/https://globalsolaratlas.info/api/data/lta?loc=" + cidade.latitude + "," + cidade.longitude;
    promisses++;
    const response = JSON.parse(await axios.get(url));
    cidade.ghi = response["GHI"];
    saveCidade(cidade);
    return cidade
}

function saveCidade(cidade){
    console.log('Saving Cidade '+cidade.cidade)
    const indexEstado = estados.findIndex(estado => estado.estado === cidade.estado)
    const estado = estados[indexEstado]
    const indexCidade = estado.cidades.findIndex(itemCidade => itemCidade.cidade === cidade.cidade)
    estado.cidades.splice(indexCidade, 1, cidade);
    estados.splice(indexEstado, 1, estado)
    const json = JSON.stringify(estados);
    fs.writeFile('./estados.json', json, () => {
    });
}

async function getEstados(estado) {
    estado.cidades = await Promise.all(estado.cidades.map(cidade => getCidadeGhi(cidade)));
    return estado
}

let promisses = 0;

const getData = async () => {
    const newEstados = await Promise.all(estados.map(estado => getEstados(estado)));
    console.log(newEstados[0].cidades[0]);

    console.log('Saving All Data');
    const json = JSON.stringify(newEstados);

    fs.writeFile('./new_estados.json', json, () => {
    });
};
console.log('Starting...');
getData();




