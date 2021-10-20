<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Junior PHP</title>
    <link rel="stylesheet" href="/css/main.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    
</head>
<body>
    <header>
        <div>
            Hello, Гость!
        </div>
    </header>
    <ul>
        <li><a href='/pages/registrationForm.html'>Регистрация</a></li>
        <li><a href='/pages/authForm.html'>Авторизация</a></li>
    </ul>
    <main class="container">

    
    <noscript>
        <div>К Сожалению без включенного JavaScript<br> Регистрация не возможна</div>
    </noscript>
    <?php
    function readJSON() {
        $file = file_get_contents('../db/base.json');
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

</main>
<script type="text/javascript" src="/js/registration.js" ></script>
<script type="text/javascript" src="/js/main.js"></script>

</body>
</html>