<?php
$CONTACTUS_FILE_PATH = '/idiom_land/contactus.txt';
$MB40 = 41943040; //40 Mb in bytes

/* Protect from DDOS */
$currentFileSize = filesize($CONTACTUS_FILE_PATH);
if ($currentFileSize !== FALSE && $currentFileSize > $MB40) {
    exit("Error occurred!");
}

$contactData = sprintf("name: %s %semail: %s %smessage: %s %s%s",
    $_POST['name'], PHP_EOL,
    $_POST['email'], PHP_EOL,
    $_POST['message'], PHP_EOL, PHP_EOL
);
file_put_contents($CONTACTUS_FILE_PATH, $contactData, FILE_APPEND);
echo "Ok";
