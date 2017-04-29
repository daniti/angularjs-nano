<?php

header('Content-Type: application/json; Charset=utf-8');

$postdata = file_get_contents("php://input");

$params = json_decode($postdata)->params;

$errors = array();

$response = (object) array(
            'success' => true,
            'tot' => 36,
);

if (count($errors)) {
   $response->success = false;
   $response->errors = $errors;
}

echo json_encode($response);
