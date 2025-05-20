<?php
session_start();
require 'db.php'; // файл з підключенням до бази

$phone = $_POST['phone'];
$password = $_POST['password'];

// Перевірка даних
$sql = "SELECT users.id, users.password, user_profiles.profile_phone 
        FROM users
        JOIN user_profiles ON users.id = user_profiles.user_id
        WHERE user_profiles.profile_phone = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $phone);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        header("Location: profile.php"); // успішний вхід
        exit;
    } else {
        echo "❌ Невірний пароль.";
    }
} else {
    echo "❌ Користувача з таким номером телефону не знайдено.";
}
?>
