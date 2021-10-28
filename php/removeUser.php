<?php 
    include 'includes.php';
    $data = readJSON();  
    //Ищем совпадение по эмейл и удаляем, если найдено
    foreach ( $data  as $key => $value){        
        if (in_array($_POST["email"], $value)) {  
                    unset($data[$key]);  
            };
        };
    saveJSON($data);
    exit('Reload');
?>