<?php
   // header
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
   header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
   $rest_json = file_get_contents("php://input");
   $_POST = json_decode($rest_json, true);
   
   // include db connection
   include('./db.php');

   // declare variables!
   $bio = "";
   $email = "";

   // get form data!
   if(isset($_POST['email'])) {
       $email = $_POST['email'];
   }

   if(isset($_POST['bio'])) {
       $bio = $_POST['bio'];
   }

   if($email == "" && $password == "") die();

   if($_POST){
       // add bio for the user!
       $addBio = "UPDATE `users` SET `bio` = '$bio' WHERE `email` = '$email'";
       $addBioStatus = mysqli_query($conn,$addBio) or die(mysqli_error($conn));

       if($addBioStatus) {
           echo json_encode(["sent" => true, "message" => "User bio set!"]);
       } else {
           echo json_encode(["sent" => false, "message" => "Unable to set bio!"]);
       }
   }
   
?>