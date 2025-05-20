<?php
$host = "localhost";
$db = "назва_вашої_бази";
$user = "користувач";
$pass = "пароль";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Помилка з'єднання: " . $conn->connect_error);
}
?>
