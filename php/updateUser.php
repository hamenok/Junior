<?php
    function readJSON() {
        $file = file_get_contents('db\base.json');
        $data = json_decode($file, true); 
        unset($file);

        return $data;
    }

    $countID=0;
    $data = readJSON();
    echo '<div id="tableUser">';
    
    echo '<table>';
            
    echo '<th>№</th><th>Логин</th><th>Пароль</th><th>Почта</th><th>Действие</th>';
    if (count($data) > 0) {
        forEach($data as $arr) {
            $countID = $countID + 1;
            echo '<tr>';
            echo "<td>$countID</td>";
            forEach($arr as $key => $value){
               echo "<td>$value</td>";
            
            }
 
            echo "<td><button id='remove' name=$value>Удалить </button></td>";
            echo '</tr>';
        };
    };
    
    echo '</table>';
   
    echo '</div>';





?>