    <noscript>
        <div>К Сожалению без включенного JavaScript<br> Регистрация не возможна</div>
    </noscript>
    <?php
    include '../php/includes.php';
    $data = readJSON();
    $countID=0;
    echo '<div id="tableUser">';
    echo '<form>';
    echo '<table>';
            
    echo '<th>№</th><th>Логин</th><th>Пароль</th><th>Почта</th><th>Действие</th>';
    if (count($data) > 0) {
        forEach($data as $arr) {
            $countID = $countID + 1;
            echo '<tr>';
            echo "<td>$countID</td>";
            forEach($arr as $key => $value){
               echo "<td><input type='text' name=".$value." name-key=".$key." key=".$countID." value=".$value."></td>";
            }
            echo "<td><button id='remove' name=$value>Удалить </button></td>";
            echo '</tr>';
        };
    };
    echo '</table>';
    echo '</form>';
    echo '</div>';
    
?>
