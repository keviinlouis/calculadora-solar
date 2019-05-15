<?php
/**
 * Created by PhpStorm.
 * User: Louis
 * Date: 14/05/2019
 * Time: 23:21
 */

// Read JSON file
$json = file_get_contents('./public/estados.json');

//Decode JSON
$estados = json_decode($json, true);
$requestsSended = 0;
function getCidade($url)
{
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'ORIGIN: http://localhost:8080',
        'Content-Type: application/json',
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}
function saveCidade($cidade, $indexEstado, $indexCidade){
    $json = file_get_contents('./public/estados.json');

    //Decode JSON
    $estados = json_decode($json, true);
    $estado = $estados[$indexEstado];
    $estado['cidades'][$indexCidade] = $cidade;
    $estados[$indexEstado] = $estado;
    $json = json_encode($estados);
    file_put_contents('./public/estados.json', $json);
}
$countEstados = count($estados);
foreach ($estados as $index => $estado) {
    echo 'Estado '.$index.' de '.$countEstados.PHP_EOL;
    $countCidades = count($estado['cidades']);

    foreach ($estado['cidades'] as $indexCidade => $cidade) {
        if(isset($cidade['ghi'])){
            continue;
        }
        echo 'Cidade '.$indexCidade.' de '.$countCidades.PHP_EOL;
        $url = "http://localhost:8081/https://globalsolaratlas.info/api/data/lta?loc=" . $cidade["latitude"] . "," . $cidade["longitude"];
        if($requestsSended > 22) {
            echo 'Max request reach, wait 10 seconds'.PHP_EOL;
            sleep(10);
            $requestsSended = 0;
        }
        $requestsSended++;
        $response = json_decode(getCidade($url), true);
        $cidade["ghi"] = $response["GHI"];
        saveCidade($cidade, $index, $indexCidade);
    }
}
