<?php

return [
    'to_email' => array_values(array_filter(
    array_map('trim', explode(',', env('CONTACT_TO_EMAIL', '')))
)),
];

