<?php
session_start();
header('Content-Type: application/json');

$marqueeFile = 'marquee.json';

if (file_exists($marqueeFile)) {
    echo file_get_contents($marqueeFile);
} else {
    echo json_encode(['message' => '']);
}
?>
