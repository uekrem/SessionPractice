<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
session_start();

try {
    $db = new PDO("mysql:host=localhost;dbname=todos", "root", "");
} catch(PDOException $e) {
    echo $e->getMessage();
}

$email = $_POST["email"];
$pass = $_POST["password"];
$query = $db->prepare("SELECT * FROM user_table WHERE email = :email AND pass = :pass");
$query->execute([
    "email" => $email,
    "pass" => $pass
]);
$user = $query->fetch(PDO::FETCH_ASSOC);

if ($user) {
    $_SESSION['user_id'] = $user['id']; 
    echo json_encode(true);
} else {
    echo json_encode(false);
}
?>
