<?php
    function createUser($log,$pswd,$mail) {
        //считываем json-файл
        $file = file_get_contents('..\db\base.json');
        $data = json_decode($file, true);
        unset($file);  
        $count=0;
        //если в файле есть записи, то проверяем логин и эмейл
        if (count($data) > 0) {
            forEach($data as $key => $value) {
                if (in_array($log, $value) || in_array($mail, $value)) {
                    $count = $count + 1;
                };
            };
        };
        //если нет совпадений в файле, то создаём новый экземпляр класса и его записываем в json-файл
        if ($count < 1) {
            $login1= new User($log,$pswd,$mail);
                $login1->cryptoPSWD();
                $data[]=$login1;
                file_put_contents('..\db\base.json',json_encode($data));
                unset($data);
                $count = 0;
        };
    };
?>