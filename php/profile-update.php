<?php
// Заголовки
header('Content-Type: application/json');

// 1. Отримуємо JSON і розшифровуємо його
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Некоректний запит']);
    exit;
}

// 2. Підключення до БД
$mysqli = new mysqli('localhost', 'user', 'password', 'your_database');
if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Помилка з\'єднання з БД']);
    exit;
}

// 3. Екранування даних
$name     = $mysqli->real_escape_string($input['name'] ?? '');
$dob      = $mysqli->real_escape_string($input['dob'] ?? '');
$phone    = $mysqli->real_escape_string($input['phone'] ?? '');
$region   = $mysqli->real_escape_string($input['region'] ?? '');
$org      = $mysqli->real_escape_string($input['org'] ?? '');
$coach    = $mysqli->real_escape_string($input['coach'] ?? '');
$rozryad  = $mysqli->real_escape_string($input['rozryad'] ?? '');
$katehor  = $mysqli->real_escape_string($input['katehor-suddi'] ?? '');

// 🔐 Замінити це на ID користувача з сесії
$userId = 1;

// 4. Оновлення даних
$query = "
  UPDATE users SET
    name = '$name',
    dob = '$dob',
    phone = '$phone',
    region = '$region',
    org = '$org',
    coach = '$coach',
    rozryad = '$rozryad',
    katehor_suddi = '$katehor'
  WHERE id = $userId
";

if (!$mysqli->query($query)) {
    http_response_code(500);
    echo json_encode(['error' => 'Помилка оновлення даних']);
    exit;
}

// 5. Повернення оновлених даних
echo json_encode([
    'name' => $name,
    'dob' => $dob,
    'phone' => $phone,
    'region' => $region,
    'org' => $org,
    'coach' => $coach,
    'rozryad' => $rozryad,
    'katehor-suddi' => $katehor
]);
