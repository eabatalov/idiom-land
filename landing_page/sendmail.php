<?php
$EMAIL_FILE_PATH = '/idiom_land/emails.txt';

$emailData = sprintf("%s %s %s", $_POST['name'], $_POST['email'], PHP_EOL);
file_put_contents($EMAIL_FILE_PATH, $emailData, FILE_APPEND);
echo "Ok";
