window.addEventListener('DOMContentLoaded', () => {

//выполняем запрос на выполнение функции удаления элементы
const tt = document.querySelectorAll("#remove");

tt.forEach(elem => {
elem.addEventListener('click', () => {
$.ajax({
    url: '/php/removeUser.php',
    type: 'POST',
    data: "email="+elem.getAttribute('name'),
    success: function(data) {
        if(data === 'Reload') //тот самый Reload, который можно заменить на что угодно
            location.reload();
        console.log('Удалилось');
    }
});
});
});


});
