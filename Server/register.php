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
    $name = "";
    $email = "";
    $password = "";
    $cpassword = "";
    $salt = uniqid();
    $createdAt = date('m-d-Y H:i');

    // get form data!
    if(isset($_POST['name'])) {
        $name = $_POST['name'];
    }

    if(isset($_POST['email'])) {
        $email = $_POST['email'];
    }

    if(isset($_POST['password'])) {
        $password = $_POST['password'];
    }

    if(isset($_POST['cpassword'])) {
        $cpassword = $_POST['cpassword'];
    }

    if($name == "" && $email == "" && $password == "") die();

    if($_POST) {
        // check user
        $checkUser = "SELECT * FROM `users` WHERE `email` = '$email'";
        $checkUserStatus = mysqli_query($conn,$checkUser) or die(mysqli_error($conn));

        if(mysqli_num_rows($checkUserStatus) > 0) {

            echo json_encode(["sent" => false, "message" => "User already exists!"]);

        } else {

            $newPassword = md5(md5($password.$salt));
            // insert user
            $insertUser = "INSERT INTO `users`(`name`,`email`,`password`,`salt`,`createdAt`) VALUES('$name','$email','$newPassword','$salt','$createdAt')";
            $insertUserStatus = mysqli_query($conn,$insertUser) or die(mysqli_error($conn));

            if($insertUserStatus) { // if user inserted successfully!

                echo json_encode(["sent" => true, "message" => "User registered successfully!"]);

            } else {

                echo json_encode(["sent" => false, "message" => "Unable to register user!"]);

            }

        }
    }
?>