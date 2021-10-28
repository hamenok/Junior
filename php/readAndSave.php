<?php
    //чтение json-файла
    function readJSON() {
        $file = file_get_contents('../db/base.json');
        $data = json_decode($file, true); 
        unset($file);

        return $data;
    }
    //запись в json-файл
    function saveJSON($data) {
        file_put_contents('../db/base.json',json_encode($data));
        unset($data);
    }
?>