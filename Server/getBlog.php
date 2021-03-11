<?php
   // header
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
   header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
   $rest_json = file_get_contents("php://input");
   $_POST = json_decode($rest_json, true);

   // include db connection
   include('./db.php');

   // get post id
   $postId = $_GET['id'];

   // get blog
   $getBlog = "SELECT * FROM `posts` WHERE `id` = '$postId'";
   $getBlogStatus = mysqli_query($conn,$getBlog) or die(mysqli_error($conn));
   $getBlogArray = mysqli_fetch_array($getBlogStatus);
   
   if(mysqli_num_rows($getBlogStatus) > 0) {

    echo json_encode(["sent" => true, "post" => $getBlogArray]);

   } else {

    echo json_encode(["sent" => false, "message" => "Unable to fetch post!"]);

   }