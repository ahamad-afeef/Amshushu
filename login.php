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
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

// Prepare SQL query
$stmt = $conn->prepare("SELECT password FROM login WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

// Check if user exists
if ($row = $result->fetch_assoc()) {
    if ($password === $row['password']) { 
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid password"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "User not found"]);
}

// Close connection
$stmt->close();
$conn->close();
