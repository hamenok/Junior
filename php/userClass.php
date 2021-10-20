<?php
    //описываем объект пользователя
    class User {
        //свойства объекта
        public $login;
        public $password;
        public $email;
    
        //конструктор класса
        function __construct($login,$password,$email) {
            $this->login = $login;
            $this->password = $password;
            $this->email = $email;
        }
        //метод шифрования пароля
        function cryptoPSWD(){
            $salt = uniqid('', true);
            $hash = sha1($password . $salt);
            $this->password = $hash;
        }
    }
?>