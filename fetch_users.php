<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "amshuhu_task";

// Connect to database
$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

// Fetch user list
$sql = "SELECT name, email, state, country, status FROM user_list";
$result = $conn->query($sql);

$users = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

echo json_encode(["success" => true, "users" => $users]);
$conn->close();
