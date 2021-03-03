<?php
   // header
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
   header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
   $rest_json = file_get_contents("php://input");
   $_POST = json_decode($rest_json, true);

   // include db connection
   include('./db.php');

   //declare variables
   $email = "";
   $title = "";
   $brief = "";
   $description = "";
   $createdAt = date('m-d-Y H:i');

   // get form data!
   if(isset($_POST['email'])) {
       $email = $_POST['email'];
   }

   if(isset($_POST['title'])) {
       $title = $_POST['title'];
   }

   if(isset($_POST['brief'])) {
       $brief = $_POST['brief'];
   }

   if(isset($_POST['description'])) {
       $description = $_POST['description'];
   }

   if($email == "" && $title == "" && $brief == "" && $description == "") die();

   if($_POST) {
       // insert blog!
       $insertBlog = "INSERT INTO `posts`(`email`,`title`,`brief`,`description`,`createdAt`) VALUES('$email','$title','$brief','$description','$createdAt')";
       $insertBlogStatus = mysqli_query($conn,$insertBlog) or die(mysqli_error($conn));


       if($insertBlogStatus) {
           echo json_encode(["sent" => true, "message" => "Yay! Your blog is posted!"]);
       } else {
           echo json_encode(["sent" => false, "message" => "Unable to post your blog!"]);
       }

   }
?>