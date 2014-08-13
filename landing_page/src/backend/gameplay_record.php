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

$strDateTime = date("D_M_d_Y_G_i_s_P");
$randStr = generateRandomString(5);

$replayFilePath = $REPLAYS_DIR_PATH . 'replay_'
    . $levelName . '_'
    . 'ip_' . getClientIP() . '_'
    . $strDateTime . '_'
    . $randStr
    . '.json';

file_put_contents($replayFilePath, $replay, 0);
echo "Ok";

function getClientIP() {
    if ( isset($_SERVER['HTTP_CLIENT_IP']) && ! empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif ( isset($_SERVER['HTTP_X_FORWARDED_FOR']) && ! empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = (isset($_SERVER['REMOTE_ADDR'])) ? $_SERVER['REMOTE_ADDR'] : '0.0.0.0';
    }

    $ip = filter_var($ip, FILTER_VALIDATE_IP);
    $ip = ($ip === false) ? '0.0.0.0' : $ip;

    return $ip;
}

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomString;
}
