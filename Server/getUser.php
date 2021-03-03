<?php
    //header
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);

    // include db connection
    include('./db.php');

    // declaring variables!
    $userEmail = "";

    // getting the email of the user
    $userEmail = $_GET['user'];

    // get user details!
    $getUser = "SELECT * FROM `users` WHERE `email` = '$userEmail'";
    $getUserStatus = mysqli_query($conn,$getUser) or die(mysqli_error($conn));
    $getUserArray = mysqli_fetch_array($getUserStatus);
    
    if(mysqli_num_rows($getUserStatus) > 0) {
        echo json_encode(["sent" => true, "userdata" => $getUserArray]);
    } else {
        echo json_encode(["sent" => false, "message" => "User doesnt exist!"]);
    }
?>