<?php
$subject =  $_POST["category"];
$to = 'contato@arcestatistica.com.br';

if ($subject == "1"){
    $subject = 'Atendimento';
}
else if ($subject == "2"){
    $subject = 'Suporte Técnico';
    $to = 'neto_conte@hotmail.com';
}

if (isset($_POST["copy"])){
    $to =  $to. ', ' . $_POST["email"];
}

$message = wordwrap($_POST["message"], 70);

$result = mail($to, $subject, $message, 
    "From: " . $_POST["name"] . " <". $_POST["email"] . "> \r\n");
if ($result)
    echo 'Email enviado com Sucesso';
else
    echo "Falha ao enviar o email";
?>