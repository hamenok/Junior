window.addEventListener('DOMContentLoaded', () => {

    const navEdit = document.querySelector('#navEdit'),
        content = document.querySelector('.container');

    navEdit.addEventListener('click', (e) => {
        e.preventDefault();
        showEditPage();
    });

    function showEditPage() {
        $.ajax({
            url: '/pages/removeForm.php',
            method: 'GET',
            success: function (page) {
                content.innerHTML = page;

                const btnRemove = document.querySelectorAll("#remove"),
                    inputData = document.querySelectorAll("form input");
                //удаляем не нужную строку
                btnRemove.forEach(elem => {
                    elem.addEventListener('click', (e) => {
                        e.preventDefault();
                        $.ajax({
                            url: '/php/removeUser.php',
                            type: 'POST',
                            data: "email=" + elem.getAttribute('name'),
                            success: function (data) {
                                if (data === 'Reload') //тот самый Reload, который можно заменить на что угодно
                                    showEditPage();
                            }
                        });
                    });
                });

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

                inputData.forEach(item => {
                    //Проверяем ввдимые данные
                    item.addEventListener('input', () => {

                        if (item.getAttribute("name-key") == "login") {
                            if (item.value.length < 6) {
                                addError(item, 'Не корректный логин');
                            } else {
                                removeError(item);
                            }
                        }

                        if (item.getAttribute("name-key") == "password") {
                            const reg = /^[A-ZА-Яa-zа-я]+[0-9]+$|[0-9]+[A-ZА-Яa-zа-я]+$/;
                            if (item.value.length < 6 || !reg.test(item.value)) {
                                addError(item, 'Не корректный пароль');
                            } else {
                                removeError(item);
                            }
                        }

                        if (item.getAttribute("name-key") == "email") {
                            const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                            if (!reg.test(item.value)) {
                                addError(item, 'Не корректный email');
                            } else {
                                removeError(item);
                            }
                        }
                    });
                    //отправляем данные для изменений
                    item.addEventListener('blur', () => {
                        if (!item.classList.contains('error')) {
                            if (item.getAttribute('name') != item.value) {
                                $.ajax({
                                    url: '/php/updateUser.php',
                                    type: 'POST',
                                    data: "dataOld=" + item.getAttribute('name') + "&dataNew=" + item.value + "&nameKey=" + item.getAttribute('name-key') + "&key=" + item.getAttribute('key'),
                                    success: function (data) {
                                        if (data === 'Reload')
                                            showEditPage();
                                    }
                                });
                            } else {
                                item.value = item.getAttribute('name');
                            }
                        }

                    });
                });
            }
        });
    }
});