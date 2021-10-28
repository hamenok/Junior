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
    <script src="popup/jquery.toastmessage.js" type="text/javascript"></script>
  	<link href="popup/css/jquery.toastmessage.css" rel="stylesheet">
</head>
<body>
    <?php
    session_start();
    ?>
    <header>
        <div>
            Hello, 
            <?php 
                if (isset($_SESSION['login'])) {
                    echo $_SESSION['login'];
                } else {
                    echo "Гость";
                }
            ?>
        </div>
    </header>
    <ul>
        <?php 
            if (isset($_POST['logOFF'])) {
                session_destroy();
            }
            if (isset($_SESSION['login'])) {
                echo '<li><a href="#" id="navEdit">Удаление данных</a></li>';
                echo '<li><a href="#" id="logOFF">Выйти</a></li>';
            } else {
                echo '<li><a href="#" id="navReg">Регистрация</a></li>';
                echo '<li><a href="#" id="navAuth">Авторизация</a></li>';
            }
        ?>
    </ul>
    <main class="container">
    </main>
    <script type="text/javascript" src="/js/registration.js"></script>
    <script type="text/javascript" src="/js/edit.js"></script>
    <script type="text/javascript" src="/js/auth.js"></script>
    <script type="text/javascript" src="/js/main.js"></script>
</body>
</html>