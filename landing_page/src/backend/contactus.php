<?php
$CONTACTUS_FILE_PATH = '/idiom_land/contactus.txt';
$MB40 = 41943040; //40 Mb in bytes

/* Protect from DDOS */
$currentFileSize = filesize($CONTACTUS_FILE_PATH);
if ($currentFileSize !== FALSE && $currentFileSize > $MB40) {
    exit("Error occurred!");
}

$RECAPTCHA_URL = "https://www.google.com/recaptcha/api/siteverify";
$RECAPTCHA_SECRET = "6Ld8if8SAAAAAMgqAKpB6Use0ECmDHUaikQwHF6z";

if (!isset($_POST["g-recaptcha-response"])) {
    exit("Captcha wasn't filled");
}
$recaptcha_response = $_POST["g-recaptcha-response"];

$verification_url = sprintf("%s?secret=%s&response=%s&remoteip=%s",
    $RECAPTCHA_URL,
    $RECAPTCHA_SECRET,
    $recaptcha_response,
    $_SERVER['REMOTE_ADDR']
);

$verification_result_json = file_get_contents($verification_url);
$verification_result = json_decode($verification_result_json);

if (!$verification_result->success) {
    exit("Captcha error");
}

$contactData = sprintf("name: %s %semail: %s %smessage: %s %s%s",
    $_POST['name'], PHP_EOL,
    $_POST['email'], PHP_EOL,
    $_POST['message'], PHP_EOL, PHP_EOL
);
file_put_contents($CONTACTUS_FILE_PATH, $contactData, FILE_APPEND);
echo "Ok";
