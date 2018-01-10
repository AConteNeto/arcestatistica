<?php
require_once 'vendor/autoload.php';

use Sinergi\BrowserDetector\Browser;
use Sinergi\BrowserDetector\Os;

$save = true;

// Iniciando sessão:
if ( ! session_id() ) session_start();

// Verificando usuario:
if (isset($_GET['user'])){
    if ($_GET['user'] == "n370")
    {
        $_SESSION['user'] = "n370";
        $save = false;
    }
    else session_unset();
}

if (isset($_SESSION['user']))
    if ($_SESSION['user'] == "n370") $save = false;

////////////////////////////////////////////////////////////////////////////////

if ($save) {
    // Criando conexão com a base de dados:
    $connection = new mysqli('localhost', 'AConteN370', '357471571c4', 'arcestatistica');
    if ($connection->connect_errno)
    {
        echo("Falha ao conectar-se ao banco. Erro: ".$connection->connect_error);
        exit();
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Início do registro de informações:
    $browser = new Browser();
    $os = new Os();
    
    // Declaração das variáveis:
    $id = null;
    $browserName = $browser->getName()."/".$browser->getVersion();
    $ip = $_SERVER['REMOTE_ADDR'];
    $platform = $os->getName();
    $url = $_SERVER['REQUEST_URI'];

    // Arrumando URL index:
    if ($url == "/") $url = $url."index.php";

    $url = explode("?", $url)[0];
    $aux = explode("/", $url);
    $url = $aux[sizeof($aux) - 1];

    // Registrando a página:
    if ($sql = $connection->query('SELECT id FROM page WHERE url="'.$url.'"')) {
        if ($sql->num_rows > 0){
            while ($row = $sql->fetch_row()){
                $id = $row[0];
            }
        }
        else {
            $sql->close();
            if ($sql = $connection->prepare("INSERT INTO page(url) VALUES (?)")) {
                $sql->bind_param("s", $url);
                $sql->execute();
                $id = $sql->insert_id;
            }
        }
    }
    $sql->close();

    // Registrando o visitante:
    if ($sql = $connection->query('SELECT ip FROM visitor WHERE ip="'.$ip.'"')) {
        if ($sql->num_rows == 0){
            $sql->close();
            if ($sql = $connection->prepare("INSERT INTO visitor(ip, lastAccess) VALUES (?, CURRENT_TIME)")) {
                $sql->bind_param("s", $ip);
                $sql->execute();
            }
        } else {
            $sql->close();
            if ($sql = $connection->prepare("UPDATE visitor SET lastAccess=CURRENT_TIME WHERE ip=?")) {
                $sql->bind_param("s", $ip);
                $sql->execute();
            }
        }
    }
    $sql->close();
    
    // Registrar acesso a página pelo visitante:
    if ($sql = $connection->prepare("INSERT INTO visitorAccessPage VALUES (CURRENT_TIME, ?, ?, ?, ?)")) {
        $sql->bind_param('isss', $id, $ip, $browserName, $platform);
        $sql->execute();
    }
    $sql->close();

    // Fecha a conexão:
    $connection->close();
}
?>