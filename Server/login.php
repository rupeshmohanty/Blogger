<?php
    // header
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);

    // include db connection
    include('./db.php');

    // declare variables
    $email = "";
    $password = "";

    // get form data
    if(isset($_POST['email'])) {
        $email = $_POST['email'];
    }

    if(isset($_POST['password'])) {
        $password = $_POST['password'];
    }

    if($email == "" && $password == "") die();

    if($_POST) {
        // get password
        $getPassword = "SELECT * FROM `users` WHERE `email` = '$email'";
        $getPasswordStatus = mysqli_query($conn,$getPassword) or die(mysqli_error($conn));
        $getPasswordRow = mysqli_fetch_assoc($getPasswordStatus);

        if(mysqli_num_rows($getPasswordStatus) > 0) {

            $salt = $getPasswordRow['salt'];
            $dbPassword = $getPasswordRow['password'];
            $newPassword = md5(md5($password.$salt));

            if($dbPassword == $newPassword) {

                echo json_encode(["sent" => true, "user" => $getPasswordRow['email']]);

            } else{

                echo json_encode(["sent" => false, "message" => "Password is incorrect!"]);

            }

        } else {

            echo json_encode(["sent" => false, "message" => "User doesnt exist!"]);

        }
    }
    
    
?>