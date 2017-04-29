<?php

header('Content-Type: application/json; Charset=utf-8');

$postdata = file_get_contents("php://input");

$params = json_decode($postdata)->params;

$errors = array();

$response = (object) array(
            'success' => false
);

if (empty($params->requiredfield)) {
   $errors[] = (object) array(
               'field' => 'requiredfield',
               'message' => 'This one is mandatory'
   );
}

$color = !empty($params->color) ? $params->color : null;
if ($color != 'green') {
   $errors[] = (object) array(
               'field' => 'color',
   );
}

if (count($errors)) {
   $response->errors = $errors;
} else {
   $response->success = true;
   if (empty($_GET['insideformsuccess'])) {
      $response->aftersubmit = (object) array(
                  'message' => "Form submit successful",
                  'buttons' => array(
                      (object) array(
                          'label' => 'Back to list',
                          'type' => 'primary',
                          'href' => 'index.htm',
                      ),
                      (object) array(
                          'label' => 'Do something else',
                          'type' => 'secondary',
                          'href' => '',
                      ),
                  )
      );
   }
}

echo json_encode($response);
