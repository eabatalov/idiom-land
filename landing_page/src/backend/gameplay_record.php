<?php
$REPLAYS_DIR_PATH = '/idiom_land/level_replays/';
$MB40 = 41943040; //40 Mb in bytes

$levelName = $_POST['level_name'];
$replay = $_POST['gameplay_history'];

if ($levelName === NULL || $replay === NULL) {
    echo "error";
    exit('levelName or replay inputs are not passed');
}

$dataSize = strlen($levelName) + strlen($replay);
if ($dataSize > $MB40) {
    echo "error";
    exit("Too large level replay!");
}

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomString;
}

$strDateTime = date("D_M_d_Y_G_i_s_P") . '_rand' . generateRandomString();

$replayFilePath = $REPLAYS_DIR_PATH . 'replay_' . $levelName . '_' . $strDateTime . '.json';


file_put_contents($replayFilePath, $replay, 0);
echo "Ok";
