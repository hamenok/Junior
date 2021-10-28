window.addEventListener('DOMContentLoaded', ()=>{
    const logOff = document.querySelector('#logOFF');
//функция закрытия сессии
    logOff.addEventListener('click', (e)=>{
        e.preventDefault();
        $.ajax({
            url: '/',
            type: 'POST',
            data:"logOFF=true",
            success: function( data){
                location.reload();
            }
        });
    });
});
    