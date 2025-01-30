<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "amshuhu_task";

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

$status = $_POST['status'] ?? 0;
$email = $_POST['email'] ?? '';

$sql = "UPDATE user_list SET status = ? WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $status, $email);
$success = $stmt->execute();

echo json_encode(["success" => $success]);
$stmt->close();
$conn->close();



