<?php 
    $file = file_get_contents('..\db\base.json');         // Открыть файл data.json
    $data=json_decode($file,TRUE);   // Декодировать в массив  
    unset($file);        
    //Ищем совпадение по эмейл и удаляем, если найдено
    foreach ( $data  as $key => $value){        
        if (in_array($_POST["email"], $value)) {  
                    unset($data[$key]);  
            };
        };
    file_put_contents('..\db\base.json',json_encode($data)); //Сохранить данные в json.
    unset($data);   
    exit('Reload');
?>