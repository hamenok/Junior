window.addEventListener('DOMContentLoaded', () => {

    const navAuth = document.querySelector('#navAuth'),
        content = document.querySelector('.container');

        navAuth.addEventListener('click', (e) => {
        e.preventDefault();
        showRegistrationPage();
    });
  
    function showRegistrationPage() {
        $.ajax({
            url: '/pages/authForm.php',
            method: 'GET',
            success: function (page) {
                content.innerHTML = page;
                checkForm();
            }
        });
    }
    //функция проверки данных введённых в форму регистрации
    function checkForm() {

        const login = document.querySelector('#login'),
            password = document.querySelector('#password'),
            btn = document.querySelector('form button');
        //функция добавления класса, если ошибка      
        function addError(element, msgError) {
            element.classList.add('error');
            element.setAttribute('title', msgError);
        }
        //функция удаления класса, если нет ошибки 
        function removeError(element) {
            element.classList.remove('error');
            element.removeAttribute('title');
        }
        //событие проверки ввода логина 
        if (login != null) {
            login.addEventListener('blur', () => {
                if (login.value.length < 6) {
                    addError(login, 'Не корректный логин');
                } else {
                    removeError(login);
                }
            });
        }
        //событие проверки ввода пароля
        if (password != null) {
            password.addEventListener('blur', () => {
                const reg = /^[A-ZА-Яa-zа-я]+[0-9]+$|[0-9]+[A-ZА-Яa-zа-я]+$/;
                if (password.value.length < 6 || !reg.test(password.value)) {
                    addError(password, 'Не корректный пароль');
                } else {
                    removeError(password);
                }
            });
        }
       
        //событие отправки данных формы
        if (btn != null) {
            btn.addEventListener('click', (e) => {
                //проверка логина и пароля
                if (login.value.length < 1 || login.value == null) {
                    addError(login, 'Не корректный логин');
                }
                if (password.value.length < 1 || password.value == null) {
                    addError(password, 'Не корректный пароль');
                }
    
                e.preventDefault();
                if (!login.classList.contains('error') && !password.classList.contains('error')) {
                   //отправляем данные для авторизации
                    $.ajax({
                        url: '/php/auth.php',
                        type: 'POST',
                        data: "login="+login.value+"&password="+password.value,
                        success: function (data) {
                            if (data=='NO_USER'){
                                $().toastmessage('showErrorToast', "Такого пользователя не существует");
                            }
                            if (data=='NO_PASSWORD'){
                                $().toastmessage('showWarningToast', "Введён не корректный пароль! Попробуйте ещё раз");
                            }
                            if (data=='Reload') {
                                location.reload();
                            }
                        }
                    });
                }
            });
        }
    }
});