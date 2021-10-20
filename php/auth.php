<?php
    $login = trim($_POST["login"]);
    $password  = trim($_POST["password"]);

    $file = file_get_contents('..\db\base.json');
    $data = json_decode($file, true);
    unset($file);  
    $count=0;
    //если в файле есть записи, то проверяем логин и эмейл
    if (count($data) > 0) {
        forEach($data as $key => $value) {
            if (in_array($login, $value)) {
                
            };
        };
    };

?>