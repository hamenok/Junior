<?php
    include 'includes.php';
    //Получаем данные с формы регистрации
    $login = trim($_POST["login"]);
    $password  = trim($_POST["password"]);
    $confirm_password = trim($_POST["confirm_password"]);
    $email  = trim($_POST["email"]);

    //вызываем функцию "регистрации"
    createUser($login,$password,$email);

?>