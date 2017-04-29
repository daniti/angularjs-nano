<?php

header('Content-Type: application/json; Charset=utf-8');

$postdata = file_get_contents("php://input");

$params = json_decode($postdata)->params;

$page = $params->page;
$show = $params->show;

$rows = array();

$offset = ($page - 1) * $show;

for ($i = $offset; $i < min($offset + $show, 36); $i++) {
   $rows[] = (object) array(
               'label' => 'Row number' . ($i + 1)
   );
}

$response = (object) array(
            'success' => true,
            'rows' => $rows
);

echo json_encode($response);
