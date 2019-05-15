let fs = require('fs');

const inputPath = './lat.csv'
fs.readFile(inputPath, 'utf8', function (err, data) {
    let dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
    processFile(dataArray)
})

function processFile(content) {
    let jsonObj = [];
    let headers = content[0].split(',');
    for(let i = 1; i < content.length; i++) {
        let data = content[i].split(',');
        let obj = {};
        for(let j = 0; j < data.length; j++) {
            obj[headers[j].trim().toLowerCase()] = data[j].trim();
        }
        jsonObj.push(obj);
    }
    const json = JSON.stringify(jsonObj);

    fs.writeFile('./new_cidades.json', json, () => {})
}
