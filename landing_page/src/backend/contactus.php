<?php
$CONTACTUS_FILE_PATH = '/idiom_land_testing/contactus.txt';
$MB40 = 41943040; //40 Mb in bytes

/* Protect from DDOS */
$currentFileSize = filesize($CONTACTUS_FILE_PATH);
if ($currentFileSize !== FALSE && $currentFileSize > $MB40) {
    exit("Error occurred!");
}

$CAPTCHA_FIELD = "cpt";
$CAPTCHA_SECRET = "G6UexKe6XL";

if (!isset($_POST[$CAPTCHA_FIELD])) {
    exit("Captcha wasn't filled");
}

if ($_POST[$CAPTCHA_FIELD] !== $CAPTCHA_SECRET) {
    exit("Captcha error");
}

$contactData = sprintf("name: %s %semail: %s %smessage: %s %s%s",
    $_POST['name'], PHP_EOL,
    $_POST['email'], PHP_EOL,
    $_POST['message'], PHP_EOL, PHP_EOL
);
file_put_contents($CONTACTUS_FILE_PATH, $contactData, FILE_APPEND);
echo "Ok";
