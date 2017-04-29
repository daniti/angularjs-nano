<?php

header('Content-Type: application/json; Charset=utf-8');

$fields = array(
    (object) array(
        'name' => 'requiredfield',
        'label' => 'Simple input (required)',
        'type' => 'text',
        'placeholder' => 'Placeholder for this field'
    ),
    (object) array(
        'name' => 'checkboxinput',
        'label' => 'Check this to show another input',
        'type' => 'checkbox',
        'value' => false
    ),
    (object) array(
        'name' => 'hiddentext',
        'label' => 'Conditional input',
        'placeholder' => 'You found the hidden input...',
        'type' => 'text',
        'showif' => (object) array(
            'field' => 'checkboxinput',
            'condition' => '!=',
            'value' => ''
        )
    ),
    (object) array(
        'name' => 'field3',
        'label' => 'Select',
        'type' => 'select',
        'options' => array(
            (object) array(
                'label' => 'Red',
                'value' => 'value1',
            ),
            (object) array(
                'label' => 'Green',
                'value' => 'value2',
            ),
            (object) array(
                'label' => 'Blue',
                'value' => 'value3',
            ),
            (object) array(
                'label' => 'Yellow',
                'value' => 'value4',
            ),
        )
    ),
    (object) array(
        'name' => 'color',
        'label' => 'Color (needs to be set to Green)',
        'type' => 'radio',
        'options' => array(
            (object) array(
                'label' => 'Red',
                'value' => 'red',
            ),
            (object) array(
                'label' => 'Green',
                'value' => 'green',
            ),
            (object) array(
                'label' => 'Blue',
                'value' => 'blue',
            ),
            (object) array(
                'label' => 'Yellow',
                'value' => 'yellow',
            ),
        )
    ),
    (object) array(
        'name' => 'field5',
        'label' => 'Number',
        'type' => 'number'
    ),
);

$response = (object) array(
            'success' => true,
            'title' => 'Nano Form sample',
            'fields' => $fields,
            'submit_label' => 'Submit',
            'submit_showalways' => true,
);

echo json_encode($response);
