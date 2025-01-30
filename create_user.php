<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "amshuhu_task";

// Connect to MySQL
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

// Get input values
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$phone = $_POST['phone'] ?? '';
$state = $_POST['state'] ?? '';
$country = $_POST['country'] ?? '';

// Check if email already exists
$stmt = $conn->prepare("SELECT email FROM user_list WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email already exists"]);
    exit;
}

// Insert the new user into the database
$sql = "INSERT INTO user_list (name, email, password, phone, state, country) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $name, $email, $password, $phone, $state, $country);
$success = $stmt->execute();

echo json_encode(["success" => $success]);
$stmt->close();
$conn->close();
