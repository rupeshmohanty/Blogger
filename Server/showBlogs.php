<?php
   // header
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
   header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
   $rest_json = file_get_contents("php://input");
   $_POST = json_decode($rest_json, true);

   // include db connection
   include('./db.php');

   // get all projects!
   $getProjects = "SELECT * FROM `posts`";
   $getProjectsStatus = mysqli_query($conn,$getProjects) or die(mysqli_error($conn));
   $getProjectsRow = array();

   if(mysqli_num_rows($getProjectsStatus) > 0) {

        while($r = mysqli_fetch_assoc($getProjectsStatus)) {
             $getProjectsRow[] = $r;
        }

        echo json_encode($getProjectsRow);

   } else {
   
        echo json_encode(["sent" => false, "message" => "Unable to fetch the posts!"]);
   
    }
?>