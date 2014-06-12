<?php
$EMAIL_FILE_PATH = '/idiom_land/emails.txt';
$MB40 = 41943040; //40 Mb in bytes

/* Protect from DDOS */
$currentFileSize = filesize($EMAIL_FILE_PATH);
if ($currentFileSize !== FALSE && $currentFileSize > $MB40) {
    exit("Error occurred!");
}

$emailData = sprintf("%s %s", $_POST['email'], PHP_EOL);
file_put_contents($EMAIL_FILE_PATH, $emailData, FILE_APPEND);
echo "Ok";
