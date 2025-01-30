<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "amshuhu_task";

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

$email = $_POST['email'] ?? '';
$sql = "DELETE FROM user_list WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$success = $stmt->execute();

echo json_encode(["success" => $success]);
$stmt->close();
$conn->close();
