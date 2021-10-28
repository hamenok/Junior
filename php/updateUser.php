<?php 
    include 'includes.php';
    $data = readJSON();
    //Ищем совпадение изменяемых данных, если нашли, то меняем, если пароль меняем, то его ещё и шифруем
    foreach ( $data  as $key => $value){        
        if (in_array($_POST["dataOld"], $value)) {  
            if ($_POST["nameKey"]=="password") {
                $salt = 'junior';
                $hash = md5(sha1($_POST["dataNew"] . $salt));
                $data[$_POST["key"]-1][$_POST["nameKey"]]=$hash; 
            } else {
                $data[$key][$_POST["nameKey"]]=$_POST["dataNew"];
            }    
        };
    };
    saveJSON($data);
    exit('Reload');
?>