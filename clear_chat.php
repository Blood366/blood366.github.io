<?php
session_start();
header('Content-Type: application/json');

$messagesFile = 'messages.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (file_exists($messagesFile)) {
        file_put_contents($messagesFile, json_encode([]));
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Archivo no encontrado']);
    }
}
?>