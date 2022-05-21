<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$headers = "From:" . $email;

mail(
  'teresaraivaribeiro@gmail.com',
  'Message from website',
  "Name: " . $name . "\n Email: " . $email . "\n Message: " . $message,
  $headers
);

echo "Mail Sent. Thank you!";
