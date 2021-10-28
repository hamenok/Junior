<?php
    $login = trim($_POST["login"]);
    $password  = trim($_POST["password"]);

    include 'includes.php';
    $data = readJSON();
    $countU=0; //кол-во не верных логинов
    //если в файле есть записи, то проверяем логин и эмейл
    if (count($data) > 0) {
        $salt = 'junior';
        $hash = md5(sha1($password . $salt));
        
        forEach($data as $key => $value) {
            if (in_array($login, $value)) {              
                if (in_array($hash, $value)) {
                    session_start();
                    $_SESSION['login'] = $login;
                    $_SESSION['password'] = $hash;
                   exit('Reload');     
                } else {
                    echo 'NO_PASSWORD';
                }
            } else {
                $countU = $countU + 1;
            }
        };
        if ($countU == count($data)) {
            echo 'NO_USER';
        }
    };
?>