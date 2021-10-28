window.addEventListener('DOMContentLoaded', () => {

    const navReg = document.querySelector('#navReg'),
        content = document.querySelector('.container');

    navReg.addEventListener('click', (e) => {
        e.preventDefault();
        showRegistrationPage();
    });

    function showRegistrationPage() {
        $.ajax({
            url: '/pages/registrationForm.php',
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
            confirm_password = document.querySelector('#confirm_password'),
            email = document.querySelector('#email'),
            btn = document.querySelector('form button'),
            forms = document.querySelectorAll('form');
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
        //событие проверки совпадения подтверждения пароля
        if (confirm_password != null) {
            confirm_password.addEventListener('input', () => {
                if (password.value.length < 6 || confirm_password.value != password.value) {
                    addError(confirm_password, 'Пароль не введён!');
                } else {
                    removeError(confirm_password);
                }
            });
        }
        //событие проверки эмейла
        if (email != null) {
            email.addEventListener('blur', () => {
                const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                if (!reg.test(email.value)) {
                    addError(email, 'Не корректный email');
                } else {
                    removeError(email);
                }
            });
        }
        //событие отправки данных формы
        if (btn != null) {
            btn.addEventListener('click', (e) => {

                if (login.value.length < 1 || login.value == null) {
                    addError(login, 'Не корректный логин');
                }
                if (password.value.length < 1 || password.value == null) {
                    addError(password, 'Не корректный пароль');
                }
                if (confirm_password.value.length < 1 || confirm_password.value == null) {
                    addError(confirm_password, 'Пароль не совпадает');
                }
                if (email.value.length < 1 || email.value == null) {
                    addError(email, 'Не корректный email');
                }
                e.preventDefault();
                if (!login.classList.contains('error') && !password.classList.contains('error') &&
                    !confirm_password.classList.contains('error') && !email.classList.contains('error')) {
                    //асинхронная функция отправки данных 
                    const sendUser = async (formData) => {
                        const fetchResp = await fetch('/php/post.php', {
                            method: 'POST',
                            body: formData
                        });
                        if (!fetchResp.ok) {
                            throw new Error(`Ошибка по адресу ${url}, статус ошибки ${fetchResp.status}`);
                        }
                        return await fetchResp.text();
                    };
                    //собираем данные с формы и передаём в функцию для отправки регистрации
                    forms.forEach(form => {
                        form.addEventListener('click', function (e) {
                            const formData = new FormData(this);
                            sendUser(formData)
                                .then((response) => {
                                    if (response=='ERROR_CREATE_USER'){
                               
                                        $().toastmessage('showErrorToast', "Ошибка ввода или данные уже существуют");
                                    } else {
                                        form.reset(); // очищаем поля формы 
                                       location.reload();
                                    }
                                })
                                .catch((err) => console.error(err));
                        });
                    });
                }
            });
        }
    }
});